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
  }
});