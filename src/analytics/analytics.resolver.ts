import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseFilters, UseGuards } from '@nestjs/common';
import { GraphQLErrorFilter } from 'src/core/intercepters/custom.excepter.filter';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { AnalyticsService } from './analytics.service';
import { Analytics, SalesAnalytics } from './entities/analytics.entity';
import { CreateResponse } from './types/analytics.types';

@UseFilters(GraphQLErrorFilter)
@Resolver('Analytics')
export class AnalyticsResolver {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Query(() => [Analytics], { name: 'getUserAnalytics' })
  async getUserAnalytics() {
    return await this.analyticsService.GetUserAnalytics();
  }

  @Query(() => [Analytics], { name: 'getProductAnalyticsAdmin' })
  async getProductAnalytics() {
    return await this.analyticsService.GetUserAnalytics();
  }

  @Query(() => [Analytics], { name: 'getProductAnalyticsForSeller' })
  async getProductAnalyticsForSeller(@Args('storeId') storeId: string) {
    return await this.analyticsService.GetProductAnalyticsForSeller(storeId);
  }

  @Query(() => [Analytics], { name: 'getProductOrderAdmin' })
  async getOrderAnalytics() {
    return await this.analyticsService.GetUserAnalytics();
  }

  @Query(() => [Analytics], { name: 'getStoreAnalytics' })
  async getStoreAnalytics() {
    return await this.analyticsService.GetUserAnalytics();
  }

  @Query(() => [SalesAnalytics], { name: 'getStoreAnalytics' })
  async getSaleAnalyticsForAdmin() {
    return await this.analyticsService.storeAnalyticsForAdmin();
  }
  @Query(() => [SalesAnalytics], { name: 'getStoreAnalytics' })
  async getSaleAnalyticsForSale(@Args('storeId') storeId: string) {
    return await this.analyticsService.sellAnalyticsForStore(storeId);
  }
}
