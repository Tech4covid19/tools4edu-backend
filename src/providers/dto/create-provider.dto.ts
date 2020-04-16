export class CreateProviderDto {
  readonly order: number;
  readonly code: string;
  readonly title: string;
  readonly description: string;
  readonly published: boolean;
}
