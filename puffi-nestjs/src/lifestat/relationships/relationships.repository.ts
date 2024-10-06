import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { Relationships } from './data models/relationships.entity';
import { RelationshipsDTO } from 'src/commands/dtos/relationships.dto';

export class RelationshipsRepository extends EntityRepository<Relationships> {
  async addRelationships(
    relationshipsDTO: RelationshipsDTO,
    em?: EntityManager,
  ): Promise<void> {
    const {
      familyRelationships,
      friendships,
      romanticRelationships,
      overallSatisfaction,
      relationshipGoals,
    } = relationshipsDTO;

    const manager = em || this.em;
    try {
      const relationships = manager.create(Relationships, {
        familyRelationships,
        friendships,
        romanticRelationships,
        overallSatisfaction,
        relationshipGoals,
      });

      await manager.persist(relationships).flush();
    } catch (error) {
      console.error(error);
    }
  }

  async getLatestRelationships(
    limit: number = 4,
    em?: EntityManager,
  ): Promise<Relationships[]> {
    try {
      const manager = em || this.em;
      return await manager.find(
        Relationships,
        {},
        { orderBy: { createdAt: 'DESC' }, limit },
      );
    } catch (error) {
      console.error(error);
    }
  }

  async getRelationshipsById(
    id: number,
    em?: EntityManager,
  ): Promise<Relationships> {
    try {
      const manager = em || this.em;
      return manager.findOneOrFail(Relationships, { id });
    } catch (error) {
      console.error(error);
    }
  }
}
