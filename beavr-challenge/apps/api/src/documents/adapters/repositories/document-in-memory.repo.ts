import { Document, DocumentType, DocumentWithDocumentType } from '@beavr/types';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { IDocumentRepository } from 'src/documents/contracts/document.repo';

@Injectable()
export class InMemoryDocumentRepository implements IDocumentRepository {
  private documentTypes: DocumentType[] = [];
  private documents: DocumentWithDocumentType[] = [
    {
      docType: {
        docType: 'policy-test',
      },
      expirationDate: new Date(),
      status: 'VALID',
      id: 'blabla',
      version: new Date(),
    },
  ];

  async create(doc: Document, docType: DocumentType): Promise<Document> {
    // Unique constraint not present
    this.documents.push({
      ...doc,
      docType,
    });

    return doc;
  }

  async get(id: string): Promise<Document | null> {
    return this.documents.find((doc) => doc.id === id);
  }

  async update(newDoc: Document): Promise<void> {
    const index = this.documents.findIndex((doc) => doc.id === newDoc.id);

    if (index < 0) {
      throw new InternalServerErrorException();
    }

    this.documents[index].expirationDate = newDoc.expirationDate;
    this.documents[index].version = newDoc.version;
    this.documents[index].status = newDoc.status;
  }

  async getAll(): Promise<DocumentWithDocumentType[]> {
    return this.documents;
  }

  async getDocumentTypes(): Promise<DocumentType[]> {
    return this.documentTypes;
  }

  async delete(id: string): Promise<void> {
    this.documents.filter((doc) => doc.id !== id);
  }
}
