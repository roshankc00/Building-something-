import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Args } from '@nestjs/graphql';
import { CartDto } from './dtos/cart.dto';
import { AddToCartItemResponse, AddToCartResponse } from './types/cart.types';

@Injectable()
export class CartService {
  constructor(private readonly prismaDb: PrismaService) {}
  async AddToCart(
    @Args('cartDto') cartDto: CartDto,
  ): Promise<AddToCartResponse> {
    const { productId, storeId, userId } = cartDto;
    const cartExist = await this.prismaDb.cart.findFirst({
      where: {
        userId,
        storeId,
      },
    });
    if (cartExist) {
      const cartItem = await this.prismaDb.cartItem.create({
        data: {
          productId,
          cartId: cartExist.id,
        },
      });
      const updcart = await this.prismaDb.cart.findFirst({
        where: {
          userId,
          storeId,
        },
        include: {
          store: true,
          cartItems: {
            include: {
              cart: true,
              product: true,
            },
          },
        },
      });
      return {
        success: true,
        message: 'Item added to the cart',
        cart: updcart,
      };
    } else {
      const newCart = await this.prismaDb.cart.create({
        data: {
          storeId,
          userId,
        },
      });

      const CartItem = await this.prismaDb.cartItem.create({
        data: {
          cartId: newCart.id,
          productId,
        },
      });

      const updcart = await this.prismaDb.cart.findFirst({
        where: {
          userId,
          storeId,
        },
        include: {
          store: true,
          cartItems: {
            include: {
              cart: true,
              product: true,
            },
          },
        },
      });
      return {
        success: true,
        message: 'Item added to the cart',
        cart: updcart,
      };
    }
  }

  async getAllCartsOfUserOfSpecificStore(storeId: string, userId: string) {
    return await this.prismaDb.cart.findFirst({
      where: {
        storeId,
        userId,
      },
      include: {
        store: true,
        cartItems: {
          include: {
            cart: true,
            product: true,
          },
        },
      },
    });
  }

  async removeItemFromCart(cartItemId: string): Promise<AddToCartResponse> {
    const item = this.prismaDb.cart.delete({
      where: {
        id: cartItemId,
      },
    });

    return {
      success: true,
      message: 'Item removed from cart',
      cart: item,
    };
  }

  async decreaseItemCartQuantity(
    cartItemId: string,
  ): Promise<AddToCartItemResponse> {
    const cartItem = await this.prismaDb.cartItem.findUnique({
      where: {
        id: cartItemId,
      },
    });

    if (!cartItem) {
      throw new NotFoundException('Item with this id doesnt exxist');
    }
    if (cartItem.quantity > 1) {
      const newUpatedItem = await this.prismaDb.cartItem.update({
        where: {
          id: cartItemId,
        },
        data: {
          quantity: cartItem.quantity - 1,
        },
        include: {
          product: true,
        },
      });
      return {
        success: true,
        message: 'cart item removed successfully',
        cartItem: newUpatedItem,
      };
    } else {
      const delcart = await this.prismaDb.cartItem.delete({
        where: {
          id: cartItemId,
        },
        include: {
          product: true,
        },
      });

      return {
        success: true,
        message: 'cart item deleted successfully',
        cartItem: delcart,
      };
    }
  }

  async increaseItemCartQuantity(cartItemId: string) {
    const cartItem = await this.prismaDb.cartItem.findUnique({
      where: {
        id: cartItemId,
      },
    });
    if (!cartItem) {
      throw new NotFoundException('Cart with this id doesnt exist');
    }
    const updCartItem = await this.prismaDb.cartItem.update({
      where: {
        id: cartItemId,
      },
      data: {
        quantity: cartItem.quantity + 1,
      },
      include: {
        product: true,
      },
    });
    return {
      success: true,
      message: 'cart Quantity increased successfully',
      cartItem: updCartItem,
    };
  }
}
