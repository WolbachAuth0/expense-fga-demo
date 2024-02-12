import { ExpenseReport, getExpenseReports } from '@/utils/db_utils';
import { NextApiRequest, NextApiResponse } from 'next';
import { getFGAJWT } from '@/utils/token_utils';
import { FGAListTuple, listAllTuples } from '@/utils/fga_utils';
import { getUserIdAndEmailFromHeaders } from '@/utils/header_utils';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { user_id } = getUserIdAndEmailFromHeaders(req.headers);

    
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
            const report_ids = fga_result.objects.map(x => Number(item.split(':')[1]));

            // Query DB for reports where you are a submitter, approver or can approve
            const db_result = await getExpenseReports({user_id, report_ids});

            // Map DB result into separate arrays for each condition
            const [my_submitted_reports, my_approved_reports, team_reports_approved, team_reports_submitted, bad_results]: [ExpenseReport[], ExpenseReport[], ExpenseReport[], ExpenseReport[], ExpenseReport[]] = 
            db_result.reduce((acc, item) => {
                acc[item.submitter_id === user_id && !item.approver_id ? 0 
                    : item.submitter_id === user_id && !!item.approver_id ? 1 
                    : item.submitter_id !== user_id && !!item.approver_id ? 2 
                    : item.submitter_id !== user_id && !item.approver_id ? 3
                    : 4]
                    .push(item);
                return acc;
            }, [[] as ExpenseReport[], [] as ExpenseReport[], [] as ExpenseReport[], [] as ExpenseReport[], [] as ExpenseReport[]]);
            
            const result = {
                my_submitted_reports,
                my_approved_reports,
                team_reports_approved,
                team_reports_submitted
            };

            const count = db_result.length;
            return res.status(200).json({
                success: true,
                message: `Found ${count} expense reports matching your query.`,
                result
            });
        } else {
            return res.status(401).json({
                success: false,
                message: `Unauthorized`,
                result: []
            });
        }
    } catch (e) {
        return res.status(400).json({
            success: false,
            message: 'An error occured',
            result: e
        });
    }
};