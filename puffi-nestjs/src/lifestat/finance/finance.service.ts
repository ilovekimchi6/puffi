import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { FinanceRepository } from './finance.repository';
import { FinanceDTO } from 'src/commands/dtos/finance.dto';
import { EntityManager } from '@mikro-orm/postgresql';
import { Finance } from './data models/finance.entity';

@Injectable()
export class FinanceService {
  constructor(
    @InjectRepository(Finance)
    private financeRepository: FinanceRepository,
  ) {}

  async addFinanceService(
    financeDTO: FinanceDTO,
    em?: EntityManager,
  ): Promise<void> {
    try {
      await this.financeRepository.addFinance(financeDTO, em);
    } catch (error) {
      console.log(error);
    }
  }

  async getLatestFinanceService(
    limit: number = 4,
    em?: EntityManager,
  ): Promise<Finance[]> {
    return this.financeRepository.getLatestFinance(limit, em);
  }

  async getFinanceByIdService(id: number): Promise<Finance> {
    return this.financeRepository.getFinanceById(id);
  }
}
