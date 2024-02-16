import { createExpenseReport } from '@/utils/db_utils';
import { NextApiRequest, NextApiResponse } from 'next';
import { getFGAJWT } from '@/utils/token_utils';
import { FGAWriteTuple } from '@/utils/fga_utils';
import { writeTuple } from '@/utils/fga_utils';
import { getUserIdAndEmailFromHeaders } from '@/utils/header_utils';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { amount, merchant, description } = req.body;
    const { email, user_id } = getUserIdAndEmailFromHeaders(req.headers);


    try {
        // add the new expense report to the DB
        const db_result = await createExpenseReport({ amount, submitter_id: user_id, merchant, description, submitter_email: email });
        const report_id = db_result[0].report_id.toString();
    
        const fga_payload: FGAWriteTuple = {
            user: `employee:${user_id}`,
            relation: 'submitter',
            object: `report:${report_id}`
        }
    
        const fga_token = await getFGAJWT();
    
        if (fga_payload && fga_token) {
            // create an FGA tuple
            await writeTuple(fga_token, fga_payload);
        }
        return res.status(201).json({
            success: true,
            message: `${email} successfully submitted expense report ${report_id}.`,
            result: db_result
        });
    } catch (e) {
        return res.status(400).json({
            success: false,
            message: 'Bad Request',
            result: e
        });
    }
};