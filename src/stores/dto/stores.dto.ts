import { InputType, Field } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  minLength,
} from 'class-validator';

@InputType()
export class StoreDto {
  @Field()
  @IsNotEmpty()
  @IsString({ message: 'Name must be string' })
  name: string;

  @Field()
  @IsNotEmpty()
  @IsString({ message: 'Name must be string' })
  userId: string;
}
