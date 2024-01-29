import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ProductDto, UpdateProductDto } from './dtos/products.dtos';
import { CreateProductResponse } from './types/products.types';
import { ProductSortEnum, ProductSortInput } from './dtos/getProduct.dto';
import { Product } from './entities/products.entiry';

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

  async getAllProducts(sortOptions: ProductSortInput) {
    const query: {
      where?: {
        [key: string]: string | { contains: string };
      };
      orderBy?: { [key: string]: 'asc' | 'desc' };
      include: { [key: string]: boolean };
    } = {
      where: {},
      include: {
        images: true,
        size: true,
        store: true,
        category: true,
        color: true,
      },
    };

    const { sort, category, color, searchText, size } = sortOptions;
    if (sort) {
      console.log(sort);

      switch (sort) {
        case ProductSortEnum.NAME_ASC:
          query.orderBy = {
            name: 'asc',
          };
          break;
        case ProductSortEnum.NAME_DESC:
          query.orderBy = {
            name: 'desc',
          };
          break;
        case ProductSortEnum.PRICE_ASC:
          query.orderBy = {
            price: 'asc',
          };
          break;
        case ProductSortEnum.PRICE_DESC:
          query.orderBy = {
            price: 'desc',
          };
          break;
        default:
          query.orderBy = {
            createdAt: 'desc',
          };
      }
    }

    if (query.orderBy) {
      if (category) {
        query.where = { ...query.where, category };
      } else if (color) {
        query.where = { ...query.where, color };
      } else if (size) {
        query.where = { ...query.where, size };
      } else if (searchText) {
        query.where = {
          ...query.where,
          name: {
            contains: searchText,
          },
        };
      }
      const product = await this.prismaDb.product.findMany(query);
      if (product) {
        return product;
      } else {
        return [];
      }
    }
  }
}
