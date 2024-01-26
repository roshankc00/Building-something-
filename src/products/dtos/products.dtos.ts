import { InputType, Field } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
  minLength,
} from 'class-validator';

@InputType()
export class StoreDto {
  @Field()
  @IsNotEmpty()
  @IsString({ message: 'Name must be string' })
  @MinLength(2, { message: 'Name must be string' })
  name: string;

  @Field()
  @IsNotEmpty()
  @IsString({ message: 'Description must be string' })
  @MinLength(10, { message: 'description must be of atleast 10 charecter' })
  description: string;

  @Field()
  @IsNotEmpty()
  @IsString({ message: 'storeId must be string' })
  storeId: string;

  @Field()
  @IsNotEmpty()
  @IsString({ message: 'categoryId must be string' })
  categoryId: string;

  @Field()
  @IsNotEmpty()
  @IsNumber({}, { message: 'price must be type number' })
  price: number;

  @Field()
  @IsNotEmpty()
  @IsNumber({}, { message: 'stock must be number' })
  stock: number;

  @Field()
  @IsOptional()
  @IsNotEmpty()
  @IsString({ message: 'sizeId must be string' })
  sizeId?: string;

  @Field()
  @IsOptional()
  @IsNotEmpty()
  @IsString({ message: 'colorId must be string' })
  colorId?: string;
}
