import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ColorsService } from './colors.service';
import { ColorsDto } from './dto/colors.dto';
import { CreateColorResponse } from './types/colors.types';
import { Color } from './entities/colors.entities';
import { UseFilters, UseGuards } from '@nestjs/common';
import { GraphQLErrorFilter } from 'src/core/intercepters/custom.excepter.filter';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { Roles } from 'src/core/decorators/role.decorator';
import { RolesConstant } from 'src/utils/constants';

@UseFilters(GraphQLErrorFilter)
@Resolver('Color')
export class ColorResolver {
  constructor(private readonly colorService: ColorsService) {}

  @Mutation(() => CreateColorResponse)
  @UseGuards(AuthGuard)
  @Roles(RolesConstant.Seller)
  async createColor(
    @Args('colorsDto') colorDto: ColorsDto,
    @Context() context: any,
  ): Promise<CreateColorResponse> {
    return await this.colorService.create(colorDto);
  }

  @Query(() => [Color], {
    name: 'colorsOfStore',
  })
  @UseGuards(AuthGuard)
  @Roles(RolesConstant.Seller)
  async findAllStore(@Args('storeId') storeId: string) {
    return await this.colorService.findAllColorsOfStore(storeId);
  }

  @Query(() => Color, { name: 'color' })
  @UseGuards(AuthGuard)
  @Roles(RolesConstant.Seller)
  async findOneStore(@Args('id', { type: () => String }) id: string) {
    return await this.colorService.findSingle(id);
  }

  @Mutation(() => CreateColorResponse)
  @UseGuards(AuthGuard)
  @Roles(RolesConstant.Seller)
  async deleteColor(
    @Args('storeId') storeId: string,
    @Args('id') id: string,
  ): Promise<CreateColorResponse> {
    return await this.colorService.deleteColor(storeId, id);
  }
}
