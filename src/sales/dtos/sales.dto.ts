import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class SalesDto {
  @Field()
  @IsNotEmpty()
  @IsString({ message: 'Name must be string' })
  productId: string;

  @Field()
  @IsNotEmpty({ message: 'value must be of type string' })
  storeId: string;

  @Field()
  @IsNotEmpty({ message: 'value must be of type string' })
  quantity: number;
  @Field()
  @IsNotEmpty({ message: 'value must be of type string' })
  netPrice: number;
}
