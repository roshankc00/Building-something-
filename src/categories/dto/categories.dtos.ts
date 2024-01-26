import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CategoryDto {
  @Field()
  @IsNotEmpty()
  @IsString({ message: 'Name must be string' })
  name: string;

  @Field()
  @IsNotEmpty({ message: 'value must be of type string' })
  description: string;

  @Field()
  @IsNotEmpty({ message: 'StoreIdField field is required' })
  storeId: string;
}

@InputType()
export class UpdateCategoryDto {
  @Field()
  @IsNotEmpty()
  @IsString({ message: 'Name must be string' })
  name: string;

  @Field()
  @IsNotEmpty({ message: 'value must be of type string' })
  description: string;
}
