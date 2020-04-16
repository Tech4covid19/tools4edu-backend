import { Document } from 'mongoose';

export interface AuditLog extends Document {
  mutation: string;
  params: string;
  previousState?: string;
  newState: string;
  userId: string;
  userEmail: string;
  createdAt?: Date;
  updatedAt?: Date;
}
