import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CartService } from './cart.service';
import { AddToCartItemResponse, AddToCartResponse } from './types/cart.types';
import { CartDto } from './dtos/cart.dto';
import { Cart } from './entities/cart.entities';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/core/guards/auth.guard';

@Resolver('Cart')
export class CartResolver {
  constructor(private readonly cartService: CartService) {}

  @Mutation(() => AddToCartResponse)
  async AddToCart(@Args('addToCartDto') addToCartDto: CartDto) {
    return this.cartService.AddToCart(addToCartDto);
  }

  @Query(() => Cart, { name: 'CartOfUser' })
  @UseGuards(AuthGuard)
  async getCartItemOfUser(
    @Args('storeId') storeId: string,
    @Context() context,
  ) {
    return await this.cartService.getAllCartsOfUser(
      storeId,
      context.req.user.id,
    );
  }

  @Mutation(() => AddToCartResponse)
  async RemoveFromCart(@Args('cartItemId') cartItemId: string) {
    return this.cartService.removeItemFromCart(cartItemId);
  }

  @Mutation(() => AddToCartItemResponse)
  async decreaseCartItemQuantity(@Args('cartItemId') cartItemId: string) {
    return this.cartService.decreaseItemCartQuantity(cartItemId);
  }

  @Mutation(() => AddToCartItemResponse)
  async increaseCartItemQuantity(@Args('cartItemId') cartItemId: string) {
    return this.cartService.increaseItemCartQuantity(cartItemId);
  }
}
