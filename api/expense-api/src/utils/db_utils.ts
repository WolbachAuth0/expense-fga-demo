import { createKysely } from '@vercel/postgres-kysely';
import { Generated } from 'kysely';
import { DateTime } from 'luxon';
 
interface Database {
  'expense_reports': ExpenseReportsTable;
}

interface ExpenseReportsTable {
    report_id: Generated<number>;
    amount: number;
    merchant: string;
    description: string;
    submitter_id: string;
    approver_id?: string;
    approved_date?: Date;
    submitted_date: Date;
}
 
const db = createKysely<Database>();

export async function createExpenseReport (payload: createExpenseReportDto) {
    const { amount, merchant, description, submitter_id } = payload;
    const today = DateTime.now().toJSDate();

    const result = await db
        .insertInto('expense_reports')
        .values({ amount: amount, merchant: merchant, description: description, submitter_id: submitter_id, submitted_date: today })
        .returning('report_id')
        .execute();
    
    return result;
}

export async function approveExpenseReport (payload: approveExpenseReportDto) {
    const { approver_id, report_id } = payload;
    const today = DateTime.now().toJSDate();

    const result = await db
        .updateTable('expense_reports')
        .set({ approver_id: approver_id, approved_date: today })
        .where('report_id', '=', report_id)
        .returningAll()
        .execute();
    
    return result;
}

export async function getExpenseReports (payload: getExpenseReportDto) {
    const { user_id, report_ids } = payload;

    const result = await db
        .selectFrom('expense_reports')
        .selectAll()
        .where(function(eb: Function) {
            return eb('submitter_id', '=', user_id).or('approver_id', '=', user_id).or('report_id', 'in', report_ids)
        })
        .execute();

    return result;
}

export type createExpenseReportDto = {
    amount: number;
    merchant: string;
    description: string;
    submitter_id: string;
}

export type approveExpenseReportDto = {
    report_id: number;
    approver_id: string;
}

export type getExpenseReportDto = {
    user_id: string;
    report_ids: number[];
}

export type dbResult = {
    report_id: number;
    amount: number;
    merchant: string;
    description: string;
    submitter_id: string;
    approver_id?: string;
    approved_date?: Date;
    submitted_date: Date;
}