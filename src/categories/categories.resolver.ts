import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseFilters, UseGuards } from '@nestjs/common';
import { GraphQLErrorFilter } from 'src/core/intercepters/custom.excepter.filter';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { Roles } from 'src/core/decorators/role.decorator';
import { RolesConstant } from 'src/utils/constants';
import { CategoryService } from './categories.service';
import { CreateCategoryResponse } from './types/catgegories.types';
import { Category } from './entities/categories.entiry';
import { CategoryDto, UpdateCategoryDto } from './dto/categories.dtos';

@UseFilters(GraphQLErrorFilter)
@Resolver('Category')
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Mutation(() => CreateCategoryResponse)
  @UseGuards(AuthGuard)
  @Roles(RolesConstant.Seller)
  async createCategory(
    @Args('categoryDto') categoryDto: CategoryDto,
    @Context() context: any,
  ): Promise<CreateCategoryResponse> {
    return await this.categoryService.create(categoryDto);
  }

  @Query(() => [Category], {
    name: 'categoriesOfStore',
  })
  @UseGuards(AuthGuard)
  @Roles(RolesConstant.Seller)
  async findAllStore(@Args('storeId') storeId: string) {
    return await this.categoryService.findAllCategoriesOfStore(storeId);
  }

  @Query(() => Category, { name: 'category' })
  @UseGuards(AuthGuard)
  @Roles(RolesConstant.Seller)
  async findOneStore(@Args('id', { type: () => String }) id: string) {
    return await this.categoryService.findSingle(id);
  }

  @Mutation(() => CreateCategoryResponse)
  @UseGuards(AuthGuard)
  @Roles(RolesConstant.Seller)
  async deleteCategory(
    @Args('storeId') storeId: string,
    @Args('id') id: string,
  ): Promise<CreateCategoryResponse> {
    return await this.categoryService.delete(storeId, id);
  }

  @Mutation(() => CreateCategoryResponse)
  @UseGuards(AuthGuard)
  @Roles(RolesConstant.Seller)
  async updateCategory(
    @Args('id') id: string,
    @Args('updatecategoryDto') updateCategoryDto: UpdateCategoryDto,
    @Context() context: any,
  ): Promise<CreateCategoryResponse> {
    return await this.categoryService.update(id, updateCategoryDto);
  }
}
