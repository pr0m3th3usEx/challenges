import { DocumentStatus } from '@beavr/types';
import { IsIn, IsString, IsUUID } from 'class-validator';

export class CreateDocumentDto {
  @IsString()
  docType: string;
}

export class UpdateDocumentDto {
  @IsIn(['IN_PROGRESS', 'VALID', 'REFUSED'])
  status: DocumentStatus;
}

export class GetDocumentParams {
  @IsUUID()
  id: string;
}
