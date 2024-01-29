import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import { AnalyticsResolver } from './analytics.resolver';
import { AnalyticsService } from './analytics.service';

@Module({
  imports: [],
  exports: [],
  providers: [
    ConfigService,
    JwtService,
    PrismaService,
    AnalyticsResolver,
    AnalyticsService,
  ],
})
export class AnalyticsModule {}
