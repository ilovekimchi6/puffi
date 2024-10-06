import { Entity, OneToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Productivity } from 'src/lifestat/productivity/data models/productivity.entity';

@Entity()
export class ProductivityEvaluation {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id: number;

  @OneToOne(() => Productivity)
  productivity: Productivity;

  @Property()
  goalProgress: number;

  @Property()
  timeEfficiency: number;

  @Property()
  challengeManagement: number;

  @Property()
  improvementRate: number;

  @Property()
  focusScore: number;

  @Property()
  overallProductivity: number;

  @Property()
  overallScore: number;

  @Property()
  keyInsight: string;

  @Property()
  actionableAdvice: string;

  @Property()
  createdAt = new Date();
}
