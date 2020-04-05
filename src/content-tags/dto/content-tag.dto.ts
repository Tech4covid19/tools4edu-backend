export class CreateContentTagDto {
  readonly title: string;
  readonly description: string;
  readonly code: string;
  readonly published: boolean;
}

export class UpdateContentTagDto {
  readonly title?: string;
  readonly description?: string;
  readonly code?: string;
  readonly published?: boolean;
}
