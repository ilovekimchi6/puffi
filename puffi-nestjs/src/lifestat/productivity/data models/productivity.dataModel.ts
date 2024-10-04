import {
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { ProductivityEvaluation } from 'src/llm/data models/productivityEvaluation.dataModel';
import { User } from 'src/user/data models/user.dataModel';

@Entity()
export class Productivity {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id: number;

  @ManyToOne(() => User)
  user: User;

  @OneToOne(() => ProductivityEvaluation)
  productivityEvaluation: ProductivityEvaluation;

  @Property()
  majorGoalsToAccomplish: string;

  @Property()
  timeSpentOnKeyActivities: string;

  @Property()
  progressVsPlan: number;

  @Property()
  improvementAreas: string;

  @Property()
  challengesFaced: string;

  @Property()
  createdAt = new Date();
}
