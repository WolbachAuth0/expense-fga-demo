import { deleteExpenseReport } from "@/utils/db_utils";
import { NextApiRequest, NextApiResponse } from "next";
import { getFGAJWT } from "@/utils/token_utils";
import { FGACheckTuple, FGADeleteTuple } from "@/utils/fga_utils";
import { checkTuple, deleteTuple } from "@/utils/fga_utils";
import { getUserIdAndEmailFromHeaders } from "@/utils/header_utils";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { report_id } = req.body;
  const { email, user_id } = getUserIdAndEmailFromHeaders(req.headers);

  try {
    const fga_payload: FGACheckTuple = {
      user: `employee:${user_id}`,
      relation: "submitter",
      object: `report:${report_id}`,
    };

    const fga_token = await getFGAJWT();

    if (fga_payload && fga_token) {
      const fga_result = await checkTuple(fga_token, fga_payload);
      // if allowed ...
      if (fga_result.allowed) {
        // delete expense report from DB
        const db_result = await deleteExpenseReport({ report_id });

        // If rows are successfully deleted - delete tuple from FGA
        if (Number(db_result[0].numDeletedRows) === 1) {
          await deleteTuple(fga_token, fga_payload as FGADeleteTuple);
          return res.status(200).json({
            message: `Report ID: ${report_id} was successfully deleted by ${email}.`,
            success: true,
          });
        }
      }
    }
    return res.status(401).json({
      success: false,
      message: `${email} is not the submitter of this expense report, only submitters can delete expense reports.`,
      result: [],
    });
  } catch (e) {
    return res.status(400).json({
      success: false,
      message: "Bad Request",
      result: e,
    });
  }
};
