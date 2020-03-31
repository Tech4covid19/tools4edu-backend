import { Document } from 'mongoose';

export interface Testimony extends Document {
  readonly author: string;
  readonly occupation: string;
  readonly text: string;
  readonly published: boolean;
}