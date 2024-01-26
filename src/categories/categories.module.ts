import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import { CategoryService } from './categories.service';
import { CategoryResolver } from './categories.resolver';

@Module({
  imports: [],
  exports: [],
  providers: [
    ConfigService,
    JwtService,
    PrismaService,
    CategoryService,
    CategoryResolver,
  ],
})
export class CategoriesModule {}
