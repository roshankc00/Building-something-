import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ColorsService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaDb: PrismaService,
    private readonly configService: ConfigService,
  ) {}
  async createColors() {
    
  }
}
