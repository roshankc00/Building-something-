import { Field, ObjectType } from '@nestjs/graphql';
import {} from '@prisma/client';
import { ErrorType } from 'src/users/types/users.types';
import { Size } from '../entities/sizes.entities';

@ObjectType()
export class CreateSizeResponse {
  @Field()
  message: string;

  @Field()
  success: boolean;

  @Field(() => Size)
  size: Size | any;

  @Field(() => ErrorType, { nullable: true })
  error?: ErrorType;
}
