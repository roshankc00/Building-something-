import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'prisma/prisma.service';
import { StoreDto, UpdateStoreDto } from './dto/stores.dto';
import { CreateStoreResponse } from './types/stores.types';
import { Store } from '@prisma/client';

@Injectable()
export class StoresService {
  constructor(
    private readonly prismaDb: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async create(storeDto: StoreDto): Promise<CreateStoreResponse> {
    const { name, userId } = storeDto;
    const userHasStorePreviously = await this.prismaDb.store.findUnique({
      where: {
        userId,
      },
    });

    if (userHasStorePreviously) {
      throw new BadRequestException(
        'User with this id has already a registered store',
      );
    }
    const store = this.prismaDb.store.create({
      data: {
        name,
        userId,
      },
    });
    return { message: 'Store registered successfully', success: true, store };
  }

  async getSingleStore(id: string): Promise<Store> {
    return await this.prismaDb.store.findUnique({
      where: {
        id,
      },
    });
  }

  async deActivateStore(id: string): Promise<CreateStoreResponse> {
    const store = await this.prismaDb.store.update({
      where: {
        id,
      },
      data: {
        isActive: false,
      },
    });
    return {
      message: 'Store has been successfully deactivated',
      success: true,
      store,
    };
  }

  async updateStore(
    id: string,
    data: UpdateStoreDto,
  ): Promise<CreateStoreResponse> {
    const store = await this.prismaDb.store.update({
      where: {
        id,
      },
      data: data,
    });
    return { message: 'Store updated successfully', store, success: true };
  }

  async getAllStore(): Promise<Store[]> {
    return await this.prismaDb.store.findMany({});
  }

  async getAllActivatedStore(): Promise<Store[]> {
    return await this.prismaDb.store.findMany({
      where: {
        isActive: true,
      },
    });
  }
}
