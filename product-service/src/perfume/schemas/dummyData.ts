import { BrandService } from 'src/brand/brand.service';
import { BRANDS_DUMMY } from 'src/brand/chemas/dummyData';
import { CategoryService } from 'src/category/category.service';
import { CATEGORIES_DUMMY } from 'src/category/chemas/dummyData';

export const generateDummyData = async (
  categoryService: CategoryService,
  brandService: BrandService,
) => [
  {
    name: 'Rose Delight',
    description: 'A delightful floral fragrance.',
    price: 50,
    categoryId: await categoryService
      .getByName(CATEGORIES_DUMMY[0].name)
      .then((resp) => resp.getData()._id),
    brandId: await brandService
      .getByName(BRANDS_DUMMY[0].name)
      .then((resp) => resp.getData()._id),
  },
  {
    name: 'Forest Whisper',
    description: 'A deep woody scent.',
    price: 70,
    categoryId: await categoryService
      .getByName(CATEGORIES_DUMMY[1].name)
      .then((resp) => resp.getData()._id),
    brandId: await brandService
      .getByName(BRANDS_DUMMY[1].name)
      .then((resp) => resp.getData()._id),
  },
  {
    name: 'Citrus Burst',
    description: 'A refreshing citrus aroma.',
    price: 60,
    categoryId: await categoryService
      .getByName(CATEGORIES_DUMMY[2].name)
      .then((resp) => resp.getData()._id),
    brandId: await brandService
      .getByName(BRANDS_DUMMY[2].name)
      .then((resp) => resp.getData()._id),
  },
];
