import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import { ProductService } from './products.service';
import { ProductResolver } from './products.resolver';

@Module({
  imports: [],
  exports: [ProductService],
  providers: [
    ConfigService,
    JwtService,
    PrismaService,
    ProductResolver,
    ProductService,
  ],
})
export class ProductModule {}
