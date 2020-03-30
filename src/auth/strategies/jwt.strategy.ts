import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { ClaimVerifyResult, handler } from './jwt.verify';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'ToolsSecret4EduKey'
    });
  }

  public async validate(
    payload: any,
    done: (err: Error | null, result: ClaimVerifyResult) => void
  ) {
    const userInfo = await handler(payload);
    if (!userInfo) {
      return done(new UnauthorizedException(), null);
    }
    done(null, userInfo);
  }
}