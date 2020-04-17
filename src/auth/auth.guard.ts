import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuditService } from '../audit/audit.service';

function extractToken (req) {
  console.log('req cookies', req.cookies);
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1];
  } else if (req.query && req.query.token) {
    return req.query.token;
  }
  return null;
}

@Injectable()
export class GraphQLAuthGuard extends JwtStrategy implements CanActivate {

  constructor(
    private auditService: AuditService
  ) {
    super();
  }

  canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();
    const token = extractToken(req);

    return new Promise((resolve) => {
      return this.validate({ token: token }, (err, result) => {
        if (err) {
          console.log('validate err', err);
          resolve(false);
        }

        console.log('validate result', result);
        resolve(result.isValid);
      })
    });
  }
}
