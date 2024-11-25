import { Controller, Get, Param, Query } from '@nestjs/common';
import { GetOrganoidResponse, GetOrganoidsResponse } from '@okomera/api';
import { GetOrganoidRequestParamsDto, GetOrganoidsRequestQueryDto } from 'src/dto/app.dto';
import { OrganoidService } from './organoid.service';

@Controller('organoids')
export class OrganoidController {
  constructor(private readonly organoidService: OrganoidService) {}

  @Get('')
  async getOrganoids(@Query() { dataset }: GetOrganoidsRequestQueryDto): Promise<GetOrganoidsResponse> {
    return this.organoidService.getOrganoids(dataset);
  }

  @Get(':id')
  async getOrganoid(@Param() { id }: GetOrganoidRequestParamsDto): Promise<GetOrganoidResponse> {
    return this.organoidService.getOrganoid(id);
  }
}
