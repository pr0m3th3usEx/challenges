import { Module } from '@nestjs/common';
import { OrganoidController } from './organoid.controller';
import { OrganoidService } from './organoid.service';
import { IOrganoidRepository } from './contracts/organoid.repo';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoOrganoidSchema, Organoid } from './adapters/mongo/schema';
import { MongoOrganoidRepository } from './adapters/organoid-mongo.repo';

@Module({
  imports: [MongooseModule.forFeature([{ name: Organoid.name, schema: MongoOrganoidSchema }])],
  controllers: [OrganoidController],
  providers: [
    OrganoidService,
    {
      provide: IOrganoidRepository,
      useClass: MongoOrganoidRepository,
    },
  ],
})
export class OrganoidModule {}
