import { Document } from 'mongoose';
import { Stakeholder } from '../../stakeholders/interfaces/stakeholder.interface';

export interface Video extends Document {
  readonly order: number;
  readonly title: string;
  readonly description: string;
  readonly stakeholder: Stakeholder;
}