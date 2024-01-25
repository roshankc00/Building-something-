import { Field, ObjectType } from '@nestjs/graphql';
import {} from '@prisma/client';
import { Store } from '../entities/store.entiry';
import { ErrorType } from 'src/users/types/users.types';

@ObjectType()
export class CreateStoreResponse {
  @Field()
  message: string;

  @Field()
  success: boolean;

  @Field(() => Store)
  store: Store | any;

  @Field(() => ErrorType, { nullable: true })
  error?: ErrorType;
}


