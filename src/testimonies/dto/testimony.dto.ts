export class CreateTestimonyDto {
  readonly author: string;
  readonly occupation: string;
  readonly text: string;
}

export class UpdateTestimonyDto {
  readonly author?: string;
  readonly occupation?: string;
  readonly text?: string;
}