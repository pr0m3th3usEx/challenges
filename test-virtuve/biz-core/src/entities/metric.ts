import MetricType from '../value_objects/metric_type';

class Metric {
  constructor(
    public id: string,
    public athleteId: string,
    public metricType: MetricType,
    public value: number,
    public unit: string,
    public timestamp: Date,
  ) {}
}

export default Metric;