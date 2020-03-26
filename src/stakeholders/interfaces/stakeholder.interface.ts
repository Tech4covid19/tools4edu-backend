import { Document } from 'mongoose';

export interface Stakeholder extends Document {
  readonly code: string;
  readonly title: string;
  readonly description: string;
}