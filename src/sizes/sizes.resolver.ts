import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SizesService } from './sizes.service';
import { CreateSizeResponse } from './types/sizes.types';
import { SizesDto } from './dto/sizes.dto';
import { Size } from './entities/sizes.entities';
import { UseGuards } from '@nestjs/common';
import { Roles } from 'src/core/decorators/role.decorator';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { RolesConstant } from 'src/utils/constants';

@Resolver('Size')
export class SizeResolver {
  constructor(private readonly sizeService: SizesService) {}

  @Mutation(() => CreateSizeResponse)
  @UseGuards(AuthGuard)
  @Roles(RolesConstant.Seller)
  async createSize(
    @Args('sizeDto') sizeDto: SizesDto,
    @Context() context: { res: Response },
  ): Promise<CreateSizeResponse> {
    return await this.sizeService.create(sizeDto);
  }

  @Query(() => [Size], {
    name: 'sizeOfStore',
  })
  @UseGuards(AuthGuard)
  @Roles(RolesConstant.Seller)
  async findAllSizeOfStore(@Args('storeId') storeId: string) {
    return await this.sizeService.findAllSizesOfStore(storeId);
  }

  @Query(() => Size, { name: 'size' })
  @UseGuards(AuthGuard)
  @Roles(RolesConstant.Seller)
  async findOneStore(@Args('id', { type: () => String }) id: string) {
    return await this.sizeService.findSingle(id);
  }

  @Mutation(() => CreateSizeResponse)
  @UseGuards(AuthGuard)
  @Roles(RolesConstant.Seller)
  async deleteSize(
    @Args('storeId') storeId: string,
    @Args('id') id: string,
  ): Promise<CreateSizeResponse> {
    return await this.sizeService.delete(storeId, id);
  }
}
