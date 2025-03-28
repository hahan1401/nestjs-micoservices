import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PerfumeCollectionEnum } from 'src/enums/PerfumeCollection';
import { PerfumeCollection, PerfumeCollectionDocument } from './schemas/PerfumeCollection.schema';

const THUMBNAIL = [
  'https://lanperfume.com/wp-content/uploads/2025/03/nu-va-unisex.jpeg',
  'https://lanperfume.com/wp-content/uploads/2025/03/nam-va-unisex.jpeg',
  'https://lanperfume.com/wp-content/uploads/2025/03/nam.jpeg',
];

@Injectable()
export class PerfumeCollectionsService implements OnModuleInit {
  @InjectModel(PerfumeCollection.name) private readonly perfumeCollectionModel: Model<PerfumeCollection>;

  async onModuleInit() {
    const isExisted = (await this.perfumeCollectionModel.countDocuments()) > 0;
    if (!isExisted) {
      const docs = Object.values(PerfumeCollectionEnum).map((item, index) => ({
        name: item,
        thumbnailUrl: THUMBNAIL[index],
      }));
      await this.perfumeCollectionModel.insertMany(docs);
      console.info('Perfume collections initialized');
    }
  }

  async getAll(): Promise<PerfumeCollectionDocument[]> {
    return this.perfumeCollectionModel.find().exec();
  }

  async getByName(name: string): Promise<PerfumeCollectionDocument> {
    return this.perfumeCollectionModel.findOne({ name: name }).exec();
  }
}
