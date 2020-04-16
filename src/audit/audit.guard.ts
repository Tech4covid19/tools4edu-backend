import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthService } from '../auth/auth.service';

function extractToken (req) {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1];
  } else if (req.query && req.query.token) {
    return req.query.token;
  }
  return null;
}

@Injectable()
export class AuditGuard extends JwtStrategy implements CanActivate {
  constructor(
    private authService: AuthService
  ) {
    super();
  }
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();

    console.log('context', context);
    console.log('gql context', ctx.getType());
    console.log('token', extractToken(req));

    return true;
  }
}
