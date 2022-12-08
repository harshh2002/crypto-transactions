import { Connection } from 'mongoose';
import { EthereumPriceSchema } from './ethereum.schema';

export const Ethereum = [
  {
    provide: 'ETHEREUM_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('EthereumPrice', EthereumPriceSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
