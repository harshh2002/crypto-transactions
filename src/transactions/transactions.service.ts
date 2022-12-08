import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { map, catchError, toArray } from 'rxjs';
import { Model } from 'mongoose';
import { Transactions } from './transactions.interface';
import { response } from 'express';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly httpService: HttpService,
    private configService: ConfigService,
    @Inject('TRANSACTIONS_MODEL')
    private readonly transactionsModel: Model<Transactions>,
  ) {}

  async getTransactions(address: string) {
    const response = this.httpService
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
      .pipe(map((res) => res.data.result))
      .pipe(
        catchError(() => {
          throw new ForbiddenException('API not available');
        }),
      );
    const data = await response
      .pipe(
        map((obj) => ({
          ...obj,
        })),
        toArray(),
      )
      .toPromise();
    const transaction = new this.transactionsModel({
      address,
      response: data,
    });

    await transaction.save();
    return response;
  }
}
