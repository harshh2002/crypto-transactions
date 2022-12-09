import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { map, catchError, toArray } from 'rxjs';
import { Model } from 'mongoose';
import { Transactions } from './transactions.interface';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly httpService: HttpService,
    private configService: ConfigService,
    @Inject('TRANSACTIONS_MODEL')
    private readonly transactionsModel: Model<Transactions>,
  ) {}

  async getTransactions(address: string) {
    const response = await this.httpService
      .get('https://api.etherscan.io/api', {
        params: {
          module: 'account',
          action: 'txlist',
          address,
          startblock: '0',
          endblock: '99999999',
          page: '1',
          offset: '10',
          sort: 'asc',
          apikey: this.configService.get<string>('etherscan_api_key'),
        },
      })
      .pipe(
        map((res) => res.data.result),
        map((obj) => ({
          ...obj,
        })),
        toArray(),
      )
      .pipe(
        catchError(() => {
          throw new ForbiddenException('API not available');
        }),
      )
      .toPromise();

    const transaction = new this.transactionsModel({
      createdAt: new Date(),
      address,
      response: response,
    });

    await transaction.save();
    return response;
  }

  async getBalance(address: string) {
    const transactions = await this.transactionsModel
      .find({ address })
      .sort({ createdAt: -1 })
      .limit(1);

    const length = Object.keys(transactions[0].response[0]).length;
    let balance = 0;
    for (let i = 0; i < length; i++) {
      if (transactions[0].response[0][i].to == address) {
        balance += Number(transactions[0].response[0][i].value);
      } else if (transactions[0].response[0][i].from == address) {
        balance -= Number(transactions[0].response[0][i].value);
      }
    }

    return balance;
  }
}
