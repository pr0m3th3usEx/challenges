import { Athlete, AthleteGetAllOptions, AthleteRepository } from "@virtuve/biz-core";

export class PrismaAthleteRepository implements AthleteRepository {
    save(athlete: Athlete): Promise<Athlete> {
        throw new Error("Method not implemented.");
    }
    get(id: string): Promise<Athlete | null> {
        throw new Error("Method not implemented.");
    }
    getAll(options?: AthleteGetAllOptions): Promise<Athlete[]> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}