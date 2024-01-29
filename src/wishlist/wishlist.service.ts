import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Args } from '@nestjs/graphql';
import { WishListDto } from './dtos/wishlist.dto';
import {
  AddToWishlistItemResponse,
  getAllWishlistResponse,
} from './types/wishlist.types';

@Injectable()
export class WishListService {
  constructor(private readonly prismaDb: PrismaService) {}
  async AddToWishlist(
    @Args('wishlistDto') wishListDto: WishListDto,
  ): Promise<AddToWishlistItemResponse> {
    const { productId, storeId, userId } = wishListDto;
    const wishlistExist = await this.prismaDb.wishlist.findFirst({
      where: {
        userId,
      },
    });
    if (wishlistExist) {
      const itemExistInWishlist = await this.prismaDb.wishListItem.findFirst({
        where: {
          productId,
          wishlistId: wishlistExist.id,
        },
      });
      if (itemExistInWishlist) {
        throw new BadRequestException('Product already exist in the wishlist');
      }
      const wishlistItem = await this.prismaDb.wishListItem.create({
        data: {
          productId,
          wishlistId: wishlistExist.id,
        },
        include: {
          product: true,
        },
      });

      return {
        success: true,
        message: 'Item added to the Wishlist',
        wishlistItem: wishlistItem,
      };
    } else {
      const newWishlist = await this.prismaDb.wishlist.create({
        data: {
          userId,
        },
      });
      const wishlistItem = await this.prismaDb.wishListItem.create({
        data: {
          wishlistId: newWishlist.id,
          productId,
        },
        include: {
          product: true,
        },
      });

      return {
        success: true,
        message: 'Item added to the watchlist',
        wishlistItem: wishlistItem,
      };
    }
  }

  async getAllWishlistsOfUserOfSpecificStore(
    storeId: string,
    userId: string,
  ): Promise<getAllWishlistResponse> {
    return this.prismaDb.wishlist.findFirst({
      where: {
        userId,
      },
      include: {
        wishListItems: {
          include: {
            product: true,
          },
        },
      },
    });
  }

  async removeItemFromWishList(
    wishlistItemId: string,
  ): Promise<AddToWishlistItemResponse> {
    const item = this.prismaDb.wishListItem.delete({
      where: {
        id: wishlistItemId,
      },
      include: {
        product: true,
      },
    });

    return {
      success: true,
      message: 'Item removed from wishlist',
      wishlistItem: item,
    };
  }
}
