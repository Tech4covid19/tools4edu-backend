import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { AuditModule } from '../audit/audit.module';


@Module({
  imports: [
    AuditModule
  ],
  providers: [
    AuthService,
    AuthResolver
  ],
  exports: [
    AuthService,
    AuthResolver
  ]
})
export class AuthModule {}
