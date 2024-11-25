import { Injectable } from '@nestjs/common';
import { Organoid } from '@okomera/api';
import { IOrganoidRepository } from '../contracts/organoid.repo';

@Injectable()
export class OrganoidRepositoryInMemory implements IOrganoidRepository {
  private organoids: Organoid[] = [];

  async getOrganoid(id: string): Promise<Organoid | null> {
    return this.organoids.find((o) => o.id === id);
  }

  async getOrganoids(_dataset: string): Promise<Array<Organoid>> {
    return this.organoids;
  }
}
