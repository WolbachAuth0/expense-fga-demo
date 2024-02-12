import { disapproveExpenseReport } from '@/utils/db_utils';
import { NextApiRequest, NextApiResponse } from 'next';
import { getFGAJWT } from '@/utils/token_utils';
import { FGACheckTuple, checkTuple } from '@/utils/fga_utils';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { report_id, approver_id } = req.body;

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
                const db_result = await disapproveExpenseReport({ report_id });
                return res.status(200).json({
                    success: true,
                    message: `Expense report ${report_id} was successfully disapproved.`,
                    result: db_result
                });
            }
        }
            
    } catch (e) {
        return res.status(400).json({
            success: false,
            message: 'Bad Request',
            result: e
        });
    }
};