// Cron job endpoint for fetching JWKS from Auth0
import { fetchAndCacheJWKS } from "@/utils/token_utils";
import type { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const result = await fetchAndCacheJWKS();
  res.status(200).json({ message: "done", result: result });
};
