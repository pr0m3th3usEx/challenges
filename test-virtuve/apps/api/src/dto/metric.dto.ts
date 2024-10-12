import { IsDate, IsDateString, IsEnum, IsInt, IsNumber, IsOptional, Length, Max, Min } from 'class-validator';
import { MetricType } from '@virtuve/biz-core/value_objects';
import { Transform, Type } from 'class-transformer';
import { IsValidDateRange } from 'src/utils/validation';

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
