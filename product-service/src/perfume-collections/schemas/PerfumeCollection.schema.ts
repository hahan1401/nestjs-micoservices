import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { PerfumeCollectionEnum } from 'src/enums/PerfumeCollection';

@Schema({ collection: 'perfumeCollections' })
export class PerfumeCollection {
  @Prop({ type: String, required: true, unique: true, enum: PerfumeCollectionEnum })
  name: PerfumeCollectionEnum;

  @Prop({ required: true })
  thumbnailUrl: string;
}

export type PerfumeCollectionDocument = HydratedDocument<PerfumeCollection>;
export const PerfumeCollectionSchema = SchemaFactory.createForClass(PerfumeCollection);
