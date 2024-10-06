import { Entity, PrimaryKey, Property, OneToOne } from '@mikro-orm/core';
import { Finance } from 'src/lifestat/finance/data models/finance.entity';

@Entity()
export class FinanceEvaluation {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id: number;

  @OneToOne(() => Finance)
  finance: Finance;

  @Property()
  incomeAssessment: number;

  @Property()
  savingsRate: number;

  @Property()
  budgetAdherenceScore: number;

  @Property()
  financialGoalClarity: number;

  @Property()
  investmentStrategyQuality: number;

  @Property()
  overallFinancialHealth: number;

  @Property()
  overallScore: number;

  @Property()
  keyInsight: string;

  @Property()
  actionableAdvice: string;

  @Property()
  createdAt = new Date();
}
