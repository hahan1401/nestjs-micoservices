import { BrandService } from 'src/brand/brand.service';
import { BRANDS_DUMMY } from 'src/brand/chemas/dummyData';
import { CategoryService } from 'src/category/category.service';
import { CATEGORIES_DUMMY } from 'src/category/chemas/dummyData';
import { PerfumeCollectionEnum } from 'src/enums/PerfumeCollection';
import { PerfumeCollectionsService } from 'src/perfume-collections/perfume-collections.service';

export const generateDummyData = async (
  categoryService: CategoryService,
  brandService: BrandService,
  perfumeCollectionService: PerfumeCollectionsService,
) => [
  {
    name: 'Rose Delight',
    description: 'A delightful floral fragrance.',
    price: 50,
    categoryIds: await Promise.all([
      categoryService.getByName(CATEGORIES_DUMMY[0].name).then((resp) => resp._id),
      categoryService.getByName(CATEGORIES_DUMMY[1].name).then((resp) => resp._id),
    ]),
    brandId: await brandService.getByName(BRANDS_DUMMY[0].name).then((resp) => resp._id),
    collectionId: await perfumeCollectionService
      .getByName(PerfumeCollectionEnum.Female.toString())
      .then((resp) => resp._id),
  },
  {
    name: 'Forest Whisper',
    description: 'A deep woody scent.',
    price: 70,
    categoryIds: await Promise.all([
      categoryService.getByName(CATEGORIES_DUMMY[1].name).then((resp) => resp._id),
      categoryService.getByName(CATEGORIES_DUMMY[2].name).then((resp) => resp._id),
    ]),
    brandId: await brandService.getByName(BRANDS_DUMMY[1].name).then((resp) => resp._id),
    collectionId: await perfumeCollectionService
      .getByName(PerfumeCollectionEnum.Male.toString())
      .then((resp) => resp._id),
  },
  {
    name: 'Citrus Burst',
    description: 'A refreshing citrus aroma.',
    price: 60,
    categoryIds: await Promise.all([
      categoryService.getByName(CATEGORIES_DUMMY[0].name).then((resp) => resp._id),
      categoryService.getByName(CATEGORIES_DUMMY[2].name).then((resp) => resp._id),
    ]),
    brandId: await brandService.getByName(BRANDS_DUMMY[2].name).then((resp) => resp._id),
    collectionId: await perfumeCollectionService
      .getByName(PerfumeCollectionEnum.Unisex.toString())
      .then((resp) => resp._id),
  },
];
