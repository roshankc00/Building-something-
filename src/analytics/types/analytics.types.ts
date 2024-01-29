import { Field, ObjectType } from '@nestjs/graphql';
import {} from '@prisma/client';
import { ErrorType } from 'src/users/types/users.types';
import { Analytics } from '../entities/analytics.entity';

@ObjectType()
export class CreateResponse {
  @Field(() => [Analytics])
  analytics: Analytics[] | any;
}
