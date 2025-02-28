import { DocumentType, RequirementWithRequiredDocuments } from '@beavr/types';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { IRequirementRepository } from 'src/requirements/contracts/requirement.repo';

@Injectable()
export class PostgresRequirementRepository implements IRequirementRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getRequirements(): Promise<RequirementWithRequiredDocuments[]> {
    const result = await this.prismaService.requirement.findMany({
      include: {
        requiredDocuments: true,
      },
    });

    return result.map<RequirementWithRequiredDocuments>((requirement) => ({
      id: requirement.id,
      name: requirement.name,
      description: requirement.description,
      requiredDocuments: requirement.requiredDocuments.map<DocumentType>(
        (requiredDoc) => ({
          docType: requiredDoc.docTypeName,
        }),
      ),
    }));
  }
}
