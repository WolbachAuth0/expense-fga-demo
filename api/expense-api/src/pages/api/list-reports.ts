import { ExpenseReport, getExpenseReports } from '@/utils/db_utils';
import { NextApiRequest, NextApiResponse } from 'next';
import { getFGAJWT } from '@/utils/token_utils';
import { FGAListTuple, listAllTuples } from '@/utils/fga_utils';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const payload = req.body;
    const { user_id } = payload;
    
    const fga_token = await getFGAJWT();
    const fga_payload: FGAListTuple = {
        user: `employee:${user_id}`,
        relation: 'approver',
        type: `report`
    }

    try {
        if (fga_token) {
            // Get reports where user is allowed to approve and map report IDs for DB query
            const fga_result = await listAllTuples(fga_token, fga_payload);
            const report_ids = fga_result.objects.map(x => Number(x.split(':')[1]));

            // Query DB for reports where you are a submitter, approver or can approve
            const db_result = await getExpenseReports({user_id, report_ids});

            // Map DB result into separate arrays for each condition
            const [submitted_reports, approved_reports, approved_by_others, needs_approval_reports]: [ExpenseReport[], ExpenseReport[], ExpenseReport[], ExpenseReport[]] = db_result.reduce((acc, item) => {
                acc[item.submitter_id === user_id ? 0 : item.approver_id === user_id ? 1 : !!item.approved_date ? 2 : 3].push(item);
                return acc;
            }, [[] as ExpenseReport[], [] as ExpenseReport[], [] as ExpenseReport[], [] as ExpenseReport[]]);
            
            return res.status(200).json({
                submitted_reports,
                approved_reports,
                approved_by_others,
                needs_approval_reports
            });
        }        
    } catch (e) {
        return res.status(400).json({
            result: 'Bad Request',
            error: e
        })
    }
};