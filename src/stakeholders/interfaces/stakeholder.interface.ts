import { Document } from 'mongoose';

export interface Stakeholder extends Document {
  readonly id: string;
  readonly code: string;
  readonly title: string;
  readonly description: string;
  readonly order: number;
  readonly published: boolean;
}
