import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { HealthRepository } from './health.repository';
import { HealthDTO } from 'src/commands/dtos/health.dto';
import { Health } from './data models/health.entity';
import { EntityManager } from '@mikro-orm/postgresql';

@Injectable()
export class HealthService {
  constructor(
    @InjectRepository(Health)
    private healthRepository: HealthRepository,
  ) {}

  async addHealthService(
    healthDTO: HealthDTO,
    em?: EntityManager,
  ): Promise<void> {
    try {
      await this.healthRepository.addHealth(healthDTO, em);
    } catch (error) {
      console.log(error);
    }
  }

  async getLatestHealthService(
    limit: number = 4,
    em?: EntityManager,
  ): Promise<Health[]> {
    return this.healthRepository.getLatestHealth(limit, em);
  }

  async getHealthByIdService(id: number): Promise<Health> {
    return this.healthRepository.getHealthById(id);
  }
}
