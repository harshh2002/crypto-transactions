import { Module } from '@nestjs/common';
import { EthereumService } from './ethereum.service';
import { Ethereum } from './ethereum';
import { HttpModule } from '@nestjs/axios';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [HttpModule, DatabaseModule],
  providers: [EthereumService, ...Ethereum],
})
export class EthereumModule {}
