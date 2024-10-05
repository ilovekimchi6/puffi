import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';
import { MaxWords } from 'src/common/pipelines/maxWords.pipeline';

export class RelationshipsDTO {
  @IsString()
  @IsNotEmpty()
  @MaxWords(200)
  familyRelationships: string;

  @IsString()
  @IsNotEmpty()
  @MaxWords(200)
  friendships: string;

  @IsString()
  @IsNotEmpty()
  @MaxWords(200)
  romanticRelationships: string;

  @IsNumber()
  @IsNotEmpty()
  @Max(10)
  @Min(0)
  overallSatisfaction: number;

  @IsString()
  @IsNotEmpty()
  @MaxWords(200)
  relationshipGoals: string;
}
