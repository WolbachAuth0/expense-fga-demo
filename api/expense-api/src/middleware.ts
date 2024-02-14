import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "@/utils/token_utils";
import { cors } from "./utils/cors";

export const config = {
  matcher: "/api/:path*",
};

export default async function middleware(req: NextRequest, res: NextResponse) {
  // Default Bad Response
  res = NextResponse.json(
    { message: "Authorization Required" },
    { status: 401 },
  );

  // Exclude ping route for uptime check
  if (req.nextUrl.pathname.startsWith("/api/ping")) {
    res = NextResponse.next();
  } else {
    // Validate all other API routes have proper authorization
    const token = req.headers.get("authorization")?.split(" ")[1];
    if (token) {
      const decoded_token = await verifyJWT(token);
      if (
        decoded_token &&
        decoded_token.sub &&
        (decoded_token["email"] as string)
      ) {
        // Incoming JWT is valid - forward with appropriate headers
        res = NextResponse.next();
        res.headers.set("extracted_requester_id", decoded_token.sub);
        res.headers.set(
          "extracted_requester_email",
          decoded_token["email"] as string,
        );
      }
    }
  }

  return cors(req, res);
}
