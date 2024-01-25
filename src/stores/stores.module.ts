import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import { StoresService } from './stores.service';
import { StoreResolver } from './stores.resolver';

@Module({
  imports: [],
  exports: [],
  providers: [
    ConfigService,
    JwtService,
    PrismaService,
    StoresService,
    StoreResolver,
  ],
})
export class StoresModule {}
