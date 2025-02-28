import { RequirementWithRequiredDocuments } from '@beavr/types';

export interface IRequirementRepository {
  getRequirements(): Promise<RequirementWithRequiredDocuments[]>;
}

export const IRequirementRepository = Symbol('IRequirementRepository');
