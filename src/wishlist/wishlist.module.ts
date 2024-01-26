import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import { WishListService } from './wishlist.service';
import { WishlistResolver } from './wishlist.resolver';

@Module({
  imports: [],
  exports: [WishListService],
  providers: [
    ConfigService,
    JwtService,
    PrismaService,
    WishListService,
    WishlistResolver,
  ],
})
export class WishlistModule {}
