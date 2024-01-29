import { Field, ObjectType } from '@nestjs/graphql';
import {} from '@prisma/client';
import { Product } from 'src/products/entities/products.entiry';
import { Order } from '../entities/order.entities';
import { ErrorType } from 'src/users/types/users.types';

@ObjectType()
export class CreateOrderResponse {
  @Field()
  message: string;

  @Field()
  success: boolean;

  @Field(() => Order)
  order: Order | any;

  @Field(() => ErrorType, { nullable: true })
  error?: ErrorType;
}

@ObjectType()
export class CreateOrderWithStripeResponse {
  @Field()
  success: boolean;

  @Field()
  message: string;

  @Field()
  data: string;
  @Field(() => ErrorType, { nullable: true })
  error?: ErrorType;
}
