import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { Productivity } from './data models/productivity.dataModel';
import { ProductivityDTO } from 'src/commands/dtos/productivity.dto';

export class ProductivityRepository extends EntityRepository<Productivity> {
  // This adds a new productivity to the database.

  async addProductivity(
    productivityDTO: ProductivityDTO,
    em?: EntityManager,
  ): Promise<void> {
    const {
      majorGoalsToAccomplish,
      timeSpentOnKeyActivities,
      progressVsPlan,
      improvementAreas,
      challengesFaced,
    } = productivityDTO;

    const manager = em || this.em;
    try {
      const productivity = manager.create(Productivity, {
        majorGoalsToAccomplish,
        timeSpentOnKeyActivities,
        progressVsPlan,
        improvementAreas,
        challengesFaced,
      });

      await manager.persist(productivity).flush();
    } catch (error) {
      console.error(error);
    }
  }

  // This gets the latest productivity entries from the database

  async getLatestProductivities(
    limit: number = 4,
    em?: EntityManager,
  ): Promise<Productivity[]> {
    try {
      const manager = em || this.em;
      return await manager.find(
        Productivity,
        {},
        { orderBy: { createdAt: 'DESC' }, limit },
      );
    } catch (error) {
      console.error(error);
    }
  }

  // This gets a productivity entry by its id
  async getProductivityById(
    id: number,
    em?: EntityManager,
  ): Promise<Productivity> {
    try {
      const manager = em || this.em;
      return manager.findOneOrFail(Productivity, { id });
    } catch (error) {
      console.error(error);
    }
  }
}
