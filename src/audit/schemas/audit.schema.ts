import * as mongoose from 'mongoose';

export const AuditLogSchema = new mongoose.Schema({
  mutation: {
    type: String,
    required: true
  },
  params: {
    type: String,
    required: true
  },
  previousState: {
    type: String,
    required: false
  },
  newState: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  userEmail: {
    type: String,
    required: true
  }
}, { timestamps: true });
