import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { Model } from 'mongoose';
import { HttpService } from '@nestjs/axios';
import { Ethereum } from './ethereum.interface';
import { catchError, map, toArray } from 'rxjs';

@Injectable()
export class EthereumService {
  constructor(
    @Inject('ETHEREUM_MODEL')
    private readonly ethereumModel: Model<Ethereum>,
    private readonly httpService: HttpService,
  ) {}

  @Cron('*/10 * * * *')
  async storeEthereumPrice() {
    console.log('Fetching Ethereum Price');
    await this.fetchEthPrice();
  }

  async fetchEthPrice() {
    const response = await this.httpService
      .get(
        'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&amp;vs_currencies=inr',
      )
      .pipe(
        map((res) => res.data),
        map((res) => res.ethereum.inr),
        toArray(),
      )
      .pipe(
        catchError(() => {
          throw new ForbiddenException('API not available');
        }),
      )
      .toPromise();

    const ethPrice = new this.ethereumModel({
      createdAt: new Date(),
      ethPrice: response[0],
    });

    await ethPrice.save();
    return response[0];
  }
}
