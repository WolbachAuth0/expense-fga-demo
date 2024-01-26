import { getExpenseReports } from '@/utils/db_utils';
import { NextApiRequest, NextApiResponse } from 'next';
// import { getFGAJWT } from '@/utils/token_utils';
// import { FGAWriteTuple } from '@/utils/fga_utils';
// import { writeTuple } from '@/utils/fga_utils';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const payload = req.body;
    // const { user_id } = payload;

    try {
        const db_result = await getExpenseReports(payload);
        return res.status(200).json({
            result: db_result
        })
    } catch (e) {
        return res.status(400).json({
            result: 'Bad Request',
            error: e
        })
    }
};