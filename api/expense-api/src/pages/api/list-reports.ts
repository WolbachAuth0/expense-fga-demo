import { getExpenseReports } from '@/utils/db_utils';
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
            const fga_result = await listAllTuples(fga_token, fga_payload);
            const report_ids = fga_result.objects.map(x => Number(x.split(':')[1]));
            const db_result = await getExpenseReports({user_id, report_ids});
            const submitted_reports = db_result.filter(x => x.submitter_id === user_id);
            const approved_report = db_result.filter(x => x.approver_id === user_id);
            const needs_approval_reports = db_result.filter(x => x.approver_id !== user_id && x.submitter_id !== user_id);
            
            return res.status(200).json({
                submitted_reports,
                approved_report,
                needs_approval_reports
            })
        }        
    } catch (e) {
        return res.status(400).json({
            result: 'Bad Request',
            error: e
        })
    }
};