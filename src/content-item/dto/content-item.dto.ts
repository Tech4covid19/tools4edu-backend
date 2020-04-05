export class CreateContentItemDto {
  readonly order?: number;
  readonly videoUrl?: string;
  readonly videoTime?: string;
  readonly title: string;
  readonly text?: string;
  readonly slug?: string;
  readonly published: boolean;
  readonly stakeholderIds?: string[];
  readonly providerIds?: string[];
  readonly tagIds?: string[];
}

export class UpdateContentItemDto {
  readonly order?: number;
  readonly videoUrl?: string;
  readonly videoTime?: string;
  readonly title?: string;
  readonly text?: string;
  readonly slug?: string;
  readonly published?: boolean;
  readonly stakeholderIds?: string[];
  readonly providerIds?: string[];
  readonly tagIds?: string[];
}
