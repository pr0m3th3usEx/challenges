import { DocumentStatus } from '@beavr/types';

const statusLevel: Record<DocumentStatus, number> = {
  IN_PROGRESS: 0,
  VALID: 1,
  REFUSED: 1,
  EXPIRED: 2,
};

export const canDocStatusBeUpdated = (oldStatus: DocumentStatus, newStatus: DocumentStatus): boolean => {
  return statusLevel[oldStatus] < statusLevel[newStatus];
};
