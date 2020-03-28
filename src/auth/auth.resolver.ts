import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { Auth } from './models/auth.model';
import { LoginInput } from './models/login.model';

@Resolver()
export class AuthResolver {
  constructor(
    private authService: AuthService
  ) {}

  @Mutation(returns => Auth)
  async login(@Args('user', {type: () => LoginInput}) userData: AuthLoginDto): Promise<any> {
    return await this.authService.login(userData)
  }
}