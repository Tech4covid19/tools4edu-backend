export class CreateVideoDto {
  readonly order: number;
  readonly videoUrl: string;
  readonly time: string;
  readonly title: string;
  readonly description: string;
  readonly stakeholderId: string;
}

export class UpdateVideoDto {
  readonly order?: number;
  readonly videoUrl?: string;
  readonly time?: string;
  readonly title?: string;
  readonly description?: string;
  readonly stakeholderId?: string;
}