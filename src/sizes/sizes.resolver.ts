import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SizesService } from './sizes.service';
import { CreateSizeResponse } from './types/sizes.types';
import { SizesDto } from './dto/sizes.dto';
import { Size } from './entities/sizes.entities';

@Resolver('Size')
export class SizeResolver {
  constructor(private readonly sizeService: SizesService) {}

  @Mutation(() => CreateSizeResponse)
  async createSize(
    @Args('sizeDto') sizeDto: SizesDto,
    @Context() context: { res: Response },
  ): Promise<CreateSizeResponse> {
    return await this.sizeService.create(sizeDto);
  }

  @Query(() => [Size], {
    name: 'sizeOfStore',
  })
  async findAllSizeOfStore(@Args('storeId') storeId: string) {
    return await this.sizeService.findAllSizesOfStore(storeId);
  }

  @Query(() => Size, { name: 'size' })
  async findOneStore(@Args('id', { type: () => String }) id: string) {
    return await this.sizeService.findSingle(id);
  }

  @Mutation(() => CreateSizeResponse)
  async deleteSize(
    @Args('storeId') storeId: string,
    @Args('id') id: string,
  ): Promise<CreateSizeResponse> {
    return await this.sizeService.delete(storeId, id);
  }
}
