import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { StoresService } from './stores.service';
import { Store } from './entities/store.entiry';
import { StoreDto, UpdateStoreDto } from './dto/stores.dto';
import { CreateStoreResponse } from './types/stores.types';
import { UseFilters, UseGuards } from '@nestjs/common';
import { GraphQLErrorFilter } from 'src/core/intercepters/custom.excepter.filter';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { Roles } from 'src/core/decorators/role.decorator';
import { RolesConstant } from 'src/utils/constants';

@UseFilters(GraphQLErrorFilter)
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
  @UseGuards(AuthGuard)
  @Roles(RolesConstant.Seller)
  async findAllStore() {
    return await this.storeService.getAllActivatedStore();
  }

  @Query(() => Store, { name: 'store' })
  @UseGuards(AuthGuard)
  @Roles(RolesConstant.Seller)
  async findOneStore(@Args('id', { type: () => String }) id: string) {
    return await this.storeService.getSingleStore(id);
  }

  @Mutation(() => CreateStoreResponse)
  @UseGuards(AuthGuard)
  @Roles(RolesConstant.Seller)
  async updateStore(
    @Args('id') id: string,
    @Args('storeDto') storeDto: UpdateStoreDto,
    @Context() context: { res: Response },
  ): Promise<CreateStoreResponse> {
    return await this.storeService.updateStore(id, storeDto);
  }

  @Mutation(() => CreateStoreResponse)
  @UseGuards(AuthGuard)
  @Roles(RolesConstant.Seller, RolesConstant.SuperAdmin)
  async deactivateStore(
    @Args('id') id: string,
    @Context() context: { res: Response },
  ) {
    return await this.storeService.deActivateStore(id);
  }

  @Query(() => [Store], {
    name: 'adminStores',
  })
  @UseGuards(AuthGuard)
  @Roles(RolesConstant.SuperAdmin)
  async findAllStoreForAdmin() {
    return await this.storeService.getAllStore();
  }
}
