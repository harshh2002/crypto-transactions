import * as mongoose from 'mongoose';

export const TransactionsSchema = new mongoose.Schema({
  createdAt: Date,
  address: String,
  response: [],
});
