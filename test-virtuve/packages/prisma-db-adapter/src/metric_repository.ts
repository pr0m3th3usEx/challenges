import { Metric, MetricGetAllOptions, MetricRepository } from '@virtuve/biz-core';

export class PrismaMetricRepository implements MetricRepository {
  save(_metric: Metric): Promise<Metric> {
    throw new Error('Method not implemented.');
  }
  get(_id: string): Promise<Metric | null> {
    throw new Error('Method not implemented.');
  }
  getAll(_options?: MetricGetAllOptions): Promise<Metric[]> {
    throw new Error('Method not implemented.');
  }
  getAthleteMetrics(_options?: MetricGetAllOptions): Promise<Metric[]> {
    throw new Error('Method not implemented.');
  }
}
