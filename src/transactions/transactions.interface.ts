import { Document } from 'mongoose';

export interface Transactions extends Document {
  readonly address: string;
  readonly response: [];
}
