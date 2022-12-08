import * as mongoose from 'mongoose';

export const EthereumPriceSchema = new mongoose.Schema({
  createdAt: Date,
  ethPrice: Number,
});
