// Cron job endpoint for fetching JWKS from Auth0
import { fetchAndCacheJWKS } from "@/utils/token_utils";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  runtime: "edge",
};

export default async (req: NextRequest) => {
  const result = await fetchAndCacheJWKS();
  return NextResponse.json({
    message: "done",
    result: result,
    url: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
  });
};
