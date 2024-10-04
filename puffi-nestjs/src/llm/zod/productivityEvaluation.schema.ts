import { z } from 'zod';
import zodToJsonSchema from 'zod-to-json-schema';

export const productivityOutputSchema = z.object({
  goalProgress: z
    .number()
    .min(0)
    .max(100)
    .describe(
      "Evaluate overall progress towards major goals. Consider the number of goals accomplished, their significance, and how they align with the user's plans. Higher scores indicate substantial progress on important goals.",
    ),

  timeEfficiency: z
    .number()
    .min(0)
    .max(100)
    .describe(
      'Assess how effectively time is spent on key activities. Compare time allocation to the importance of tasks. Higher scores suggest optimal use of time on high-priority activities.',
    ),

  challengeManagement: z
    .number()
    .min(0)
    .max(100)
    .describe(
      'Rate how well challenges are being addressed. Consider the nature of challenges faced and any strategies employed to overcome them. Higher scores indicate effective problem-solving and resilience.',
    ),

  improvementRate: z
    .number()
    .min(0)
    .max(100)
    .describe(
      'Gauge the rate of improvement in identified areas. Analyze the specific improvement areas mentioned and any actions taken. Higher scores suggest rapid and significant improvements.',
    ),

  focusScore: z
    .number()
    .min(0)
    .max(100)
    .describe(
      "Evaluate the user's ability to maintain focus on important tasks. Consider time spent on key activities versus potential distractions. Higher scores indicate strong concentration and minimal time wasted.",
    ),

  overallProductivity: z
    .number()
    .min(0)
    .max(100)
    .describe(
      'Calculate an overall productivity score based on all other metrics. This should be a weighted average, giving more importance to goal progress and time efficiency. Higher scores indicate exceptional overall productivity.',
    ),

  overallScore: z
    .number()
    .min(0)
    .max(100)
    .describe(
      "Provide a single, comprehensive score that encapsulates all aspects of productivity. This should consider all other metrics but may also factor in additional elements from the user's input. Higher scores represent outstanding overall performance.",
    ),

  keyInsight: z
    .string()
    .max(150)
    .describe(
      'Offer a concise, impactful insight based on the analysis. This should highlight the most significant finding, whether positive or an area for improvement. For example: "Your exceptional goal progress is driving overall productivity, but there\'s room to enhance time management skills."',
    ),

  actionableAdvice: z
    .string()
    .max(200)
    .describe(
      'Provide specific, practical advice tailored to the user\'s situation. This should address the most pressing improvement area or leverage their strongest aspect. For example: "To boost your time efficiency, try implementing the Pomodoro Technique: work in focused 25-minute intervals, followed by short breaks. This can help maintain your strong goal progress while improving overall time management."',
    ),
});

export const ProductivityJsonSchema = zodToJsonSchema(
  productivityOutputSchema,
  'productivityOutputSchema',
);
