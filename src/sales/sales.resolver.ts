import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Sale } from './entities/sale.entities';
import { SalesService } from './sales.service';
import { SalesDto } from './dtos/sales.dto';
import { SaleResponse } from './types/sale.types';

@Resolver('Sale')
export class SaleResolver {
  constructor(private readonly salesService: SalesService) {}

  @Mutation(() => Sale)
  async createSale(saleDto: SalesDto) {
    return await this.salesService.createSale(saleDto);
  }

  @Query(() => SaleResponse, { name: 'AllSalesForAdmin' })
  async getAllSaleForAdmin() {
    return await this.salesService.getSalesForAdmin();
  }

  @Query(() => SaleResponse, { name: 'AllSalesForAdmin' })
  async getAllSaleForSeller(@Args('storeId') storeId: string) {
    return await this.salesService.getSalesOfParticularStore(storeId);
  }
}
