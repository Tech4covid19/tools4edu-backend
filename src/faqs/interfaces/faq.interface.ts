import { Document, Schema } from 'mongoose';

export interface Faq extends Document {
  readonly order: number;
  readonly question: string;
  readonly answer: string;
  readonly published: boolean;
  readonly stakeholder: Schema.Types.ObjectId;
}