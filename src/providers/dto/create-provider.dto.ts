import { Video } from '../../videos/interfaces/video.interface';

export class CreateProviderDto {
  readonly order: number;
  readonly title: string;
  readonly description: string;
  readonly videos: Video[];
}