import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserResolver } from './users.resolver';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  imports: [],
  exports: [UsersService],
  providers: [
    ConfigService,
    JwtService,
    PrismaService,
    UserResolver,
    UsersService,
  ],
})
export class UsersModule {}
