import { ObjectType, Field, Directive } from '@nestjs/graphql';

@ObjectType()
export class Analytics {
  @Field()
  month: string;

  @Field()
  count: number;
}
