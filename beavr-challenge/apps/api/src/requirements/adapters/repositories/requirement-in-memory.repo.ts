import { RequirementWithRequiredDocuments } from '@beavr/types';
import { Injectable } from '@nestjs/common';
import { IRequirementRepository } from 'src/requirements/contracts/requirement.repo';

@Injectable()
export class InMemoryRequirementRepository implements IRequirementRepository {
  private requirements: RequirementWithRequiredDocuments[] = [
    {
      description: 'Test',
      id: 'test',
      name: 'name',
      requiredDocuments: [
        {
          docType: 'policy-test',
        },
      ],
    },
  ];

  async getRequirements(): Promise<RequirementWithRequiredDocuments[]> {
    return this.requirements;
  }
}
