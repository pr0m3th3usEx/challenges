import { Athlete } from '../../entities/athlete';

export type AthleteGetAllOptions = {
    page: number;
    limit: number;
}

export interface AthleteRepository {
    save(athlete: Athlete): Promise<Athlete>;
    get(id: string): Promise<Athlete | null>;
    getAll(options?: AthleteGetAllOptions): Promise<Athlete[]>;
    delete(id: string): Promise<void>;
}
