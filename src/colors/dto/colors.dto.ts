import { InputType, Field } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  minLength,
} from 'class-validator';

@InputType()
export class ColorsDto {
  @Field()
  @IsNotEmpty()
  @IsString({ message: 'Name must be string' })
  name: string;

  @Field()
  @IsNotEmpty({ message: 'value must be of type string' })
  value: string;

  @Field()
  @IsNotEmpty({ message: 'Email is required.' })
  @IsEmail({}, { message: 'Email is invalid.' })
  email: string;

  @Field()
  @IsNotEmpty({ message: 'StoreIdField field is required' })
  storeId: string;
}
