import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'prisma/prisma.service';
import { ColorsDto } from './dto/colors.dto';
import { CreateColorResponse } from './types/colors.types';

@Injectable()
export class ColorsService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaDb: PrismaService,
    private readonly configService: ConfigService,
  ) {}
  async create(colorsDto: ColorsDto): Promise<CreateColorResponse> {
    const { name, storeId, value } = colorsDto;
    const color = await this.prismaDb.color.create({
      data: {
        name,
        value,
        storeId,
      },
    });
    return { color, success: true, message: 'Color created successfully' };
  }

  async findSingle(id: string) {
    const color = await this.prismaDb.color.findUnique({
      where: {
        id,
      },
    });
    if (!color) {
      throw new NotFoundException('Color with this id doesnt exist');
    } else {
      return color;
    }
  }

  async findAllColorsOfStore(storeId: string) {
    return await this.prismaDb.color.findMany({
      where: {
        storeId,
      },
    });
  }

  async deleteColor(
    storeId: string,
    colorId: string,
  ): Promise<CreateColorResponse> {
    const colorExists = await this.prismaDb.color.findUnique({
      where: {
        id: colorId,
        storeId,
      },
    });
    if (!colorExists) {
      throw new NotFoundException('color with this id doesnt exist ');
    }
    const color = await this.prismaDb.color.delete({
      where: {
        id: colorId,
        storeId,
      },
    });

    return {
      success: true,
      message: 'Color with this id deleted successfully',
      color,
    };
  }
}
