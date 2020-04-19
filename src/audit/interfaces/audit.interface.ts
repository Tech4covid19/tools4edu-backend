import { Document } from 'mongoose';

export interface AuditLog extends Document {
  action: string;
  mutation?: string;
  params?: string;
  previousState?: string;
  newState?: string;
  userEmail?: string;
  createdAt?: Date;
  updatedAt?: Date;
  stacktrace?: string;
}
