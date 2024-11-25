import { Organoid } from '@okomera/api';

export interface IOrganoidRepository {
  getOrganoid(id: string): Promise<Organoid | null>;
  getOrganoids(dataset: string): Promise<Array<Organoid>>;
}

export const IOrganoidRepository = Symbol('IOrganoidRepository');
