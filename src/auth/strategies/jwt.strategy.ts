import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ClaimVerifyResult, verifyHandler } from './jwt.verify';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'ToolsSecret4EduKey'
    });
  }

  public async validate(
    payload: any,
    done: (err: Error | null, result: ClaimVerifyResult) => void
  ) {
    const userInfo = await verifyHandler(payload);
    if (!userInfo) {
      return done(new UnauthorizedException(), null);
    }
    done(null, userInfo);
  }
}