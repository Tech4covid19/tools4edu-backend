import * as mongoose from 'mongoose';

export const AuditLogSchema = new mongoose.Schema({
  action: {
    type: String,
    required: true
  },
  mutation: {
    type: String,
    required: false
  },
  params: {
    type: String,
    required: false
  },
  previousState: {
    type: String,
    required: false
  },
  newState: {
    type: String,
    required: false
  },
  userEmail: {
    type: String,
    required: false
  },
  stacktrace: {
    type: String,
    required: false
  }
}, { timestamps: true });
