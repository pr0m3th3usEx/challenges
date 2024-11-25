import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type OrganoidDocument = HydratedDocument<Organoid>;

@Schema()
export class Organoid {
  @Prop({ type: String, required: true })
  originalImageKey: string;

  @Prop({ type: String, required: true })
  segmentationMaskImageKey: string;

  @Prop({ type: String, required: true, index: true })
  dataset: string;

  @Prop({ type: Number, required: true })
  maskSurface: number;
}

export const MongoOrganoidSchema = SchemaFactory.createForClass(Organoid);
