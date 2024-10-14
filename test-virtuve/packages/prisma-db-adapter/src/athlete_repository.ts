import { Prisma, PrismaClient } from '../build/generated/client';
import { Athlete, AthleteGetAllOptions, AthleteRepository } from '@virtuve/biz-core';

export class PrismaAthleteRepository implements AthleteRepository {
  constructor(private readonly client: PrismaClient) {}

  async save(updatedAthlete: Athlete): Promise<Athlete> {
    const data = await this.client.athlete.upsert({
      where: {
        id: updatedAthlete.id,
      },
      update: {
        ...updatedAthlete,
      },
      create: {
        ...updatedAthlete,
      },
    });

    const athlete: Athlete = {
      id: data.id,
      name: data.name,
      age: data.age,
      team: data.team,
    };

    return athlete;
  }

  async get(id: string): Promise<Athlete | null> {
    const data = await this.client.athlete.findUnique({
      where: {
        id,
      },
    });

    if (!data) return null;

    const athlete: Athlete = {
      id: data.id,
      name: data.name,
      age: data.age,
      team: data.team,
    };

    return athlete;
  }

  async getAll(options?: AthleteGetAllOptions): Promise<Athlete[]> {
    const prismaOptions: Prisma.AthleteFindManyArgs = {
      skip: options ? (options.page - 1) * options.limit : 0,
      take: options?.limit ?? 100,
    };

    const data = await this.client.athlete.findMany({
      ...prismaOptions,
    });

    const athletes = data.map<Athlete>((d) => ({
      id: d.id,
      name: d.name,
      age: d.age,
      team: d.team,
    }));

    return athletes;
  }

  async delete(id: string): Promise<void> {
    await this.client.athlete.delete({
      where: { id },
    });
  }
}
