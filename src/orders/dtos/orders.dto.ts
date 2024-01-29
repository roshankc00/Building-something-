import { InputType, Field } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  minLength,
} from 'class-validator';

export enum PaymentMethod {
  CASHONDELIVERY = 'CASHONDELIVERY',
  STRIPE = 'STRIPE',
}

@InputType()
export class OrderDto {
  @Field()
  @IsNotEmpty()
  @IsString({ message: 'Name must be string' })
  phone: string;

  @Field()
  @IsNotEmpty()
  @IsString({ message: 'Name must be string' })
  area: string;

  @Field()
  @IsNotEmpty()
  @IsString({ message: 'Name must be string' })
  houseNo: string;

  @Field()
  @IsNotEmpty()
  @IsString({ message: 'Name must be string' })
  city: string;

  @Field(() => PaymentMethod, { nullable: true })
  paymentMethod: PaymentMethod;
}
