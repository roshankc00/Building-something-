import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class SizesDto {
  @Field()
  @IsNotEmpty()
  @IsString({ message: 'Name must be string' })
  name: string;

  @Field()
  @IsNotEmpty()
  @IsString({ message: 'Name must be string' })
  value: string;

  @Field()
  @IsNotEmpty()
  @IsString({ message: 'Name must be string' })
  userId: string;
}
