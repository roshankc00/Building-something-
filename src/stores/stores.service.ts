import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'prisma/prisma.service';
import { StoreDto } from './dto/stores.dto';

@Injectable()
export class StoresService {
  constructor(
    private readonly prismaDb: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async create(storeDto: StoreDto) {
    const { name, userId } = storeDto;
    return this.prismaDb.store.create({
      data: {
        name,
        userId,
      },
    });
  }
}
