import { NextApiRequest, NextApiResponse } from 'next';
import { getFGAJWT } from '@/utils/token_utils';
import { writeTuple } from '@/utils/fga_utils';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    // Parse FGA fields
    const payload = req.body;

    const fga_token = await getFGAJWT();

    if (fga_token) {
        const result = writeTuple(fga_token, payload)

        return res.status(200).json({
            result: result
        });
    }
};