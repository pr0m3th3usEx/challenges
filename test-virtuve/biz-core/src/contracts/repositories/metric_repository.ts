import Metric from '../../entities/metric';

export type MetricGetAllOptions = {
    page: number;
    limit: number;
};

interface MetricRepository {
    save(metric: Metric): Promise<Metric>;
    get(id: string): Promise<Metric | null>;
    getAll(options?: MetricGetAllOptions): Promise<Metric[]>;
    getAthleteMetrics(options?: MetricGetAllOptions): Promise<Metric[]>;
}

export default MetricRepository;