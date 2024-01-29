import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import { SalesService } from './sales.service';
import { SaleResolver } from './sales.resolver';

@Module({
  imports: [],
  exports: [SalesService],
  providers: [
    ConfigService,
    JwtService,
    PrismaService,
    SalesService,
    SaleResolver,
  ],
})
export class SaleModule {}
