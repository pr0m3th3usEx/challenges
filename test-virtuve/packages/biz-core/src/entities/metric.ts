import { MetricType } from '../value_objects/metric_type.js';

export interface Metric {
  readonly id: string;
  readonly athleteId: string;
  readonly metricType: MetricType;
  readonly value: number;
  readonly unit: string;
  readonly timestamp: Date;
}
