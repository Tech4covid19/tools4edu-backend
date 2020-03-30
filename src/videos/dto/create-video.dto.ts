import { Stakeholder } from '../../stakeholders/interfaces/stakeholder.interface';

export class CreateVideoDto {
  readonly order: number;
  readonly videoUrl: string;
  readonly time: string;
  readonly title: string;
  readonly description: string;
  readonly stakeholder: Stakeholder;
}