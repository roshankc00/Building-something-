import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ProductDto, UpdateProductDto } from './dtos/products.dtos';
import { CreateProductResponse } from './types/products.types';

@Injectable()
export class ProductService {
  constructor(private readonly prismaDb: PrismaService) {}

  async create(productDto: ProductDto): Promise<CreateProductResponse> {
    const {
      categoryId,
      description,
      name,
      price,
      stock,
      colorId,
      sizeId,
      storeId,
    } = productDto;
    const product = await this.prismaDb.product.create({
      data: {
        name,
        description,
        storeId,
        categoryId,
        colorId: colorId,
        sizeId: sizeId,
        price: +price.toFixed(2),
        stock,
      },
    });
    return { success: true, message: 'product created successfully', product };
  }

  async getSingleProduct(id: string) {
    return await this.prismaDb.product.findUnique({
      where: {
        id,
      },
      include: {
        images: true,
        size: true,
        store: true,
        category: true,
        color: true,
      },
    });
  }

  async updateProduct(id: string, data: any): Promise<CreateProductResponse> {
    const product = await this.prismaDb.product.update({
      where: {
        id,
      },
      data: { ...data },
      include: {
        images: true,
        size: true,
        store: true,
        category: true,
        color: true,
      },
    });
    return { success: true, message: 'product updated successfully', product };
  }

  async getAllProductsForSeller(storeId: string) {
    return await this.prismaDb.product.findMany({
      where: {
        storeId,
      },
    });
  }
}
