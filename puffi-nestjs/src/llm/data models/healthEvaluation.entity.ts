import { Entity, OneToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Health } from 'src/lifestat/health/data models/health.entity';

@Entity()
export class HealthEvaluation {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id: number;

  @OneToOne(() => Health)
  health: Health;

  @Property()
  exerciseEffectiveness: number; // A score evaluating the effectiveness of the exercise routine

  @Property()
  dietaryImpact: number; // A score assessing the impact of dietary habits on health

  @Property()
  sleepQuality: number; // A score evaluating the quality of sleep based on average sleep hours

  @Property()
  mentalHealthScore: number; // A score assessing the mental health status

  @Property()
  goalAchievementRate: number; // A score representing the achievement of health goals

  @Property()
  overallHealthScore: number; // A cumulative score of overall health

  @Property()
  keyInsights: string; // Insights derived from the health evaluation

  @Property()
  actionableAdvice: string; // Specific advice for improving health based on evaluation

  @Property()
  createdAt = new Date(); // Timestamp for when the evaluation was created
}
