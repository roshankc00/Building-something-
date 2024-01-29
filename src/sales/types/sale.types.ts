import { Field, ObjectType } from '@nestjs/graphql';
import {} from '@prisma/client';
import { ErrorType } from 'src/users/types/users.types';
import { Sale } from '../entities/sale.entities';

@ObjectType()
export class SaleResponse {
  @Field()
  message: string;

  @Field()
  productId: string;

  @Field(() => Sale)
  Sale: Sale | any;

  @Field(() => ErrorType, { nullable: true })
  error?: ErrorType;
}
