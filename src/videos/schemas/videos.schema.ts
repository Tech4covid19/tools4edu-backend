import * as mongoose from 'mongoose';

export const VideoSchema = new mongoose.Schema({
  order: {
    type: Number,
    required: true,
  },
  videoUrl: {
    type: String,
    required: true
  },
  time: {
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
  stakeholder: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Stakeholder'
  }
});