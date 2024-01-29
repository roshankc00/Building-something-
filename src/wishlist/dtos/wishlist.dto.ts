import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class WishListDto {
  @Field()
  @IsNotEmpty()
  @IsString({ message: 'productId must be string' })
  productId: string;

  @Field()
  @IsNotEmpty()
  @IsString({ message: 'productId must be string' })
  userId: string;
}
