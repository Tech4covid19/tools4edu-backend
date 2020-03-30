import { Document, Schema } from 'mongoose';

export interface Video extends Document {
  readonly order: number;
  readonly videoUrl: string;
  readonly time: string;
  readonly title: string;
  readonly description: string;
  readonly stakeholder: Schema.Types.ObjectId;
}