import * as mongoose from 'mongoose';

export const TransactionsSchema = new mongoose.Schema({
  address: String,
  response: [],
});
