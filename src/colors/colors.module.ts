import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import { ColorsService } from './colors.service';
import { ColorResolver } from './colors.resolver';

@Module({
  imports: [],
  exports: [ColorsService],
  providers: [
    ConfigService,
    JwtService,
    PrismaService,
    ColorsService,
    ColorResolver,
  ],
})
export class ColorsModule {}
