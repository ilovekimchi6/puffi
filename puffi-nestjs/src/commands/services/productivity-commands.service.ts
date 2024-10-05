import { Injectable } from '@nestjs/common';
// import { AuthService } from 'src/auth/auth.service';
import { ProductivityService } from 'src/lifestat/productivity/productivity.service';
import { ProductivityDTO } from '../dtos/productivity.dto';
import { LlmService } from 'src/llm/llm.service';
import { EntityManager } from '@mikro-orm/postgresql';
import { ProductivityEvaluation } from 'src/llm/data models/productivityEvaluation.dataModel';
import { ProductivityJsonSchema } from 'src/llm/zod/productivityEvaluation.schema';

// A command is basically a service that calls a lot of methods from other services.
//They all are executed in a transactional way, so if one fails, the other will not be added.
@Injectable()
export class ProductivityCommandsService {
  constructor(
    private productivityService: ProductivityService,
    private llmService: LlmService,
    private em: EntityManager,
  ) {}

  // // Add login command, which does everything
  // async loginUserCommand(authDto: AuthDTO): Promise<any> {
  //   return await this.authService.login(authDto);
  // }

  // Add productivity command, which does everything
  async addProductivityCommand(
    productivityDTO: ProductivityDTO,
  ): Promise<void> {
    try {
      // Get the latest productivity entries
      const latestProductivities =
        await this.productivityService.getLatestProductivitiesService();

      // Get the LLM evaluation

      const getLLMEvaluation = await this.llmService.lLMEvaluation(
        latestProductivities,
        ProductivityJsonSchema,
      );

      // Add the productivity and LLM evaluation to the database
      // If one fails, the other will not be added.

      await this.em.transactional(async (em) => {
        await this.productivityService.addProductivityService(
          productivityDTO,
          em,
        );

        await this.llmService.addLLMEvaluation(em, getLLMEvaluation);
      });
    } catch (e) {
      console.log(e);
    }
  }

  //This command has the job of returning back the latest productivity e

  async getLLMPredictionCommand(): Promise<ProductivityEvaluation | null> {
    const latestEvaluation = await this.llmService.getLLMEvaluation(
      this.em,
      ProductivityEvaluation,
    );
    return latestEvaluation;
  }
}
