import { Field, ObjectType } from '@nestjs/graphql';
import {} from '@prisma/client';
import { ErrorType } from 'src/users/types/users.types';
import { Cart, CartItem } from '../entities/cart.entities';

@ObjectType()
export class AddToCartResponse {
  @Field()
  message: string;

  @Field()
  success: boolean;

  @Field(() => Cart)
  cart: Cart | any;

  @Field(() => ErrorType, { nullable: true })
  error?: ErrorType;
}

@ObjectType()
export class AddToCartItemResponse {
  @Field()
  message: string;

  @Field()
  success: boolean;

  @Field(() => CartItem)
  cartItem: CartItem | any;

  @Field(() => ErrorType, { nullable: true })
  error?: ErrorType;
}
