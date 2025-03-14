import { CategoryService } from 'src/category/category.service';
import { CATEGORIES_DUMMY } from 'src/category/chemas/dummyData';

export const PERFUMES_DUMMY = [
  {
    name: 'Rose Delight',
    description: 'A delightful floral fragrance.',
    price: 50,
    categoryId: '67d3fafb046cc718f08647c8',
    createdDate: new Date().toISOString(),
    modifiedDate: new Date().toISOString(),
  },
  {
    name: 'Forest Whisper',
    description: 'A deep woody scent.',
    price: 70,
    categoryId: '67d3fafb046cc718f08647c9',
    createdDate: new Date().toISOString(),
    modifiedDate: new Date().toISOString(),
  },
  {
    name: 'Citrus Burst',
    description: 'A refreshing citrus aroma.',
    price: 60,
    categoryId: '67d3fafb046cc718f08647ca',
    createdDate: new Date().toISOString(),
    modifiedDate: new Date().toISOString(),
  },
];

export const generateDummyData = async (categoryService: CategoryService) => [
  {
    name: 'Rose Delight',
    description: 'A delightful floral fragrance.',
    price: 50,
    categoryId: await categoryService
      .getByName(CATEGORIES_DUMMY[0].name)
      .then((resp) => resp.getData()._id.toString()),
  },
  {
    name: 'Forest Whisper',
    description: 'A deep woody scent.',
    price: 70,
    categoryId: await categoryService
      .getByName(CATEGORIES_DUMMY[1].name)
      .then((resp) => resp.getData()._id.toString()),
  },
  {
    name: 'Citrus Burst',
    description: 'A refreshing citrus aroma.',
    price: 60,
    categoryId: await categoryService
      .getByName(CATEGORIES_DUMMY[2].name)
      .then((resp) => resp.getData()._id.toString()),
  },
];
