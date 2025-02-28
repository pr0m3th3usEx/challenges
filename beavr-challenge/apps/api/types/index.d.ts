declare module '@beavr/types' {
  interface Requirement {
    id: string;
    name: string;
    description: string;
  }

  interface RequirementWithRequiredDocuments extends Requirement {
    requiredDocuments: DocumentType[];
  }

  type RequirementStatus = 'NOT_COMPLIANT' | 'COMPLIANT';

  interface RequirementWithStatus extends Requirement {
    status: RequirementStatus;
  }

  interface RequirementWithStatusAndDocs extends Requirement {
    status: RequirementStatus;
    requiredDocuments: DocumentType[];
  }

  interface DocumentType {
    docType: string;
  }

  type DocumentStatus = 'IN_PROGRESS' | 'VALID' | 'REFUSED' | 'EXPIRED';

  interface Document {
    id: string;
    version: Date;
    status: DocumentStatus;
    expirationDate: Date;
  }

  interface DocumentWithDocumentType extends Document {
    docType: DocumentType;
  }

  type CreateDocumentResponse = Pick<Document, 'id'>;

  interface GetDocumentTypesResponse {
    documentTypes: DocumentType[];
  }

  interface GetDocumentsResponse {
    documents: DocumentWithDocumentType[];
  }

  interface GetRequirementsResponse {
    requirements: RequirementWithStatusAndDocs[];
  }
}
