import { InputType, Field } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  minLength,
} from 'class-validator';

@InputType()
export class RegisterDto {
  @Field()
  @IsNotEmpty()
  @IsString({ message: 'Name must be string' })
  name: string;

  @Field()
  @IsNotEmpty({ message: 'Password must be of type string' })
  @MinLength(6, { message: 'Password must be at least 6 characters.' })
  password: string;

  @Field()
  @IsNotEmpty({ message: 'Email is required.' })
  @IsEmail({}, { message: 'Email is invalid.' })
  email: string;

  @Field()
  @IsNotEmpty({ message: 'Phone Number field is required' })
  phoneNumber: string;
}

@InputType()
export class LoginDto {
  @Field()
  @IsNotEmpty({ message: 'Email is required.' })
  @IsEmail({}, { message: 'Email must be valid.' })
  email: string;

  @Field()
  @IsNotEmpty({ message: 'Password is required.' })
  @MinLength(6, { message: 'Password must be at least 6 characters.' })
  password: string;
}
