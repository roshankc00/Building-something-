import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Color {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  value: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
