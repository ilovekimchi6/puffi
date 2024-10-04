import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';
import { MaxWords } from 'src/common/pipelines/maxWords.pipeline';

export class ProductivityDTO {
  @IsString()
  @IsNotEmpty()
  @MaxWords(200)
  majorGoalsToAccomplish: string;

  @IsString()
  @IsNotEmpty()
  @MaxWords(200)
  timeSpentOnKeyActivities: string;

  @IsNumber()
  @IsNotEmpty()
  @Max(100)
  @Min(0)
  progressVsPlan: number;

  @IsString()
  @IsNotEmpty()
  @MaxWords(200)
  improvementAreas: string;

  @IsString()
  @IsNotEmpty()
  @MaxWords(200)
  challengesFaced: string;
}
