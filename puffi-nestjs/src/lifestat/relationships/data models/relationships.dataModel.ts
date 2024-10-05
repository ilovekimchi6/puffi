import {
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { RelationshipsEvaluation } from 'src/llm/data models/relationshipsEvaluation.dataModel';
import { User } from 'src/user/data models/user.dataModel';

@Entity()
export class Relationships {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id!: number;

  @ManyToOne(() => User)
  user: User;

  @OneToOne(() => RelationshipsEvaluation)
  relationshipsEvaluation: RelationshipsEvaluation;

  @Property()
  familyRelationships: string;

  @Property()
  friendships: string;

  @Property()
  romanticRelationships: string;

  @Property()
  overallSatisfaction: number;

  @Property()
  relationshipGoals: string;

  @Property()
  createdAt = new Date();
}
