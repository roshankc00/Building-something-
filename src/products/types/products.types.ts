import { Field, ObjectType } from '@nestjs/graphql';
import {} from '@prisma/client';
import { ErrorType } from 'src/users/types/users.types';
import { Product } from '../entities/products.entiry';

@ObjectType()
export class CreateProductResponse {
  @Field()
  message: string;

  @Field()
  success: boolean;

  @Field(() => Product)
  product: Product | any;

  @Field(() => ErrorType, { nullable: true })
  error?: ErrorType;
}
