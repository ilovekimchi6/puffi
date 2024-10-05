import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { HealthDTO } from 'src/commands/dtos/health.dto';
import { Health } from './data models/health.dataModel';

export class HealthRepository extends EntityRepository<Health> {
  async addHealth(healthDTO: HealthDTO, em?: EntityManager): Promise<void> {
    const {
      exerciseRoutine,
      dietaryHabits,
      averageSleepHours,
      mentalHealthStatus,
      healthGoals,
    } = healthDTO;

    const manager = em || this.em;
    try {
      const health = manager.create(Health, {
        exerciseRoutine,
        dietaryHabits,
        averageSleepHours,
        mentalHealthStatus,
        healthGoals,
      });

      await manager.persist(health).flush();
    } catch (error) {
      console.error(error);
    }
  }

  async getLatestHealth(
    limit: number = 4,
    em?: EntityManager,
  ): Promise<Health[]> {
    try {
      const manager = em || this.em;
      return await manager.find(
        Health,
        {},
        { orderBy: { createdAt: 'DESC' }, limit },
      );
    } catch (error) {
      console.error(error);
    }
  }

  async getHealthById(id: number, em?: EntityManager): Promise<Health> {
    try {
      const manager = em || this.em;
      return manager.findOneOrFail(Health, { id });
    } catch (error) {
      console.error(error);
    }
  }
}
