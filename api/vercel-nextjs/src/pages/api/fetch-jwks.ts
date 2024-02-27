// Cron job endpoint for fetching JWKS from Auth0
import { fetchAndCacheJWKS } from "@/utils/token_utils";
import type { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // const result = await fetchAndCacheJWKS();
  //
  const result = await fetch(
    `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
  );
  const data = await result.json();
  res
    .status(200)
    .json({
      message: "done",
      result: data,
      url: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
    });
};
