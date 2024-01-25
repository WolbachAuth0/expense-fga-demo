import { createExpenseReport } from '@/utils/db_utils';
import { NextApiRequest, NextApiResponse } from 'next';
import { getFGAJWT } from '@/utils/token_utils';
import { FGAWriteTuple } from '@/utils/fga_utils';
import { writeTuple } from '@/utils/fga_utils';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const payload = req.body;
    const { amount, submitter_id, merchant, description } = payload;

    try {
        const db_result = await createExpenseReport(payload);
        const report_id = db_result[0].report_id.toString();
    
        // const fga_payload: FGAWriteTuple = {
        //     user: `employee:${payload.submitter_id}`,
        //     relation: 'submitter',
        //     object: `report:${report_id}`
        // }
    
        // const fga_token = await getFGAJWT();
    
        // if (fga_payload && fga_token) {
        //     await writeTuple(fga_token, fga_payload);
        //     return res.status(201).json({
        //         report_id: report_id,
        //         amount: amount,
        //         merchant: merchant,
        //         submitter_id: submitter_id,
        //         description: description
        //     })
        // }
        return res.status(201).json({
            result: db_result
        })
    } catch (e) {
        return res.status(400).json({
            result: 'Bad Request',
            error: e
        })
    }
};