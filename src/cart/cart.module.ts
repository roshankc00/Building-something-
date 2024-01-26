import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import { CartService } from './cart.service';
import { CartResolver } from './cart.resolver';

@Module({
  imports: [],
  exports: [CartService],
  providers: [
    ConfigService,
    JwtService,
    PrismaService,
    CartResolver,
    CartService,
  ],
})
export class CartModule {}
