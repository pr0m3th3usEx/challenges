import { Inject, Injectable } from '@nestjs/common';
import { IRequirementRepository } from './contracts/requirement.repo';
import { Document, DocumentStatus, RequirementWithStatusAndDocs } from '@beavr/types';
import { IDocumentRepository } from 'src/documents/contracts/document.repo';

@Injectable()
export class RequirementService {
  constructor(
    @Inject(IRequirementRepository)
    private readonly requirementRepository: IRequirementRepository,
    @Inject(IDocumentRepository)
    private readonly documentRepository: IDocumentRepository,
  ) {}

  async getAll(): Promise<RequirementWithStatusAndDocs[]> {
    const requirements = await this.requirementRepository.getRequirements();
    const documents = await this.documentRepository.getAll();

    const requirementWithStatus: RequirementWithStatusAndDocs[] = requirements.map((requirement) => {
      const requiredDocs = requirement.requiredDocuments;

      // Group documents by docType
      const groupedDocs = requiredDocs.reduce<Record<string, Document[]>>((acc, docType) => {
        if (!(docType.docType in acc)) {
          acc[docType.docType] = [];
        }

        acc[docType.docType] = [
          ...new Set([
            ...acc[docType.docType],
            ...documents
              .filter(
                (doc) => doc.docType.docType === docType.docType && doc.status !== 'EXPIRED', // We do not need expired documents
              )
              // maybe sort to get the latest version of doc
              .map<Document>((doc) => ({
                expirationDate: doc.expirationDate,
                id: doc.id,
                status: doc.status,
                version: doc.version,
              })),
          ]),
        ];

        return acc;
      }, {});

      // Validate required document status (At least one version of the documents needs to be valid)
      const requiredDocumentsStatus = Object.entries(groupedDocs).reduce<Record<string, DocumentStatus>>(
        (acc, [docType, docs]) => {
          if (!(docType in acc)) {
            acc[docType] = 'IN_PROGRESS';
          }

          if (docs.some((doc) => doc.status === 'VALID')) {
            acc[docType] = 'VALID';
          }

          return acc;
        },
        {},
      );

      // Compute requirement status
      return {
        ...requirement,
        status: Object.values(requiredDocumentsStatus).every((status) => status === 'VALID')
          ? 'COMPLIANT'
          : 'NOT_COMPLIANT',
      };
    });

    return requirementWithStatus;
  }
}
