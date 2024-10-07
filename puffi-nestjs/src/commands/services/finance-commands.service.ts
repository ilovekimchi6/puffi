import { Injectable } from '@nestjs/common';
import { FinanceService } from 'src/lifestat/finance/finance.service';
import { LlmService } from 'src/llm/llm.service';
import { FinanceDTO } from '../dtos/finance.dto';
import { EntityManager } from '@mikro-orm/postgresql';
import { FinanceJsonSchema } from 'src/llm/zod/financeEvaluation.schema';
import { FinanceEvaluation } from 'src/llm/data models/financeEvaluation.entity';

@Injectable()
export class FinanceCommandsService {
  constructor(
    private financeService: FinanceService,
    private llmService: LlmService,
    private em: EntityManager,
  ) {}

  async addFinanceCommand(financeDto: FinanceDTO): Promise<void> {
    try {
      // Get the latest Finance entries
      const latestFinances =
        await this.financeService.getLatestFinanceService();

      // Get the LLM evaluation

      const getLLMEvaluation = await this.llmService.lLMEvaluation(
        latestFinances,
        FinanceJsonSchema,
      );

      // Add the Finance and LLM evaluation to the database
      // If one fails, the other will not be added.

      await this.em.transactional(async (em) => {
        await this.financeService.addFinanceService(financeDto, em);

        await this.llmService.addLLMFianceEvaluation(em, getLLMEvaluation);
      });
    } catch (e) {
      console.log(e);
    }
  }

  //This command has the job of returning back the latest Finance entry.

  async getLLMFinanceCommand(): Promise<FinanceEvaluation | null> {
    const latestEvaluation = await this.llmService.getLLMEvaluation(
      this.em,
      FinanceEvaluation,
    );
    return latestEvaluation;
  }
}
