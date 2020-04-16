import * as mongoose from 'mongoose';

export const StakeholderSchema = new mongoose.Schema({
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
    required: false
  },
  order: {
    type: Number,
    required: false
  },
  published: {
    type: Boolean,
    required: true,
    default: false
  }
});
