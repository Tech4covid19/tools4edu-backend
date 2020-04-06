import { Document, Schema } from 'mongoose';
import { Provider as IProvider } from '../../providers/interfaces/provider.interface';
import { Stakeholder as IStakeholder } from '../../stakeholders/interfaces/stakeholder.interface';

export interface Faq extends Document {
  readonly order: number;
  readonly question: string;
  readonly answer: string;
  readonly published: boolean;
  readonly stakeholder: IStakeholder | string;
  readonly provider: IProvider | string;
}
