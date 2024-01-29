import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import { OrderService } from './order.service';
import { OrderResolver } from './orders.resolver';

@Module({
  imports: [],
  exports: [OrderService],
  providers: [
    ConfigService,
    JwtService,
    PrismaService,
    OrderService,
    OrderResolver,
  ],
})
export class ProductModule {}
