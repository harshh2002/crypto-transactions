import { Document } from 'mongoose';

export interface Ethereum extends Document {
  readonly createdAt: Date;
  readonly ethPrice: number;
}
