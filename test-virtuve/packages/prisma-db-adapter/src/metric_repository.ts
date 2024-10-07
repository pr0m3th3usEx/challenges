import { Prisma, PrismaClient } from '@prisma/client';
import { Metric, MetricGetAllOptions, MetricRepository, MetricType } from '@virtuve/biz-core';

export class PrismaMetricRepository implements MetricRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async save(newMetric: Metric): Promise<Metric> {
    const data = await this.prisma.metric.create({
      data: {
        id: newMetric.id,
        athlete: {
          connect: {
            id: newMetric.athleteId,
          },
        },
        metricType: newMetric.metricType,
        timestamp: newMetric.timestamp,
        unit: newMetric.unit,
        value: newMetric.value,
      },
    });

    const metric: Metric = {
      id: data.id,
      athleteId: data.athleteId,
      metricType: data.metricType as MetricType,
      timestamp: data.timestamp,
      unit: data.unit,
      value: data.value,
    };

    return metric;
  }

  async get(id: string): Promise<Metric | null> {
    const data = await this.prisma.metric.findUnique({
      where: { id },
    });

    if (!data) return null;

    const metric: Metric = {
      id: data.id,
      athleteId: data.athleteId,
      metricType: data.metricType as MetricType,
      timestamp: data.timestamp,
      unit: data.unit,
      value: data.value,
    };

    return metric;
  }

  async getAll(options?: MetricGetAllOptions): Promise<Metric[]> {
    const prismaOptions: Prisma.MetricFindManyArgs = {
      skip: options ? options.page * options.limit : 0,
      take: options?.limit ?? 1000,
    };

    const data = await this.prisma.metric.findMany({
      ...prismaOptions,
    });

    const metrics = data.map<Metric>((d) => ({
      id: d.id,
      athleteId: d.athleteId,
      metricType: d.metricType as MetricType,
      timestamp: d.timestamp,
      unit: d.unit,
      value: d.value,
    }));

    return metrics;
  }

  async getAthleteMetrics(athleteId: string, options?: MetricGetAllOptions): Promise<Metric[]> {
    const prismaOptions: Prisma.MetricFindManyArgs = {
      skip: options ? options.page * options.limit : 0,
      take: options?.limit ?? 1000,
      where: {
        athleteId,
        metricType: options?.metricType,
        timestamp: {
          gte: options?.start,
          lt: options?.end,
        },
      },
    };

    const data = await this.prisma.metric.findMany(prismaOptions);

    const metrics = data.map<Metric>((d) => ({
      id: d.id,
      athleteId: d.athleteId,
      metricType: d.metricType as MetricType,
      timestamp: d.timestamp,
      unit: d.unit,
      value: d.value,
    }));

    return metrics;
  }
}
