import {
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { LLMEvaluation } from 'src/llm/data models/llm.dataModel';
import { User } from 'src/user/data models/user.dataModel';

@Entity()
export class Productivity {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id: number;

  @ManyToOne(() => User)
  user: User;

  @OneToOne(() => LLMEvaluation)
  llmEvaluation: LLMEvaluation;

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
