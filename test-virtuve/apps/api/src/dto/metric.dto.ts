import { IsDateString, IsEnum, IsInt, IsNumber, IsOptional, Length, Max, Min } from 'class-validator';
import { MetricType } from '@virtuve/biz-core/value_objects';
import { Transform } from 'class-transformer';
import { IsValidDateRange } from 'src/utils/validation';
import { AthleteMetricsAggregateOperation } from '@virtuve/biz-core/queries/metrics/get_athlete_metrics_aggregate_query';

export class CreateMetricDto {
  @IsNumber()
  readonly value!: number;

  @Length(1, 10)
  readonly unit!: string;

  @IsEnum(MetricType)
  readonly metricType!: MetricType;
}

export class GetAthleteMetricsQueryDto {
  @IsOptional()
  @IsEnum(MetricType)
  readonly metricType?: MetricType;

  @IsOptional()
  @IsValidDateRange({ property: 'to', rangeField: 'end' })
  @IsDateString()
  readonly from?: string; // Date

  @IsOptional()
  @IsDateString()
  @IsValidDateRange({ property: 'from', rangeField: 'start' })
  readonly to?: string; // Date
}

export class GetAthletesLeaderboardQueryDto {
  @IsEnum(MetricType)
  readonly metricType!: MetricType;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  @Transform(({ value }) => parseInt(value, 10))
  readonly limit?: number;
}

export class GetAthleteMetricsAggregateQueryDto {
  @IsOptional()
  @IsEnum(MetricType)
  readonly metricType?: MetricType;

  @IsEnum(AthleteMetricsAggregateOperation)
  readonly operation!: AthleteMetricsAggregateOperation;
}
