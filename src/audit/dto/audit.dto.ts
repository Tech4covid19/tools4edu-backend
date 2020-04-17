export class CreateAuditLogDto {
  readonly action?: string;
  readonly mutation?: string;
  readonly params?: string;
  readonly previousState?: string;
  readonly newState?: string;
  readonly userEmail?: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
  readonly stacktrace?: string;
  readonly token?: string;
}
