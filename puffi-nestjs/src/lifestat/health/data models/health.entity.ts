import {
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { HealthEvaluation } from 'src/llm/data models/healthEvaluation.entity';
import { User } from 'src/user/data models/user.entity';

@Entity()
export class Health {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id!: number;

  @ManyToOne(() => User)
  user: User;

  @OneToOne(() => HealthEvaluation)
  healthEvaluation: HealthEvaluation;

  @Property()
  exerciseRoutine: string;

  @Property()
  dietaryHabits: string;

  @Property()
  averageSleepHours: number;

  @Property()
  mentalHealthStatus: string;

  @Property()
  healthGoals: string;

  @Property()
  createdAt = new Date();
}
