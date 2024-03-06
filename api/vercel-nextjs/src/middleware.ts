import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "@/utils/token_utils";
import { cors } from "./utils/cors";
import { Ratelimit } from "@upstash/ratelimit";
import { kv } from "@vercel/kv";
import { headers } from "next/headers";

const ratelimit = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.fixedWindow(
    Number(process.env.RATE_LIMIT_PER_MINUTE) ?? 25,
    "60s",
  ),
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
  const { success, limit, reset } = await ratelimit.limit(ip ?? "anonymous");
  if (!success) {
    res = NextResponse.json(
      {
        message: `There are too many requests.  Current limit is ${limit} requests per minute.  Cooldown resets at ${reset}`,
        success: false,
      },
      { status: 429 },
    );
  } else {
    const path = req.nextUrl.pathname;
    // Exclude AuthZ check for /ping for uptime check and /fetch-jwks for cron job
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
        if (token_payload) {
          // Incoming JWT is valid - parse email and user to forward through headers
          let user_id = token_payload.sub ?? "";
          let email = (token_payload["email"] as string) ?? "";

          // Handle M2M use case
          if (!email) {
            user_id = token_payload[
              process.env.M2M_USER_ID_CLAIM ?? ""
            ] as string;
            email = token_payload[process.env.M2M_EMAIL_CLAIM ?? ""] as string;
          }

          res = NextResponse.next();
          res.headers.set("extracted_requester_id", user_id);
          res.headers.set("extracted_requester_email", email);
        }
      }
    }
  }

  return cors(req, res);
}
