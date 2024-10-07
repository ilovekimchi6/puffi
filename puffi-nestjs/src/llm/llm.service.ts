import { Injectable } from '@nestjs/common';
import Together from 'together-ai';
import { EntityManager, QueryOrder } from '@mikro-orm/postgresql';
import { ProductivityEvaluation } from './data models/productivityEvaluation.entity';
import { FinanceEvaluation } from './data models/financeEvaluation.entity';
import { HealthEvaluation } from './data models/healthEvaluation.entity';
import { RelationshipsEvaluation } from './data models/relationshipsEvaluation.entity';

@Injectable()
export class LlmService {
  constructor() {}

  // This function takes the latest productivity entries and sends them to Together AI to get an evaluation.
  //This returns the data in the form of the zod schema 'productivityOutputSchema'.

  // async lLMEvaluation<T>(latestEntries: T[], schema: any): Promise<any>

  async lLMEvaluation<T>(latestEvaluation: T[], schema: any): Promise<any> {
    const together = new Together();
    const systemContent = 'system';
    const prompt = `You have added a new productivity entry. Here are your latest productivity entries: ${latestEvaluation}`;
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
        schema: schema,
      },
    });
    if (extract?.choices?.[0]?.message?.content) {
      output = JSON.parse(extract?.choices?.[0]?.message?.content);
    }

    return output;
  }

  // This function takes the output from the getLLMEvaluation function and adds it to the database.
  async addLLMProductivityEvaluation(
    em: EntityManager,
    output: string,
  ): Promise<void> {
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

  async addLLMFianceEvaluation(
    em: EntityManager,
    output: string,
  ): Promise<void> {
    const parsedOutput = JSON.parse(output);

    const {
      incomeAssessment,
      savingsRate,
      budgetAdherenceScore,
      financialGoalClarity,
      investmentStrategyQuality,
      overallFinancialHealth,
      overallScore,
      keyInsight,
      actionableAdvice,
    } = parsedOutput;

    em.create(FinanceEvaluation, {
      incomeAssessment,
      savingsRate,
      budgetAdherenceScore,
      financialGoalClarity,
      investmentStrategyQuality,
      overallFinancialHealth,
      overallScore,
      keyInsight,
      actionableAdvice,
    });
  }

  async addLLMHealthEvaluation(
    em: EntityManager,
    output: string,
  ): Promise<void> {
    const parsedOutput = JSON.parse(output);

    const {
      exerciseEffectiveness,
      dietaryImpact,
      sleepQuality,
      mentalHealthScore,
      goalAchievementRate,
      overallHealthScore,
      keyInsights,
      actionableAdvice,
    } = parsedOutput;

    em.create(HealthEvaluation, {
      exerciseEffectiveness,
      dietaryImpact,
      sleepQuality,
      mentalHealthScore,
      goalAchievementRate,
      overallHealthScore,
      keyInsights,
      actionableAdvice,
    });
  }

  async addLLMRelationshipsEvaluation(
    em: EntityManager,
    output: string,
  ): Promise<void> {
    const parsedOutput = JSON.parse(output);

    const {
      familyRelationshipsQuality,
      friendshipsQuality,
      romanticRelationshipsQuality,
      overallSatisfactionScore,
      relationshipGoalsClarity,
      socialNetworkStrength,
      emotionalSupportScore,
      overallRelationshipHealth,
      keyInsight,
      actionableAdvice,
    } = parsedOutput;

    em.create(RelationshipsEvaluation, {
      familyRelationshipsQuality,
      friendshipsQuality,
      romanticRelationshipsQuality,
      overallSatisfactionScore,
      relationshipGoalsClarity,
      socialNetworkStrength,
      emotionalSupportScore,
      overallRelationshipHealth,
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
