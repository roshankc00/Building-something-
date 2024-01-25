import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'prisma/prisma.service';
import { SizesDto } from './dto/sizes.dto';
import { CreateSizeResponse } from './types/sizes.types';

@Injectable()
export class SizesService {
  constructor(private readonly prismaDb: PrismaService) {}
  async create(sizeDto: SizesDto): Promise<CreateSizeResponse> {
    const { name, storeId, value } = sizeDto;
    const size = await this.prismaDb.size.create({
      data: {
        name,
        value,
        storeId,
      },
    });
    return { size, success: true, message: 'Size created successfully' };
  }
  async findSingle(id: string) {
    const size = await this.prismaDb.size.findUnique({
      where: {
        id,
      },
    });
    if (!size) {
      throw new NotFoundException('Size with this id doesnt exist');
    } else {
      return size;
    }
  }

  async findAllSizesOfStore(storeId: string) {
    return await this.prismaDb.size.findMany({
      where: {
        storeId,
      },
    });
  }
  async delete(storeId: string, sizeId: string): Promise<CreateSizeResponse> {
    const sizeExists = await this.prismaDb.size.findUnique({
      where: {
        id: sizeId,
        storeId,
      },
    });
    if (!sizeExists) {
      throw new NotFoundException('Size with this id doesnt exist ');
    }
    const size = await this.prismaDb.size.delete({
      where: {
        id: sizeId,
        storeId,
      },
    });

    return {
      success: true,
      message: 'Size with this id deleted successfully',
      size,
    };
  }
}
