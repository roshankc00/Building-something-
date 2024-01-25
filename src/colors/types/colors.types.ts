import { Field, ObjectType } from '@nestjs/graphql';
import {} from '@prisma/client';
import { ErrorType } from 'src/users/types/users.types';
import { Color } from '../entities/colors.entities';

@ObjectType()
export class CreateColorResponse {
  @Field()
  message: string;

  @Field()
  success: boolean;

  @Field(() => Color)
  color: Color | any;

  @Field(() => ErrorType, { nullable: true })
  error?: ErrorType;
}
