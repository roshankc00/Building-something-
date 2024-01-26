import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'prisma/prisma.service';
import { CategoryDto } from './dto/categories.dtos';
import { CreateCategoryResponse } from './types/catgegories.types';
import { Category } from '@prisma/client';

@Injectable()
export class CategoryService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaDb: PrismaService,
    private readonly configService: ConfigService,
  ) {}
  async create(categoryDto: CategoryDto): Promise<CreateCategoryResponse> {
    const { name, storeId, description } = categoryDto;
    const category = await this.prismaDb.category.create({
      data: {
        name,
        description,
        storeId,
      },
    });
    return {
      category,
      success: true,
      message: 'Category created successfully',
    };
  }

  async findSingle(id: string) {
    const category = await this.prismaDb.category.findUnique({
      where: {
        id,
      },
    });
    if (!category) {
      throw new NotFoundException('category with this id doesnt exist');
    } else {
      return category;
    }
  }

  async findAllCategoriesOfStore(storeId: string) {
    return await this.prismaDb.category.findMany({
      where: {
        storeId,
      },
    });
  }

  async delete(
    storeId: string,
    categoryId: string,
  ): Promise<CreateCategoryResponse> {
    const categoryExists = await this.prismaDb.category.findUnique({
      where: {
        id: categoryId,
        storeId,
      },
    });
    if (!categoryExists) {
      throw new NotFoundException('category with this id doesnt exist ');
    }
    const category = await this.prismaDb.category.delete({
      where: {
        id: categoryId,
        storeId,
      },
    });

    return {
      success: true,
      message: 'category with this id deleted successfully',
      category,
    };
  }
}
