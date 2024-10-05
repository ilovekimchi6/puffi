import { z } from 'zod';
import zodToJsonSchema from 'zod-to-json-schema';

export const financeOutputSchema = z.object({
  incomeAssessment: z
    .number()
    .min(0)
    .max(100)
    .describe(
      'Evaluate the adequacy and stability of monthly income. Consider factors like income level relative to expenses, income growth, and income diversification. Higher scores indicate a strong, stable income that comfortably covers expenses and supports financial goals.',
    ),

  savingsRate: z
    .number()
    .min(0)
    .max(100)
    .describe(
      'Assess the proportion of income being saved. Consider both the percentage of income saved and the absolute amount. Higher scores indicate a robust savings habit that significantly contributes to long-term financial health.',
    ),

  budgetAdherenceScore: z
    .number()
    .min(0)
    .max(100)
    .describe(
      'Rate how closely the individual adheres to their budget. This score should directly reflect the budgetAdherencePercentage from the FinanceDTO. Higher scores indicate excellent budget discipline and financial control.',
    ),

  financialGoalClarity: z
    .number()
    .min(0)
    .max(100)
    .describe(
      'Evaluate the clarity and feasibility of financial goals. Consider the specificity, measurability, achievability, relevance, and time-bound nature of the goals. Higher scores suggest well-defined, realistic financial objectives.',
    ),

  investmentStrategyQuality: z
    .number()
    .min(0)
    .max(100)
    .describe(
      'Assess the quality and appropriateness of the investment strategy. Consider factors like diversification, risk management, alignment with financial goals, and long-term perspective. Higher scores indicate a well-thought-out, balanced investment approach.',
    ),

  overallFinancialHealth: z
    .number()
    .min(0)
    .max(100)
    .describe(
      'Calculate an overall financial health score based on all other metrics. This should be a weighted average, giving appropriate importance to each aspect of financial management. Higher scores represent excellent overall financial health.',
    ),

  overallScore: z
    .number()
    .min(0)
    .max(100)
    .describe(
      "Provide a single, comprehensive score that encapsulates all aspects of financial management. This should consider all other metrics but may also factor in additional elements from the user's input. Higher scores represent outstanding overall financial performance.",
    ),

  keyInsight: z
    .string()
    .max(200)
    .describe(
      "Offer a concise, impactful insight based on the financial analysis. This should highlight the most significant finding, whether positive or an area for improvement. For example: 'Your excellent budget adherence is strengthening your overall financial health, but there's potential to enhance your investment strategy for long-term growth.'",
    ),

  actionableAdvice: z
    .string()
    .max(250)
    .describe(
      "Provide specific, practical advice tailored to the user's financial situation. This should address the most pressing improvement area or leverage their strongest financial aspect. For example: 'To improve your investment strategy, consider diversifying your portfolio across different asset classes. This can help balance risk and potentially increase returns, complementing your strong budgeting skills.'",
    ),
});

export const FinanceJsonSchema = zodToJsonSchema(
  financeOutputSchema,
  'financeOutputSchema',
);
