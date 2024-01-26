import { Field, ObjectType } from '@nestjs/graphql';
import {} from '@prisma/client';
import { ErrorType } from 'src/users/types/users.types';
import { Wishlist, WishlistItem } from '../entities/wishlist.entities';

@ObjectType()
export class AddToWishlistItemResponse {
  @Field()
  message: string;

  @Field()
  success: boolean;

  @Field(() => WishlistItem)
  wishlistItem: WishlistItem | any;

  @Field(() => ErrorType, { nullable: true })
  error?: ErrorType;
}

@ObjectType()
export class getAllWishlistResponse {
  @Field(() => [WishlistItem])
  wishListItems: WishlistItem[] | any;

  @Field(() => ErrorType, { nullable: true })
  error?: ErrorType;
}
