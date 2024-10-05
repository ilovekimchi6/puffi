import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { Finance } from './data models/finance.dataModel';
import { FinanceDTO } from 'src/commands/dtos/finance.dto';

export class FinanceRepository extends EntityRepository<Finance> {
  async addFinance(financeDTO: FinanceDTO, em?: EntityManager): Promise<void> {
    const {
      monthlyIncome,
      monthlySavings,
      budgetAdherencePercentage,
      financialGoals,
      investmentStrategy,
    } = financeDTO;

    const manager = em || this.em;
    try {
      const finance = manager.create(Finance, {
        monthlyIncome,
        monthlySavings,
        budgetAdherencePercentage,
        financialGoals,
        investmentStrategy,
      });

      await manager.persist(finance).flush();
    } catch (error) {
      console.error(error);
    }
  }

  async getLatestFinance(
    limit: number = 4,
    em?: EntityManager,
  ): Promise<Finance[]> {
    try {
      const manager = em || this.em;
      return await manager.find(
        Finance,
        {},
        { orderBy: { createdAt: 'DESC' }, limit },
      );
    } catch (error) {
      console.error(error);
    }
  }

  async getFinanceById(id: number, em?: EntityManager): Promise<Finance> {
    try {
      const manager = em || this.em;
      return manager.findOneOrFail(Finance, { id });
    } catch (error) {
      console.error(error);
    }
  }
}
