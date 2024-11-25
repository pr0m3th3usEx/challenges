import { Module } from '@nestjs/common';
import { OrganoidModule } from './organoid/organoid.module';
import { MongooseModule } from '@nestjs/mongoose';
import { DATABASE_URL } from './config';

@Module({
  imports: [MongooseModule.forRoot(DATABASE_URL), OrganoidModule],
})
export class AppModule {}
