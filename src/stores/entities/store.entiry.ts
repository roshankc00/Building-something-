import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Store {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  userId: string;

  @Field()
  isActive: boolean;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
