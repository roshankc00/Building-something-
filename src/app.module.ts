import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { UsersModule } from './users/users.module';
import { ColorsModule } from './colors/colors.module';
import { CategoriesModule } from './categories/categories.module';
import { StoresModule } from './stores/stores.module';
import { ProductModule } from './products/products.module';
import { SizesModule } from './sizes/sizes.module';
import { CartModule } from './cart/cart.module';
import { WishlistModule } from './wishlist/wishlist.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
      },
    }),
    UsersModule,
    StoresModule,
    ColorsModule,
    SizesModule,
    CategoriesModule,
    ProductModule,
    CartModule,
    WishlistModule,
  ],
  controllers: [],
  providers: [ConfigService, JwtService, PrismaService],
})
export class AppModule {}
