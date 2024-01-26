import { ObjectType, Field, Directive } from '@nestjs/graphql';
import { Category } from 'src/categories/entities/categories.entiry';
import { Color } from 'src/colors/entities/colors.entities';
import { Size } from 'src/sizes/entities/sizes.entities';
import { Store } from 'src/stores/entities/store.entiry';

@ObjectType()
@Directive('@key(fields:"id")')
export class Image {
  @Field()
  id: string;

  @Field()
  public_id: string;

  @Field()
  url: string;

  @Field()
  productId: string;
}

@ObjectType()
export class Product {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  price: number;

  @Field()
  stock: number;

  @Field()
  storeId: string;

  @Field(() => Store, { nullable: true })
  store: Store | null;

  @Field(() => [Image], { nullable: true })
  images?: Image[] | null;

  @Field()
  colorId?: string;

  @Field(() => Color, { nullable: true })
  color?: Color | null;

  @Field()
  sizeId?: string;

  @Field(() => Size, { nullable: true })
  size?: Size | null;

  @Field()
  categoryId: string;

  @Field(() => Category, { nullable: false })
  category: Category;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
