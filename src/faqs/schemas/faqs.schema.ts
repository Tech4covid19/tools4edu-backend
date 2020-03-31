import * as mongoose from 'mongoose';

export const FaqSchema = new mongoose.Schema({
  order: {
    type: Number,
    required: true,
  },
  question: {
    type: String,
    required: true
  },
  answer: {
    type: String,
    required: true
  },
  published: {
    type: Boolean,
    required: true
  },
  stakeholder: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Stakeholder'
  }
});