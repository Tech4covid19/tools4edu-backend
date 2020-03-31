import * as mongoose from 'mongoose';

export const TestimonySchema = new mongoose.Schema({
  author: {
    type: String,
    required: true
  },
  occupation: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  published: {
    type: Boolean,
    required: true
  }
});