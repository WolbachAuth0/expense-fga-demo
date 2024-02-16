import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { AuthorizationGuard } from '../auth/auth.guard';

@Controller('/api')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Get('/ping')
  ping(): {} {
    return this.expensesService.ping();
  }

  //@UseGuards(AuthorizationGuard)
  @Post('/list-reports')
  async listReports(): Promise<{}> {
    return await this.expensesService.listReports();
  }
}
