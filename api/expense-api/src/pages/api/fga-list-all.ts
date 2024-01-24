import { NextApiRequest, NextApiResponse } from 'next';
import { getFGAJWT } from '@/utils/token_utils';
import { listAllTuples } from '@/utils/fga_utils';
import NextCors from 'nextjs-cors';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    await NextCors(req, res, {
        // Options
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        origin: '*',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });

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