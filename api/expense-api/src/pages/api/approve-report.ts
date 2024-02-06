import { approveExpenseReport, createExpenseReport } from '@/utils/db_utils';
import { NextApiRequest, NextApiResponse } from 'next';
import { getFGAJWT } from '@/utils/token_utils';
import { FGACheckTuple, checkTuple } from '@/utils/fga_utils';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { approver_id, report_id, approver_email } = req.body;

    try {
        const fga_payload: FGACheckTuple = {
            user: `employee:${approver_id}`,
            relation: 'approver',
            object: `report:${report_id}`
        }
    
        const fga_token = await getFGAJWT();
    
        if (fga_payload && fga_token) {
            // check for authorization to perform action
            const fga_result = await checkTuple(fga_token, fga_payload);
            // if allowed ...
            if (fga_result.allowed) {
                // ... approve the expense report
                const db_result = await approveExpenseReport({approver_id, report_id, approver_email});
                return res.status(200).json({
                    message: 'Success',
                    db_result
                });
            } else {
                // else respond unauthorized
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