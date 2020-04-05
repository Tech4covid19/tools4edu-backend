import { Document } from 'mongoose';

export interface ContentTag extends Document {
  readonly title: string;
  readonly description: string;
  readonly code: string;
  readonly published: boolean;
}
