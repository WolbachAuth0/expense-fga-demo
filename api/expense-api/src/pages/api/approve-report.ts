import { approveExpenseReport, createExpenseReport } from '@/utils/db_utils';
import { NextApiRequest, NextApiResponse } from 'next';
import { getFGAJWT } from '@/utils/token_utils';
import { FGACheckTuple, checkTuple } from '@/utils/fga_utils';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const payload = req.body;
    const { approver_id, report_id } = payload;

    try {
        const fga_payload: FGACheckTuple = {
            user: `employee:${approver_id}`,
            relation: 'approver',
            object: `report:${report_id}`
        }
    
        const fga_token = await getFGAJWT();
    
        if (fga_payload && fga_token) {
            const fga_result = await checkTuple(fga_token, fga_payload);
            if (fga_result.allowed) {
                const db_result = await approveExpenseReport(payload);
                return res.status(200).json({
                    //TODO: how does this result set look like
                    db_result
                });
            } else {
                return res.status(401).json({
                    message: 'Insufficient access'
                })
            }
            
        }
    } catch (e) {
        return res.status(400).json({
            result: 'Bad Request',
            error: e
        })
    }
};