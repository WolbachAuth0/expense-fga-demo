import { approveExpenseReport, createExpenseReport } from '@/utils/db_utils';
import { NextApiRequest, NextApiResponse } from 'next';
import { getFGAJWT } from '@/utils/token_utils';
import { FGACheckTuple, checkTuple } from '@/utils/fga_utils';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { approver_id, report_id } = req.body;

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
                const db_result = await approveExpenseReport({approver_id, report_id});
                return res.status(200).json({
                    db_result
                });
            } else {
                console.log('fga_result', fga_result);
                return res.status(401).json({
                    message: 'Insufficient access'
                });
            }
            
        }
    } catch (e) {
        return res.status(400).json({
            result: 'Bad Request',
            error: e
        });
    }
};