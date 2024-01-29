import { ObjectType, Field, Directive } from '@nestjs/graphql';

@ObjectType()
export class Analytics {
  @Field()
  month: string;

  @Field()
  count: number;
}

@ObjectType()
export class SalesAnalytics {
  @Field()
  month: string;

  @Field()
  income: number;
}
