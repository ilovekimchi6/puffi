import { Module } from '@nestjs/common';
import { LlmService } from './llm.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { FinanceEvaluation } from './data models/financeEvaluation.entity';
import { HealthEvaluation } from './data models/healthEvaluation.entity';
import { ProductivityEvaluation } from './data models/productivityEvaluation.entity';
import { RelationshipsEvaluation } from './data models/relationshipsEvaluation.entity';

@Module({
  imports: [
    MikroOrmModule.forFeature([
      FinanceEvaluation,
      HealthEvaluation,
      ProductivityEvaluation,
      RelationshipsEvaluation,
    ]),
  ],
  providers: [LlmService],
})
export class LlmModule {}
