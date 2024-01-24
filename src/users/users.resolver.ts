import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { LoginResponse, RegisterResponse } from './types/users.types';
import { RegisterDto } from './dto/users.dto';
import { User } from './entities/users.entity';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UsersService) {}

  @Mutation(() => RegisterResponse)
  async register(
    @Args('registerDto') registerDto: RegisterDto,
    @Context() context: { res: Response },
  ): Promise<RegisterResponse> {
    const { message, success, user } = await this.userService.register(
      registerDto,
      context.res,
    );
    return { message, success, user };
  }

  @Mutation(() => LoginResponse)
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
    @Context('res') res: Response,
  ): Promise<LoginResponse> {
    const { accessToken, message, success } = await this.userService.login(
      { email, password },
      res,
    );
    return { accessToken, success, message };
  }

  @Query(() => User, { name: 'user' })
  async findOne(@Args('id', { type: () => String }) id: string) {
    return await this.userService.getSingleUser(id);
  }
  @Query(() => [User], {
    name: 'users',
  })
  async findAll() {
    return await this.userService.getAllUser();
  }
}
