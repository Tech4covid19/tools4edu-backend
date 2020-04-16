import { Document } from 'mongoose';

export interface Provider extends Document {
  readonly order: number;
  readonly code: string;
  readonly title: string;
  readonly description: string;
  readonly published: boolean;
}
