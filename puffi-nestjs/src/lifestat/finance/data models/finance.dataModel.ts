import {
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { FinanceEvaluation } from 'src/llm/data models/financeEvaluation.dataModel';
import { User } from 'src/user/data models/user.dataModel';

@Entity()
export class Finance {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id!: number;

  @ManyToOne(() => User)
  user: User;

  @OneToOne(() => FinanceEvaluation)
  financeEvaluation: FinanceEvaluation;

  @Property()
  monthlyIncome: number;

  @Property()
  monthlySavings: number;

  @Property()
  budgetAdherencePercentage: number;

  @Property()
  financialGoals: string;

  @Property()
  investmentStrategy: string;

  @Property()
  createdAt = new Date();
}
