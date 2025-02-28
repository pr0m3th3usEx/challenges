import { ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IDocumentRepository } from './contracts/document.repo';
import { CreateDocumentResponse, Document, DocumentType, DocumentWithDocumentType } from '@beavr/types';
import { CreateDocumentDto, UpdateDocumentDto } from 'src/dto';
import { v4 } from 'uuid';
import { DOC_DEFAULT_STATUS, DOC_EXPIRATION_TIME_MILLISECONDS } from 'src/constants';
import { canDocStatusBeUpdated } from './utils';

@Injectable()
export class DocumentService {
  constructor(
    @Inject(IDocumentRepository)
    private readonly documentRepository: IDocumentRepository,
  ) {}

  async create(dto: CreateDocumentDto): Promise<CreateDocumentResponse> {
    const docTypes = await this.documentRepository.getDocumentTypes();

    if (docTypes.findIndex(({ docType }) => docType === dto.docType) < 0) {
      throw new ForbiddenException();
    }

    const version = new Date();
    const expirationDate = new Date(Date.now() + DOC_EXPIRATION_TIME_MILLISECONDS);

    const newDocument: Document = {
      id: v4(),
      expirationDate,
      version,
      status: DOC_DEFAULT_STATUS,
    };

    const res = await this.documentRepository.create(newDocument, { docType: dto.docType });

    return {
      id: res.id,
    };
  }

  async delete(id: string): Promise<void> {
    return this.documentRepository.delete(id);
  }

  async update(id: string, dto: UpdateDocumentDto): Promise<void> {
    const document = await this.documentRepository.get(id);

    if (!document) {
      throw new NotFoundException();
    }

    if (!canDocStatusBeUpdated(document.status, dto.status)) {
      throw new ForbiddenException();
    }

    const expirationDate = new Date(Date.now() + DOC_EXPIRATION_TIME_MILLISECONDS);

    const updatedDocument: Document = {
      ...document,
      status: dto.status,
      expirationDate,
    };

    await this.documentRepository.update(updatedDocument);
  }

  async getAll(): Promise<DocumentWithDocumentType[]> {
    return this.documentRepository.getAll();
  }

  async getDocumentTypes(): Promise<DocumentType[]> {
    return this.documentRepository.getDocumentTypes();
  }
}
