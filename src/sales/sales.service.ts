import { Injectable } from '@nestjs/common';
import { SalesDto } from './dtos/sales.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class SalesService {
  constructor(private readonly primaDb: PrismaService) {}
  async createSale(salesDto: SalesDto) {
    const { productId, quantity, storeId, netPrice } = salesDto;
    return this.primaDb.sale.create({
      data: {
        quantity,
        productId,
        storeId,
        netPrice,
      },
    });
  }

  async getSalesOfParticularStore(storeId: string) {
    const sales = await this.primaDb.sale.findMany({
      where: {
        storeId,
      },
      include: {
        product: true,
      },
    });
    return {
      success: true,
      message: 'Sales of store is fetched successfully',
      sales,
    };
  }

  async getSalesForAdmin() {
    const sales = await this.primaDb.sale.findMany({
      include: {
        product: true,
      },
    });
    return {
      success: true,
      message: 'Sales of store is fetched successfully',
      sales,
    };
  }
}
