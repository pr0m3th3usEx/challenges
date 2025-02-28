import { Module } from '@nestjs/common';
import { RequirementModule } from './requirements/requirement.module';
import { DocumentModule } from './documents/document.module';

@Module({
  imports: [RequirementModule, DocumentModule],
})
export class AppModule {}
