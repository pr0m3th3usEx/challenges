import { Document, DocumentType, DocumentWithDocumentType } from '@beavr/types';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { IDocumentRepository } from 'src/documents/contracts/document.repo';

@Injectable()
export class PostgresDocumentRepository implements IDocumentRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async get(id: string): Promise<Document | null> {
    const result = await this.prismaService.document.findUnique({
      where: { id },
    });

    if (!result) return null;

    return {
      id: result.id,
      expirationDate: result.expirationDate,
      status: result.status,
      version: result.version,
    };
  }

  async create(doc: Document, docType: DocumentType): Promise<Document> {
    const result = await this.prismaService.document.create({
      data: {
        id: doc.id,
        expirationDate: doc.expirationDate,
        status: doc.status,
        version: doc.version,
        docType: {
          connect: docType,
        },
      },
    });

    return {
      id: result.id,
      expirationDate: result.expirationDate,
      status: result.status,
      version: result.version,
    };
  }

  async update(newDoc: Document): Promise<void> {
    await this.prismaService.document.update({
      where: {
        id: newDoc.id,
      },
      data: {
        id: newDoc.id,
        expirationDate: newDoc.expirationDate,
        status: newDoc.status,
        version: newDoc.version,
      },
    });
  }

  async getAll(): Promise<DocumentWithDocumentType[]> {
    const data = await this.prismaService.document.findMany({
      include: {
        docType: true,
      },
    });

    return data.map<DocumentWithDocumentType>((doc) => ({
      id: doc.id,
      expirationDate: doc.expirationDate,
      status: doc.status,
      version: doc.version,
      docType: {
        docType: doc.docTypeName,
      },
    }));
  }

  async getDocumentTypes(): Promise<DocumentType[]> {
    const result = await this.prismaService.documentType.findMany();

    return result.map<DocumentType>(({ docType }) => ({
      docType,
    }));
  }

  async delete(id: string): Promise<void> {
    await this.prismaService.document.delete({
      where: {
        id,
      },
    });
  }
}
