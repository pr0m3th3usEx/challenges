import { Document, DocumentType, DocumentWithDocumentType } from '@beavr/types';

export interface IDocumentRepository {
  get(id: string): Promise<Document | null>;
  create(doc: Document, docType: DocumentType): Promise<Document>;
  update(newDoc: Document): Promise<void>;
  getAll(): Promise<DocumentWithDocumentType[]>;
  getDocumentTypes(): Promise<DocumentType[]>;
  delete(id: string): Promise<void>;
}

export const IDocumentRepository = Symbol('IDocumentRepository');
