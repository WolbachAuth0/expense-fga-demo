import { Injectable } from '@nestjs/common';

@Injectable()
export class ExpensesService {
  ping(): {} {
    return { message: 'up' };
  }

  async listReports(): Promise<{}> {
    return { reports: ['1', '2'] };
  }
}
