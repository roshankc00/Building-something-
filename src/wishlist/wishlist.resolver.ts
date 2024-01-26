import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { WishListService } from './wishlist.service';
import {
  AddToWishlistItemResponse,
  getAllWishlistResponse,
} from './types/wishlist.types';
import { WishListDto } from './dtos/wishlist.dto';
import { Wishlist } from './entities/wishlist.entities';

@Resolver('Wishlist ')
export class WishlistResolver {
  constructor(private readonly wishlistService: WishListService) {}

  @Mutation(() => AddToWishlistItemResponse)
  async AddToWishlist(@Args('addToWishlistDto') addToWishlistDto: WishListDto) {
    return await this.wishlistService.AddToWishlist(addToWishlistDto);
  }

  @UseGuards(AuthGuard)
  @Query(() => getAllWishlistResponse, {
    name: 'wishlistOfUserOfSpecificStore',
  })
  async getWishlistItemOfUser(
    @Args('storeId') storeId: string,
    @Context() context,
  ) {
    return await this.wishlistService.getAllWishlistsOfUserOfSpecificStore(
      storeId,
      context.req.user.id,
    );
  }

  @Mutation(() => AddToWishlistItemResponse)
  async RemoveFromWishlist(@Args('wishlistItemId') wishlistItemId: string) {
    return await this.wishlistService.removeItemFromWishList(wishlistItemId);
  }
}
