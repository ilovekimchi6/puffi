import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';
import { MaxWords } from 'src/common/pipelines/maxWords.pipeline';

export class HealthDTO {
  @IsString()
  @IsNotEmpty()
  @MaxWords(200)
  exerciseRoutine: string;

  @IsString()
  @IsNotEmpty()
  @MaxWords(200)
  dietaryHabits: string;

  @IsNumber()
  @IsNotEmpty()
  @Max(24)
  @Min(0)
  averageSleepHours: number;

  @IsString()
  @IsNotEmpty()
  @MaxWords(200)
  mentalHealthStatus: string;

  @IsString()
  @IsNotEmpty()
  @MaxWords(200)
  healthGoals: string;
}
