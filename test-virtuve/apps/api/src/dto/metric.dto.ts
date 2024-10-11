import { IsEnum, IsNumber, Length } from 'class-validator';
import { MetricType } from '@virtuve/biz-core/value_objects';

export class CreateMetricDto {
  @IsNumber()
  readonly value!: number;

  @Length(1, 10)
  readonly unit!: string;

  @IsEnum(MetricType)
  readonly metricType!: MetricType;
}
