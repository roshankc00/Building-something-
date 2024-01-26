import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Category {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  storeId: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
