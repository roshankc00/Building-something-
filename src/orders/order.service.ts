import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'prisma/prisma.service';
import { OrderDto, PaymentMethod } from './dtos/orders.dto';
import {
  CreateOrderResponse,
  CreateOrderWithStripeResponse,
} from './types/order.types';
import Stripe from 'stripe';
import { CartItem, Product } from '@prisma/client';
@Injectable()
export class OrderService {
  stripe: Stripe;
  constructor(
    private readonly prismaDb: PrismaService,
    private readonly configService: ConfigService,
  ) {
    this.stripe = new Stripe(this.configService.get('STRIPE_API_KEY'), {
      apiVersion: '2023-10-16',
      typescript: true,
    });
  }
  async createOrder(
    userId: string,
    createOrderDto: OrderDto,
  ): Promise<CreateOrderResponse | CreateOrderWithStripeResponse> {
    const { phone, area, city, houseNo, paymentMethod } = createOrderDto;
    const user = await this.prismaDb.user.findUnique({
      where: {
        id: userId,
      },
    });
    console.log(user);

    if (paymentMethod === PaymentMethod.CASHONDELIVERY) {
      const order = await this.prismaDb.order.create({
        data: {
          userId,
          paymentMethod,
          city,
          area,
          houseNo,
          phone,
        },
      });
      return { message: 'order created successfully', success: true, order };
    }
    if (paymentMethod === PaymentMethod.STRIPE) {
      const { cartItems } = await this.prismaDb.cart.findFirst({
        where: {
          userId,
        },
        include: {
          cartItems: {
            include: {
              product: true,
            },
          },
        },
      });

      const products = cartItems?.map((item) => ({
        quantity: item.quantity,
        pro: item.product,
      }));
      const line_items = products.map((item) => {
        return {
          price_data: {
            currency: 'usd',
            product_data: {
              name: item.pro.name,
              metadata: {
                id: item.pro.id,
              },
            },
            unit_amount: item.pro.price * 100,
          },
          quantity: item?.quantity,
        };
      });

      let stripeCustomer = await this.prismaDb.stripeCustomer.findUnique({
        where: {
          userId: user.id,
        },
        select: {
          stripeCustomerId: true,
        },
      });

      if (!stripeCustomer) {
        const customer = await this.stripe.customers.create({
          email: user.email,
        });
        stripeCustomer = await this.prismaDb.stripeCustomer.create({
          data: {
            userId: user.id,
            stripeCustomerId: customer.id,
          },
        });
      }
      const session = await this.stripe.checkout.sessions.create({
        customer: stripeCustomer.stripeCustomerId,
        line_items,
        mode: 'payment',
        success_url: `${this.configService.get('CLIENTURL')}/successpage/?success=1`,
        cancel_url: `${this.configService.get('CLIENTURL')}/cancelpage/?canceled=1`,
        metadata: {
          userId: user.id,
        },
      });
      if (session) {
        return {
          success: true,
          message: 'Order Created successfully',
          data: session.url,
        };
      }
    }
  }

  async delivered(orderId: string) {
    const order = await this.prismaDb.order.update({
      where: {
        id: orderId,
      },
      data: {
        paymentStatus: true,
        isDelivered: true,
      },
    });

    const { cartItems } = await this.prismaDb.cart.findFirst({
      where: {
        userId: order.userId,
      },
      include: {
        cartItems: {
          include: {
            product: true,
          },
        },
      },
    });

    const products = cartItems?.map((item) => ({
      quantity: item.quantity,
      pro: item.product,
    }));
    this.updateSale(products);

    return { success: true, message: 'Order status updated false', order };
  }

  async updateSale(products: { quantity: number; pro: Product }[]) {
    products.map(async (item: { quantity: number; pro: Product }) => {
      await this.prismaDb.sale.create({
        data: {
          quantity: item.quantity,
          productId: item.pro.id,
          storeId: item.pro.storeId,
        },
      });
    });
  }
}
