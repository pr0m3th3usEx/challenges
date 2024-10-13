import { AthleteRepository } from '../../contracts/repositories/athlete_repository.js';
import { MetricRepository } from '../../contracts/repositories/metric_repository.js';
import { Metric } from '../../entities/metric.js';
import { MetricType } from '../../value_objects/metric_type.js';
import { v4 } from 'uuid';

// TODO custom exception for command

export class CreateMetricCommand {
  constructor(
    private readonly athleteId: string,
    private readonly metricType: MetricType,
    private readonly value: number,
    private readonly unit: string,
  ) {}

  async execute(athlete_repository: AthleteRepository, metric_repository: MetricRepository): Promise<string /** id */> {
    const athlete = await athlete_repository.get(this.athleteId).catch((_err) => {
      throw new Error('Service error');
    });

    if (!athlete) throw new Error('Athlete not found');

    const metric: Metric = {
      id: v4(),
      athleteId: this.athleteId,
      metricType: this.metricType,
      timestamp: new Date(),
      unit: this.unit,
      value: this.value,
    };

    try {
      const { id: metricId } = await metric_repository.save(metric);

      return metricId;
    } catch (_err) {
      throw new Error('ServiceError');
    }
  }
}
