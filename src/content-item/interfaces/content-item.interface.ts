import { Document } from 'mongoose';
import { Stakeholder } from '../../stakeholders/interfaces/stakeholder.interface';
import { Provider } from '../../providers/interfaces/provider.interface';
import { ContentTag } from '../../content-tags/interfaces/content-tag.interface';

export interface IContentItem extends Document {
  readonly type: string;
  readonly order: number;
  readonly videoUrl?: string;
  readonly videoTime?: string;
  readonly imageUrl?: string;
  readonly title: string;
  readonly text?: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
  readonly slug?: string;
  readonly published: boolean;
  readonly stakeholders: Stakeholder[] | string[];
  readonly providers: Provider[] | string[];
  readonly tags: ContentTag[] | string[];
}
