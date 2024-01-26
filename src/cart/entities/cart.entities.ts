import { ObjectType, Field, Directive } from '@nestjs/graphql';
import { Product } from 'src/products/entities/products.entiry';
import { Store } from 'src/stores/entities/store.entiry';

@ObjectType()
@Directive('@key(fields:"id")')
export class CartItem {
  @Field()
  id: string;

  @Field()
  cartId: string;

  @Field()
  productId: string;

  @Field(() => Product, { nullable: true })
  product?: Product | null;

  @Field()
  quantity: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

@ObjectType()
@Directive('@key(fields:"id")')
export class Cart {
  @Field()
  id: string;

  @Field()
  storeId: string;

  @Field()
  userId: string;

  @Field(() => Store, { nullable: true })
  store?: Store | null;

  @Field(() => [CartItem], { nullable: true })
  cartItems?: CartItem[] | null;

  @Field()
  cartId: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
