import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { StoresService } from './stores.service';
import { Store } from './entities/store.entiry';
import { StoreDto, UpdateStoreDto } from './dto/stores.dto';
import { CreateStoreResponse } from './types/stores.types';

@Resolver('Store')
export class StoreResolver {
  constructor(private readonly storeService: StoresService) {}

  @Mutation(() => CreateStoreResponse)
  async createStore(
    @Args('storeDto') storeDto: StoreDto,
    @Context() context: { res: Response },
  ): Promise<CreateStoreResponse> {
    return await this.storeService.create(storeDto);
  }

  @Query(() => [Store], {
    name: 'stores',
  })
  async findAllStore() {
    return await this.storeService.getAllActivatedStore();
  }

  @Query(() => Store, { name: 'store' })
  async findOneStore(@Args('id', { type: () => String }) id: string) {
    return await this.storeService.getSingleStore(id);
  }

  @Mutation(() => CreateStoreResponse)
  async updateStore(
    @Args('id') id: string,
    @Args('storeDto') storeDto: UpdateStoreDto,
    @Context() context: { res: Response },
  ): Promise<CreateStoreResponse> {
    return await this.storeService.updateStore(id, storeDto);
  }

  @Mutation(() => CreateStoreResponse)
  async deactivateStore(
    @Args('id') id: string,
    @Context() context: { res: Response },
  ) {
    return await this.storeService.deActivateStore(id);
  }

  @Query(() => [Store], {
    name: 'adminStores',
  })
  async findAllStoreForAdmin() {
    return await this.storeService.getAllStore();
  }
}
