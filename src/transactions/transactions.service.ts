import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { map, catchError } from 'rxjs';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly httpService: HttpService,
    private configService: ConfigService,
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
      .pipe(map((res) => res.data))
      .pipe(
        catchError(() => {
          throw new ForbiddenException('API not available');
        }),
      );
    return response;
  }
}
