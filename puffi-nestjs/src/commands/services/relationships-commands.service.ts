import { Injectable } from '@nestjs/common';
import { LlmService } from 'src/llm/llm.service';
import { EntityManager } from '@mikro-orm/postgresql';
import { RelationshipsService } from 'src/lifestat/relationships/relationships.service';
import { RelationshipsDTO } from '../dtos/relationships.dto';
import { RelationshipsEvaluation } from 'src/llm/data models/relationshipsEvaluation.entity';
import { RelationshipsJsonSchema } from 'src/llm/zod/relationshipsEvaluation.schema';

@Injectable()
export class RelationshipsCommandsService {
  constructor(
    private relationshipsService: RelationshipsService,
    private llmService: LlmService,
    private em: EntityManager,
  ) {}

  async addRelationshipsCommand(
    relationshipsDto: RelationshipsDTO,
  ): Promise<void> {
    try {
      // Get the latest Relationships entries
      const latestRelationships =
        await this.relationshipsService.getLatestRelationshipsService();

      // Get the LLM evaluation

      const getLLMEvaluation = await this.llmService.lLMEvaluation(
        latestRelationships,
        RelationshipsJsonSchema,
      );

      // Add the Relationships and LLM evaluation to the database
      // If one fails, the other will not be added.

      await this.em.transactional(async (em) => {
        await this.relationshipsService.addRelationshipsService(
          relationshipsDto,
          em,
        );

        await this.llmService.addLLMHealthEvaluation(em, getLLMEvaluation);
      });
    } catch (e) {
      console.log(e);
    }
  }

  //This command has the job of returning back the latest health entry.

  async getLLMRelationshipsCommand(): Promise<RelationshipsEvaluation | null> {
    const latestEvaluation = await this.llmService.getLLMEvaluation(
      this.em,
      RelationshipsEvaluation,
    );
    return latestEvaluation;
  }
}
