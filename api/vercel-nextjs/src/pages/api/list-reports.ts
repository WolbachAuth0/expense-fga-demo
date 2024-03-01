import { ExpenseReport, getExpenseReports } from "@/utils/db_utils";
import { NextApiRequest, NextApiResponse } from "next";
import { getFGAJWT } from "@/utils/token_utils";
import { FGAListTuple, listAllTuples } from "@/utils/fga_utils";
import { getUserIdAndEmailFromHeaders } from "@/utils/header_utils";
import { Ratelimit } from "@upstash/ratelimit";
import { kv } from "@vercel/kv";

// 30 RPM
const ratelimit = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.fixedWindow(30, "60s"),
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { user_id } = getUserIdAndEmailFromHeaders(req.headers);

  // Rate limit based on user_id
  // const { success } = await ratelimit.limit(user_id ?? "anonymous");
  // if (!success) {
  //   return res.status(429).json({
  //     success: false,
  //     message: `Too many requests`,
  //     result: [],
  //   });
  // }

  const fga_token = await getFGAJWT();
  const fga_payload: FGAListTuple = {
    user: `employee:${user_id}`,
    relation: "approver",
    type: `report`,
  };

  try {
    if (fga_token) {
      // Get reports where user is allowed to approve and map report IDs for DB query
      const fga_result = await listAllTuples(fga_token, fga_payload);
      const report_ids = fga_result.objects.map((x) => Number(x.split(":")[1]));

      // Query DB for reports where you are a submitter, approver or can approve
      const db_result = await getExpenseReports({ user_id, report_ids });

      // Map DB result into separate arrays for each condition
      const [
        my_reports_submitted,
        my_reports_approved,
        team_reports_approved,
        team_reports_submitted,
        my_reports_rejected,
        team_reports_rejected,
        _bad_results,
      ]: [
        ExpenseReport[],
        ExpenseReport[],
        ExpenseReport[],
        ExpenseReport[],
        ExpenseReport[],
        ExpenseReport[],
        ExpenseReport[],
      ] = db_result.reduce(
        (acc, item) => {
          acc[
            item.submitter_id === user_id &&
            !item.approver_id &&
            !item.rejecter_id
              ? 0 // My reports not approved/rejected
              : item.submitter_id === user_id && !!item.approver_id
                ? 1 // My reports approved
                : item.submitter_id !== user_id && !!item.approver_id
                  ? 2 // Team reports approved
                  : item.submitter_id !== user_id &&
                      !item.approver_id &&
                      !item.rejecter_id
                    ? 3 // Team reports not approved/rejected
                    : item.submitter_id === user_id && !!item.rejecter_id
                      ? 4 // My reports rejected
                      : item.submitter_id !== user_id && !!item.rejecter_id
                        ? 5 // Team reports rejected
                        : 6
          ].push(item);
          return acc;
        },
        [
          [] as ExpenseReport[],
          [] as ExpenseReport[],
          [] as ExpenseReport[],
          [] as ExpenseReport[],
          [] as ExpenseReport[],
          [] as ExpenseReport[],
          [] as ExpenseReport[],
        ],
      );

      const result = {
        my_reports_submitted,
        my_reports_approved,
        team_reports_approved,
        team_reports_submitted,
        my_reports_rejected,
        team_reports_rejected,
      };

      const count = db_result.length;
      return res.status(200).json({
        success: true,
        message: `Found ${count} expense reports matching your query.`,
        result,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: `Unauthorized`,
        result: [],
      });
    }
  } catch (e) {
    return res.status(400).json({
      success: false,
      message: "An error occured",
      result: e,
    });
  }
};
