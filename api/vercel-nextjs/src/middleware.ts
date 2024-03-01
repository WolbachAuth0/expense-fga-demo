import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "@/utils/token_utils";
import { cors } from "./utils/cors";
import { Ratelimit } from "@upstash/ratelimit";
import { kv } from "@vercel/kv";
import { headers } from "next/headers";

const ratelimit = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.fixedWindow(10, "60s"),
});

export const config = {
  matcher: "/api/:path*",
};

export default async function middleware(req: NextRequest, res: NextResponse) {
  // Default Bad Response
  res = NextResponse.json(
    { message: "Authorization Required" },
    { status: 401 },
  );

  // Rate limit based on ip address
  const ip = headers().get("x-forwarded-for");
  const { success } = await ratelimit.limit(ip ?? "anonymous");
  if (!success) {
    return NextResponse.json({ message: "Too many requests" }, { status: 429 });
  }

  const path = req.nextUrl.pathname;
  // Exclude ping route for uptime check
  if (path.startsWith("/api/ping") || path.startsWith("/api/fetch-jwks")) {
    res = NextResponse.next();
  } else {
    // Validate all other API routes have proper authorization
    const token = req.headers.get("authorization")?.split(" ")[1];
    if (token) {
      const { jwtError, token_payload } = await verifyJWT(token);
      if (jwtError) {
        res = NextResponse.json(
          { message: "Authorization Failed", result: jwtError },
          { status: 401 },
        );
      }
      if (
        token_payload &&
        token_payload.sub &&
        (token_payload["email"] as string)
      ) {
        // Incoming JWT is valid - forward with appropriate headers
        res = NextResponse.next();
        res.headers.set("extracted_requester_id", token_payload.sub);
        res.headers.set(
          "extracted_requester_email",
          token_payload["email"] as string,
        );
      }
    }
  }

  return cors(req, res);
}
