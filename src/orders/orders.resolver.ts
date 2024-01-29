import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { OrderService } from './order.service';
import { OrderDto } from './dtos/orders.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  CreateOrderResponse,
  CreateOrderWithStripeResponse,
} from './types/order.types';

@Resolver('Order')
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  @Mutation(() => CreateOrderResponse)
  @UseGuards(AuthGuard)
  async createOrder(
    @Context() context,
    orderDto: OrderDto,
  ): Promise<CreateOrderResponse | CreateOrderWithStripeResponse> {
    return await this.orderService.createOrder(context.req.user.id, orderDto);
  }
  @Mutation(() => CreateOrderResponse)
  async delivered(@Args('orderId') orderId: string) {
    return await this.orderService.delivered(orderId);
  }
}
