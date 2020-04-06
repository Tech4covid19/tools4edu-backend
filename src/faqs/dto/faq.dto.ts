export class CreateFaqDto {
  readonly order: number;
  readonly question: string;
  readonly answer: string;
  readonly published: boolean;
  readonly stakeholderId: string;
  readonly providerId: string;
}

export class UpdateFaqDto {
  readonly order?: number;
  readonly question?: string;
  readonly answer?: string;
  readonly published?: boolean;
  readonly stakeholderId?: string;
  readonly providerId?: string;
}
