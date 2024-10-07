import { Injectable } from '@nestjs/common';
import { LlmService } from 'src/llm/llm.service';
import { EntityManager } from '@mikro-orm/postgresql';
import { HealthJsonSchema } from 'src/llm/zod/healthEvaluation.schema';
import { HealthEvaluation } from 'src/llm/data models/healthEvaluation.entity';
import { HealthService } from 'src/lifestat/health/health.service';
import { HealthDTO } from '../dtos/health.dto';

@Injectable()
export class HealthCommandsService {
  constructor(
    private healthService: HealthService,
    private llmService: LlmService,
    private em: EntityManager,
  ) {}

  async addHealthCommand(healthDto: HealthDTO): Promise<void> {
    try {
      // Get the latest Health entries
      const latestHealth = await this.healthService.getLatestHealthService();

      // Get the LLM evaluation

      const getLLMEvaluation = await this.llmService.lLMEvaluation(
        latestHealth,
        HealthJsonSchema,
      );

      // Add the health and LLM evaluation to the database
      // If one fails, the other will not be added.

      await this.em.transactional(async (em) => {
        await this.healthService.addHealthService(healthDto, em);

        await this.llmService.addLLMHealthEvaluation(em, getLLMEvaluation);
      });
    } catch (e) {
      console.log(e);
    }
  }

  //This command has the job of returning back the latest health entry.

  async getLLMHealthCommand(): Promise<HealthEvaluation | null> {
    const latestEvaluation = await this.llmService.getLLMEvaluation(
      this.em,
      HealthEvaluation,
    );
    return latestEvaluation;
  }
}
