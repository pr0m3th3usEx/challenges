import { Injectable } from '@nestjs/common';
import { Organoid } from '@okomera/api';
import { IOrganoidRepository } from '../contracts/organoid.repo';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Organoid as MongoOrganoid } from './mongo/schema';

@Injectable()
export class MongoOrganoidRepository implements IOrganoidRepository {
  constructor(@InjectModel(MongoOrganoid.name) private organoidModel: Model<MongoOrganoid>) {}

  async getOrganoid(id: string): Promise<Organoid | null> {
    const result = await this.organoidModel.findOne({ _id: id }).exec();

    return result
      ? {
          id: result.id.toString(),
          maskSurface: result.maskSurface,
          originalImageKey: result.originalImageKey,
          segmentationMaskKey: result.segmentationMaskImageKey,
        }
      : null;
  }

  async getOrganoids(dataset: string): Promise<Array<Organoid>> {
    const result = await this.organoidModel.find({ dataset }).exec();

    return result.map((dbOrganoid) => ({
      id: dbOrganoid.id.toString(),
      maskSurface: dbOrganoid.maskSurface,
      originalImageKey: dbOrganoid.originalImageKey,
      segmentationMaskKey: dbOrganoid.segmentationMaskImageKey,
    }));
  }
}
