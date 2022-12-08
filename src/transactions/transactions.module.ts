import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { transactionsProviders } from './transactions';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [ConfigModule, HttpModule, DatabaseModule],
  providers: [TransactionsService, ...transactionsProviders],
  controllers: [TransactionsController],
})
export class TransactionsModule {}
