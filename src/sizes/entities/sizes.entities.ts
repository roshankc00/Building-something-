import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Size {
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
