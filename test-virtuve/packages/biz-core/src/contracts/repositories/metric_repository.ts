import { MetricType } from '../../value_objects/metric_type.js';
import { Metric } from '../../entities/metric.js';

export type MetricGetAllOptions = {
  page: number;
  limit: number;
  metricType?: MetricType;
  start?: Date;
  end?: Date;
};

export interface MetricRepository {
  save(metric: Metric): Promise<Metric>;
  get(id: string): Promise<Metric | null>;
  getAll(options?: MetricGetAllOptions): Promise<Metric[]>;
  getAthleteMetrics(athleteId: string, options?: MetricGetAllOptions): Promise<Metric[]>;
}
