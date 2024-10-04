import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { Productivity } from './data models/productivity.dataModel';
import { ProductivityDTO } from 'src/commands/dtos/productivity.dto';

export class ProductivityRepository extends EntityRepository<Productivity> {
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
