import { Stakeholder } from '../../stakeholders/interfaces/stakeholder.interface';

export class CreateVideoDto {
  readonly order: number;
  readonly title: string;
  readonly description: string;
  readonly stakeholder: Stakeholder;
}