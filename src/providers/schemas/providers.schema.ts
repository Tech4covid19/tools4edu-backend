import * as mongoose from 'mongoose';

export const ProviderSchema = new mongoose.Schema({
  order: {
    type: Number,
    required: true
  },
  code: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  published: {
    type: Boolean,
    required: true,
    default: false
  }
});
