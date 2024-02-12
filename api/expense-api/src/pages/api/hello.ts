// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const headers = req.headers;
  const rawHeaders = req.rawHeaders;
  res.status(200).json({ headers: headers, rawHeaders: rawHeaders })
}
