import * as mongoose from 'mongoose';

export const ProviderSchema = new mongoose.Schema({
  order: {
    type: Number,
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
  videos: [
    {
      type: mongoose.Schema.Types.ObjectId, ref: 'Video'
    }
  ]
});