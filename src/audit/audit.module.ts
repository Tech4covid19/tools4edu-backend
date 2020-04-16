import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuditLogSchema } from './schemas/audit.schema';
import { DB_LANDINGPAGE_CONNECTION } from '../constants';
import { AuditService } from './audit.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'AuditLog',
        schema: AuditLogSchema,
        collection: 'auditLog'
      }
    ], DB_LANDINGPAGE_CONNECTION),
    AuthModule,
  ],
  providers: [
    AuditService
  ],
  exports: [
    AuditService
  ]
})
export class AuditModule {}
