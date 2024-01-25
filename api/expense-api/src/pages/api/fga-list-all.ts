import { NextApiRequest, NextApiResponse } from 'next';
import { getFGAJWT } from '@/utils/token_utils';
import { listAllTuples } from '@/utils/fga_utils';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const payload = req.body;

    const fga_token = await getFGAJWT();

    if (fga_token) {
        const result = await listAllTuples(fga_token, payload);

        return res.status(200).json({
            result: result
        });
    }

    return res.status(400).json({
        result: 'Bad Request'
    })
};