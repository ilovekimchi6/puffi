import { Entity, PrimaryKey, Property, OneToOne } from '@mikro-orm/core';
import { Relationships } from 'src/lifestat/relationships/data models/relationships.dataModel';

@Entity()
export class RelationshipsEvaluation {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id: number;

  @OneToOne(() => Relationships)
  relationships: Relationships;

  @Property()
  familyRelationshipsQuality: number;

  @Property()
  friendshipsQuality: number;

  @Property()
  romanticRelationshipsQuality: number;

  @Property()
  overallSatisfactionScore: number;

  @Property()
  relationshipGoalsClarity: number;

  @Property()
  socialNetworkStrength: number;

  @Property()
  emotionalSupportScore: number;

  @Property()
  overallRelationshipHealth: number;

  @Property()
  keyInsight: string;

  @Property()
  actionableAdvice: string;

  @Property()
  createdAt = new Date();
}
