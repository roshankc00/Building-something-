import { InputType, Field } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
  ValidateIf,
  minLength,
} from 'class-validator';

@InputType()
export class ProductDto {
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

@InputType()
export class UpdateProductDto {
  @Field({ nullable: true })
  @IsOptional()
  @IsString({ message: 'Name must be a string' })
  @MinLength(2, { message: 'Name must be at least 2 characters' })
  name?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  @MinLength(10, { message: 'Description must be at least 10 characters' })
  description?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString({ message: 'CategoryId must be a string' })
  categoryId?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsNumber({}, { message: 'Price must be a number' })
  price?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsNumber({}, { message: 'Stock must be a number' })
  stock?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsNotEmpty({ message: 'SizeId must be a string' })
  sizeId?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsNotEmpty({ message: 'ColorId must be a string' })
  colorId?: string;

  // Validation to ensure at least one field is provided
  @ValidateIf((object, value) => {
    return (
      value.name !== undefined ||
      value.description !== undefined ||
      value.categoryId !== undefined ||
      value.price !== undefined ||
      value.stock !== undefined ||
      value.sizeId !== undefined ||
      value.colorId !== undefined
    );
  })
  atLeastOne: string;
}
