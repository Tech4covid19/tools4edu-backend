import * as mongoose from 'mongoose';

export const BlogArticleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  images: {
    type: [String],
    required: true
  },
  text: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true
  },
  published: {
    type: Boolean,
    required: true,
    default: false
  },
  videoUrl: {
    type: String,
    required: false
  }
}, { timestamps: true });
