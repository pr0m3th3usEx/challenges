import Athlete from '../../entities/athlete';

type AthleteGetAllOptions = {
    page: number;
    limit: number;
}

interface AthleteRepository {
    save(athlete: Athlete): Promise<Athlete>;
    get(id: string): Promise<Athlete | null>;
    getAll(options?: AthleteGetAllOptions): Promise<Athlete[]>;
    delete(id: string): Promise<void>;
}

export default AthleteRepository;