import { Injectable } from '@nestjs/common';
import { Productivity } from 'src/lifestat/productivity/data models/productivity.dataModel';
import Together from 'together-ai';
import { ProductivityJsonSchema } from './zod/productivityEvaluation.schema';
import { EntityManager, QueryOrder } from '@mikro-orm/postgresql';
import { ProductivityEvaluation } from './data models/productivityEvaluation.dataModel';

@Injectable()
export class LlmService {
  constructor() {}

  // This function takes the latest productivity entries and sends them to Together AI to get an evaluation.
  //This returns the data in the form of the zod schema 'productivityOutputSchema'.

  async lLMEvaluation(latestProductivities: Productivity[]): Promise<any> {
    const together = new Together();
    const systemContent = 'system';
    const prompt = `You have added a new productivity entry. Here are your latest productivity entries: ${latestProductivities}`;
    let output = '';

    const extract = await together.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: systemContent,
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      model: 'meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo',

      response_format: {
        type: 'json_object',
        schema: ProductivityJsonSchema as any,
      },
    });
    if (extract?.choices?.[0]?.message?.content) {
      output = JSON.parse(extract?.choices?.[0]?.message?.content);
    }

    return output;
  }

  // This function takes the output from the getLLMEvaluation function and adds it to the database.
  async addLLMEvaluation(em: EntityManager, output: string): Promise<void> {
    const parsedOutput = JSON.parse(output);

    const {
      goalProgress,
      timeEfficiency,
      challengeManagement,
      improvementRate,
      focusScore,
      overallProductivity,
      overallScore,
      keyInsight,
      actionableAdvice,
    } = parsedOutput;

    em.create(ProductivityEvaluation, {
      goalProgress,
      timeEfficiency,
      challengeManagement,
      improvementRate,
      focusScore,
      overallProductivity,
      overallScore,
      keyInsight,
      actionableAdvice,
    });
  }

  async getLLMEvaluation<T extends { id: any }>(
    em: EntityManager,
    entityType: new () => T,
  ): Promise<T | null> {
    const latestEvaluation = await em.findOne(
      entityType,
      {},
      {
        orderBy: { id: QueryOrder.DESC },
      },
    );

    return latestEvaluation;
  }
}
