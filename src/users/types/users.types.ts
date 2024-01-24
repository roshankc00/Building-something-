import { ObjectType, Field } from '@nestjs/graphql';
import { User } from '../entities/users.entity';

@ObjectType()
export class ErrorType {
  @Field()
  message: string;

  @Field({ nullable: true })
  code?: string;
}

@ObjectType()
export class RegisterResponse {
  @Field()
  message: string;
  @Field()
  success: boolean;

  @Field(() => User)
  user: User | any;

  @Field(() => ErrorType, { nullable: true })
  error?: ErrorType;
}

@ObjectType()
export class LoginResponse {
  @Field(() => User, { nullable: true })
  user?: User | any;

  @Field({ nullable: true })
  accessToken?: string;

  @Field({ nullable: true })
  message?: string;

  @Field()
  success: boolean;

  @Field(() => ErrorType, { nullable: true })
  error?: ErrorType;
}
