/* eslint-disable @typescript-eslint/no-empty-object-type */
declare module '@beavr/api' {
  // Documents
  type DocumentStatus = 'IN_PROGRESS' | 'VALID' | 'REFUSED' | 'EXPIRED';

  interface Document {
    id: string;
    version: string;
    expirationDate: string;
    status: DocumentStatus;
  }

  interface DocumentType {
    docType: string;
  }

  interface GetDocumentParams {
    id: string;
  }

  interface GetDocumentTypesRequest {}
  interface GetDocumentTypesResponse {
    documentTypes: DocumentType[];
  }

  interface GetDcoumentsRequest {}
  interface GetDocumentsResponse {
    documents: (Document & { docType: DocumentType })[];
  }

  interface CreateDocumentRequest {
    docType: string;
  }

  interface CreateDocumentResponse extends Pick<Document, 'id'> {}

  interface UpdateDocumentRequest extends GetDocumentParams {
    status: DocumentStatus;
  }
  interface UpdateDocumentResponse {}

  interface DeleteDocumentRequest extends GetDocumentParams {}
  interface DeleteDocumentResponse {}

  // Requirements
  type RequirementStatus = 'NO_COMPLIANT' | 'COMPLIANT';

  interface Requirement {
    id: string;
    name: string;
    description: string;
    requiredDocuments: DocumentType[];
    status: RequirementStatus;
  }

  interface GetRequirementsRequest {}

  interface GetRequirementsResponse {
    requirements: Requirement[];
  }
}
