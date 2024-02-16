import { resetExpenseReport } from "@/utils/db_utils";
import { NextApiRequest, NextApiResponse } from "next";
import { getFGAJWT } from "@/utils/token_utils";
import { FGACheckTuple, checkTuple } from "@/utils/fga_utils";
import { getUserIdAndEmailFromHeaders } from "@/utils/header_utils";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { report_id } = req.body;
  const { email, user_id } = getUserIdAndEmailFromHeaders(req.headers);

  try {
    const fga_payload: FGACheckTuple = {
      user: `employee:${user_id}`,
      relation: "approver",
      object: `report:${report_id}`,
    };

    const fga_token = await getFGAJWT();

    if (fga_payload && fga_token) {
      // check for authorization to perform action
      const fga_result = await checkTuple(fga_token, fga_payload);
      // if allowed ...
      if (fga_result.allowed) {
        const db_result = await resetExpenseReport({ report_id });
        return res.status(200).json({
          success: true,
          message: `Expense report ${report_id} was successfully reset.`,
          result: db_result,
        });
      } else {
        // else respond unauthorized
        console.log("fga_result", fga_result);
        return res.status(401).json({
          success: false,
          message: `${email} has insufficient permission to reset expense report report_id: ${report_id}.`,
          result: [],
        });
      }
    }
  } catch (e) {
    return res.status(400).json({
      success: false,
      message: "Bad Request",
      result: e,
    });
  }
};
