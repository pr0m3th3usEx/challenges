import { Controller, Get } from '@nestjs/common';
import { RequirementService } from './requirement.service';
import { GetRequirementsResponse } from '@beavr/types';

@Controller('requirements')
export class RequirementController {
  constructor(private readonly requirementService: RequirementService) {}

  @Get()
  async getAll(): Promise<GetRequirementsResponse> {
    return {
      requirements: await this.requirementService.getAll(),
    };
  }
}
