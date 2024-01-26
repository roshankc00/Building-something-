import { ObjectType, Field, Directive } from '@nestjs/graphql';
import { Product } from 'src/products/entities/products.entiry';
import { Store } from 'src/stores/entities/store.entiry';

@ObjectType()
@Directive('@key(fields:"id")')
export class WishlistItem {
  @Field()
  id: string;

  @Field()
  productId: string;

  @Field(() => Product, { nullable: true })
  product?: Product | null;

  @Field()
  wishlistId: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

@ObjectType()
@Directive('@key(fields:"id")')
export class Wishlist {
  @Field()
  id: string;

  @Field()
  storeId: string;

  @Field()
  userId: string;

  @Field(() => [WishlistItem], { nullable: true })
  wishListItems?: WishlistItem[] | null;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
