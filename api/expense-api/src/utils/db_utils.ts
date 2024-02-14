import { createKysely } from "@vercel/postgres-kysely";
import { Generated } from "kysely";
import { DateTime } from "luxon";

interface Database {
  expense_reports: ExpenseReportsTable;
}

interface ExpenseReportsTable {
  report_id: Generated<number>;
  amount: number;
  merchant: string;
  description: string;
  submitter_id: string;
  submitted_date: Date;
  submitter_email: string;
  approver_id?: string | null;
  approved_date?: Date | null;
  approver_email?: string | null;
  rejecter_id?: string | null;
  rejected_date?: Date | null;
  rejecter_email?: string | null;
}

const db = createKysely<Database>();

export async function createExpenseReport(payload: createExpenseReportDto) {
  const { amount, merchant, description, submitter_id, submitter_email } =
    payload;
  const today = DateTime.now().toJSDate();

  const result = await db
    .insertInto("expense_reports")
    .values({
      amount: amount,
      merchant: merchant,
      description: description,
      submitter_id: submitter_id,
      submitted_date: today,
      submitter_email: submitter_email,
    })
    .returning("report_id")
    .execute();

  return result;
}

export async function deleteExpenseReport(payload: deleteExpenseReportDto) {
  const { report_id } = payload;
  const result = await db
    .deleteFrom("expense_reports")
    .where("report_id", "=", report_id)
    .execute();

  return result;
}

export async function approveExpenseReport(payload: approveExpenseReportDto) {
  const { approver_id, report_id, approver_email } = payload;
  const today = DateTime.now().toJSDate();

  const result = await db
    .updateTable("expense_reports")
    .set({
      approver_id: approver_id,
      approved_date: today,
      approver_email: approver_email,
    })
    .where("report_id", "=", report_id)
    .returningAll()
    .execute();

  return result;
}

export async function rejectExpenseReport(payload: rejectExpenseReportDto) {
  const { rejecter_email, report_id, rejecter_id } = payload;
  const today = DateTime.now().toJSDate();

  const result = await db
    .updateTable("expense_reports")
    .set({
      rejecter_id: rejecter_id,
      rejected_date: today,
      rejecter_email: rejecter_email,
    })
    .where("report_id", "=", report_id)
    .returningAll()
    .execute();

  return result;
}

export async function resetExpenseReport(payload: resetExpenseReportDto) {
  const { report_id } = payload;

  const result = await db
    .updateTable("expense_reports")
    .set({
      approver_id: null,
      approved_date: null,
      approver_email: null,
      rejected_date: null,
      rejecter_email: null,
      rejecter_id: null,
    })
    .where("report_id", "=", report_id)
    .returningAll()
    .execute();

  return result;
}

export async function getExpenseReports(payload: getExpenseReportDto) {
  const { user_id, report_ids } = payload;

  function where(eb: Function) {
    if (report_ids.length > 0) {
      return eb("submitter_id", "=", user_id)
        .or("approver_id", "=", user_id)
        .or("report_id", "in", report_ids);
    } else {
      return eb("submitter_id", "=", user_id).or("approver_id", "=", user_id);
    }
  }

  const query = db.selectFrom("expense_reports").selectAll().where(where);

  const result = await query.execute();
  return result;
}

export type createExpenseReportDto = {
  amount: number;
  merchant: string;
  description: string;
  submitter_id: string;
  submitter_email: string;
};

export type approveExpenseReportDto = {
  report_id: number;
  approver_id: string;
  approver_email: string;
};

export type rejectExpenseReportDto = {
  report_id: number;
  rejecter_id: string;
  rejecter_email: string;
};

export type resetExpenseReportDto = {
  report_id: number;
};

export type getExpenseReportDto = {
  user_id: string;
  report_ids: number[];
};

export type deleteExpenseReportDto = {
  report_id: number;
};

export interface ExpenseReport {
  report_id: number;
  amount: number;
  merchant: string;
  description: string;
  submitter_id: string;
  submitted_date: Date;
  submitter_email: string;
  approver_id?: string | null;
  approved_date?: Date | null;
  approver_email?: string | null;
  rejecter_id?: string | null;
  rejecter_email?: string | null;
  rejected_date?: Date | null;
}
