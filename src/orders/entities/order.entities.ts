import { ObjectType, Field, Directive } from '@nestjs/graphql';

@ObjectType()
export class Order {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  phone: string;

  @Field()
  address: string;

  @Field()
  userId: string;

  @Field()
  isDelivered: boolean;

  @Field()
  isPaid: boolean;

  @Field()
  storeId: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
