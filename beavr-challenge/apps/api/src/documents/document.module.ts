import { Module } from '@nestjs/common';
import { DocumentService } from './document.service';
import { DocumentController } from './document.controller';
import { IDocumentRepository } from './contracts/document.repo';
// import { InMemoryDocumentRepository } from './adapters/repositories/document-in-memory.repo';
import { PostgresDocumentRepository } from './adapters/repositories/document-postgres.repo';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [
    DocumentService,
    {
      provide: IDocumentRepository,
      useClass: PostgresDocumentRepository,
    },
  ],
  controllers: [DocumentController],
})
export class DocumentModule {}
