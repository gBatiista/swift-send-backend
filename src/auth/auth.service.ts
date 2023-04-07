import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string) {
    const user = await this.userService.findToLogin(email);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    delete user.password;

    return { access_token: await this.jwtService.signAsync(user) };
  }
}
