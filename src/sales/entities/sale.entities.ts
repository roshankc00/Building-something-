import { ObjectType, Field, Directive } from '@nestjs/graphql';
import { Product } from 'src/products/entities/products.entiry';

@ObjectType()
@Directive('@key(fields:"id")')
export class Sale {
  @Field()
  id: string;

  @Field()
  productId: string;

  @Field()
  storeId: string;

  @Field()
  quantity: number;

  @Field()
  netPrice: number;

  @Field(() => Product, { nullable: true })
  product?: Product | null;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
