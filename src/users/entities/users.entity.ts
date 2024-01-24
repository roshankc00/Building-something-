import { ObjectType, Field, Directive } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  phoneNumber: string;

  @Field()
  password: string;

  @Field()
  role: String;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
