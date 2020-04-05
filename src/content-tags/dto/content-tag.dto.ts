export class CreateContentTagDto {
  readonly title: string;
  readonly description: string;
  readonly code: string;
  readonly published: boolean;
  readonly order: number;
}

export class UpdateContentTagDto {
  readonly title?: string;
  readonly description?: string;
  readonly code?: string;
  readonly published?: boolean;
  readonly order?: number;
}
