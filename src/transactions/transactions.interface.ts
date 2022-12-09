import { Document } from 'mongoose';

export interface Transactions extends Document {
  readonly createdAt: Date;
  readonly address: string;
  readonly response: [
    [
      {
        blockNumber: string;
        timeStamp: string;
        hash: string;
        nonce: string;
        blockHash: string;
        transactionIndex: string;
        from: string;
        to: string;
        value: string;
        gas: string;
        gasPrice: string;
        isError: string;
        txreceipt_status: string;
        input: string;
        contractAddress: string;
        cumulativeGasUsed: string;
        gasUsed: string;
        confirmations: string;
      },
    ],
  ];
}
