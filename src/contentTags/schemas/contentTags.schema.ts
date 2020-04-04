import * as mongoose from 'mongoose';

export const ContentTagSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  code: {
    type: String,
    required: true
  },
  published: {
    type: Boolean,
    required: true
  }
});
