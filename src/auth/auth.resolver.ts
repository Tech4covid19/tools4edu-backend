import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { Auth } from './models/auth.model';
import { LoginInput } from './models/login.model';
import { NewPasswordInput } from './models/newPassword.model';
import { AuthNewpasswordDto } from './dto/auth-newpassword.dto';

@Resolver()
export class AuthResolver {
  constructor(
    private authService: AuthService
  ) {}

  @Mutation(returns => Auth)
  async login(@Args('user', {type: () => LoginInput}) userData: AuthLoginDto): Promise<any> {
    return await this.authService.login(userData)
  }

  @Mutation(returns => Auth)
  async completeNewPasswordChallenge(@Args('user', { type: () => NewPasswordInput}) userData: AuthNewpasswordDto): Promise<any> {
    console.log('here', userData);
    return await this.authService.completeNewPasswordChallenge(userData)
  }
}
