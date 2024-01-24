import { NextApiRequest, NextApiResponse } from 'next';
import { getFGAJWT } from '@/utils/token_utils';
import { listAllTuples } from '@/utils/fga_utils';
import { setCorsApiHeaders } from '@/utils/header_utils';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const payload = req.body;

    const fga_token = await getFGAJWT();

    if (fga_token) {
        const result = await listAllTuples(fga_token, payload);

        return setCorsApiHeaders(res).status(200).json({
            result: result
        });
    }
};