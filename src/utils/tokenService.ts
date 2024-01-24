import { ConfigService } from '@nestjs/config';

import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

export class AuthTokenService {
  constructor(
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  public sendToken(user: User) {
    const accessToken = this.jwt.sign(
      { id: user.id },
      {
        secret: this.config.get<string>('ACCESS_TOKEN_SECRET'),
        expiresIn: '15m',
      },
    );

    return { accessToken };
  }
}
