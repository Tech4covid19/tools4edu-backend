export class CreateAuditLogDto {
  readonly mutation: string;
  readonly params: string;
  readonly previousState?: string;
  readonly newState: string;
  readonly userId: string;
  readonly userEmail: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}
