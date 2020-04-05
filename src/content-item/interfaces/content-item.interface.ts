import { Document } from 'mongoose';
import { Stakeholder } from '../../stakeholders/interfaces/stakeholder.interface';
import { Provider } from '../../providers/interfaces/provider.interface';

export interface IContentItem extends Document {
  readonly order: number;
  readonly videoUrl?: string;
  readonly videoTime?: string;
  readonly imageUrl?: string;
  readonly title: string;
  readonly text?: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
  readonly published: boolean;
  readonly stakeholder: Stakeholder;
  readonly provider: Provider;
}
