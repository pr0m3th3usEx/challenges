import { Module } from '@nestjs/common';
import { RequirementController } from './requirement.controller';
import { RequirementService } from './requirement.service';
import { IRequirementRepository } from './contracts/requirement.repo';
import { IDocumentRepository } from 'src/documents/contracts/document.repo';
// import { InMemoryRequirementRepository } from './adapters/repositories/requirement-in-memory.repo';
// import { InMemoryDocumentRepository } from 'src/documents/adapters/repositories/document-in-memory.repo';
import { PostgresRequirementRepository } from './adapters/repositories/requirement-postgres.repo';
import { PostgresDocumentRepository } from 'src/documents/adapters/repositories/document-postgres.repo';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [
    RequirementService,
    {
      provide: IRequirementRepository,
      useClass: PostgresRequirementRepository,
    },
    {
      provide: IDocumentRepository,
      useClass: PostgresDocumentRepository,
    },
  ],
  controllers: [RequirementController],
})
export class RequirementModule {}
