import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ColorsService } from './colors.service';
import { ColorsDto } from './dto/colors.dto';
import { CreateColorResponse } from './types/colors.types';
import { Color } from './entities/colors.entities';

@Resolver('Color')
export class ColorResolver {
  constructor(private readonly colorService: ColorsService) {}

  @Mutation(() => CreateColorResponse)
  async createColor(
    @Args('colorsDto') colorDto: ColorsDto,
    @Context() context: { res: Response },
  ): Promise<CreateColorResponse> {
    return await this.colorService.create(colorDto);
  }

  @Query(() => [Color], {
    name: 'colorsOfStore',
  })
  async findAllStore(@Args('storeId') storeId: string) {
    return await this.colorService.findAllColorsOfStore(storeId);
  }

  @Query(() => Color, { name: 'color' })
  async findOneStore(@Args('id', { type: () => String }) id: string) {
    return await this.colorService.findSingle(id);
  }

  @Mutation(() => CreateColorResponse)
  async deleteColor(
    @Args('storeId') storeId: string,
    @Args('id') id: string,
  ): Promise<CreateColorResponse> {
    return await this.colorService.deleteColor(storeId, id);
  }
}
