import { NextApiRequest, NextApiResponse } from 'next';
import { getFGAJWT } from '@/utils/token_utils';
import { checkTuple } from '@/utils/fga_utils';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const payload = req.body;

    const fga_token = await getFGAJWT();

    if (fga_token) {
        const result = await checkTuple(fga_token, payload);

        return res.status(200).json({
            result: result
        });
    }
};