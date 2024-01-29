import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { ProductService } from './products.service';
import { CreateProductResponse } from './types/products.types';
import { ProductDto, UpdateProductDto } from './dtos/products.dtos';
import { Product } from './entities/products.entiry';
import { ProductSortInput } from './dtos/getProduct.dto';

@Resolver('Product')
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Mutation(() => CreateProductResponse)
  async createProduct(@Args('productDto') productDto: ProductDto) {
    return await this.productService.create(productDto);
  }

  @Mutation(() => CreateProductResponse)
  async updateProduct(
    @Args('id') id: string,
    @Args('updateProductDto') updateProductDto: UpdateProductDto,
  ) {
    return await this.productService.updateProduct(id, updateProductDto);
  }

  @Query(() => Product, { name: 'product' })
  async getSingleProduct(@Args('id') id: string) {
    return await this.productService.getSingleProduct(id);
  }

  @Query(() => [Product], { name: 'Products' })
  async getAllProducts(
    @Args({ name: 'sort', type: () => ProductSortInput, nullable: true })
    sort?: ProductSortInput,
  ) {
    return this.productService.getAllProducts(sort);
  }
}
