import { Connection } from 'mongoose';
import { TransactionsSchema } from './transactions.schema';

export const transactionsProviders = [
  {
    provide: 'TRANSACTIONS_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Transactions', TransactionsSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
