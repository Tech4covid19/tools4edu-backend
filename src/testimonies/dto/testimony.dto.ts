export class CreateTestimonyDto {
  readonly author: string;
  readonly occupation: string;
  readonly text: string;
  readonly published: boolean;
}

export class UpdateTestimonyDto {
  readonly author?: string;
  readonly occupation?: string;
  readonly text?: string;
  readonly published?: boolean;
}