import { disapproveExpenseReport } from '@/utils/db_utils';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { report_id } = req.body;

    try {
      const db_result = await disapproveExpenseReport({ report_id });
      return res.status(200).json({
          success: true,
          message: `Expense report ${report_id} was successfully disapproved.`,
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