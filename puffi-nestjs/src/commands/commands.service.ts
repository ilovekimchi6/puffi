import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { ProductivityService } from 'src/lifestat/productivity/productivity.service';
import { AuthDTO } from './dtos/auth.dto';
import { ProductivityDTO } from './dtos/productivity.dto';
import { LlmService } from 'src/llm/llm.service';
import { EntityManager } from '@mikro-orm/postgresql';

@Injectable()
export class CommandsService {
  constructor(
    private authService: AuthService,
    private productivityService: ProductivityService,
    private llmService: LlmService,
    private em: EntityManager,
  ) {}

  async loginUserCommand(authDto: AuthDTO): Promise<any> {
    return await this.authService.login(authDto);
  }

  async addProductivityCommand(
    productivityDTO: ProductivityDTO,
  ): Promise<void> {
    try {
      const latestProductivities =
        await this.productivityService.getLatestProductivitiesService();

      const getLLMEvaluation =
        await this.llmService.getLLMEvaluation(latestProductivities);

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
}
