import { Controller, Get, Param } from '@nestjs/common';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get(':userAddress')
  async getTransactions(@Param('userAddress') userAddress: string) {
    return await this.transactionsService.getTransactions(userAddress);
  }

  @Get('balance/:userAddress')
  async getBalance(@Param('userAddress') userAddress: string) {
    return await this.transactionsService.getBalance(userAddress);
  }
}
