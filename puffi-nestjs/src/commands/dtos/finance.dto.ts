import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';
import { MaxWords } from 'src/common/pipelines/maxWords.pipeline';

export class FinanceDTO {
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  monthlyIncome: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  monthlySavings: number;

  @IsNumber()
  @IsNotEmpty()
  @Max(100)
  @Min(0)
  budgetAdherencePercentage: number;

  @IsString()
  @IsNotEmpty()
  @MaxWords(200)
  financialGoals: string;

  @IsString()
  @IsNotEmpty()
  @MaxWords(200)
  investmentStrategy: string;
}
