import { Schema } from 'mongoose';

export const ContentItemSchema = new Schema({
  type: {
    type: String,
    required: true
  },
  order: {
    type: Number,
    required: false
  },
  videoUrl: {
    type: String,
    required: false
  },
  videoTime: {
    type: String,
    required: false
  },
  imageUrl: {
    type: String,
    required: false
  },
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: false
  },
  slug: {
    type: String,
    required: false
  },
  published: {
    type: Boolean,
    required: true,
    default: false
  },
  stakeholders: {
    type: [Schema.Types.ObjectId], ref: 'Stakeholder'
  },
  providers: {
    type: [Schema.Types.ObjectId], ref: 'Provider'
  },
  tags: {
    type: [Schema.Types.ObjectId], ref: 'ContentTag'
  }
}, { timestamps: true });
