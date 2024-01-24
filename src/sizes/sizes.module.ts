import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  imports: [],
  exports: [],
  providers: [ConfigService, JwtService, PrismaService],
})
export class SizesModule {}
