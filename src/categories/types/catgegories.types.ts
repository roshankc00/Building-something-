import { Field, ObjectType } from '@nestjs/graphql';
import { Category } from '../entities/categories.entiry';
import { ErrorType } from 'src/users/types/users.types';

@ObjectType()
export class CreateCategoryResponse {
  @Field()
  message: string;

  @Field()
  success: boolean;

  @Field(() => Category)
  category: Category | any;

  @Field(() => ErrorType, { nullable: true })
  error?: ErrorType;
}
