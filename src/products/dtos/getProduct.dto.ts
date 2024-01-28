import { InputType, Field, registerEnumType } from '@nestjs/graphql';

export enum ProductSortEnum {
  NAME_ASC = 'NAME_ASC',
  NAME_DESC = 'NAME_DESC',
  PRICE_ASC = 'PRICE_ASC',
  PRICE_DESC = 'PRICE_DESC',
}

registerEnumType(ProductSortEnum, {
  name: 'ProductSortEnum',
});

@InputType()
export class ProductSortInput {
  @Field(() => ProductSortEnum, { nullable: true })
  sort?: ProductSortEnum;

  @Field({ nullable: true })
  category?: string;

  @Field({ nullable: true })
  color?: string;

  @Field({ nullable: true })
  size?: string;

  @Field({ nullable: true })
  searchText?: string;
}
