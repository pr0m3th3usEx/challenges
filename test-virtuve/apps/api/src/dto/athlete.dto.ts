import { IsInt, Length, Max, Min } from 'class-validator';

export class CreateAthleteDto {
  @Length(1, 60)
  readonly name: string;

  @IsInt()
  @Min(13)
  @Max(100)
  readonly age: number;

  @Length(1, 60)
  readonly team: string;
}
