// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getEmailFromHeaders, getUserIdFromHeaders } from '@/utils/header_utils';
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const headers = req.headers;
  const user_id = getUserIdFromHeaders(headers);
  const email = getEmailFromHeaders(headers);
  res.status(200).json({ headers, user_id, email })
}
