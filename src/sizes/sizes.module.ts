import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import { SizeResolver } from './sizes.resolver';
import { SizesService } from './sizes.service';

@Module({
  imports: [],
  exports: [SizesService],
  providers: [
    ConfigService,
    JwtService,
    PrismaService,
    SizeResolver,
    SizesService,
  ],
})
export class SizesModule {}
