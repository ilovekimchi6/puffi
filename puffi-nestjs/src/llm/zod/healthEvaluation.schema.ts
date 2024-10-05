import { z } from 'zod';
import zodToJsonSchema from 'zod-to-json-schema';

export const healthOutputSchema = z.object({
  exerciseEffectiveness: z
    .number()
    .min(0)
    .max(100)
    .describe(
      "Evaluate the effectiveness of the exercise routine. Consider frequency, intensity, and variety of exercises. Higher scores indicate a well-rounded and consistent exercise regimen that aligns with the user's health goals.",
    ),

  dietaryImpact: z
    .number()
    .min(0)
    .max(100)
    .describe(
      "Assess the impact of dietary habits on overall health. Consider nutritional balance, portion control, and alignment with dietary goals. Higher scores suggest a diet that significantly contributes to the user's health and well-being.",
    ),

  sleepQuality: z
    .number()
    .min(0)
    .max(100)
    .describe(
      'Evaluate the quality of sleep based on average sleep hours and any reported sleep issues. Higher scores indicate consistent, restful sleep that supports overall health and daily functioning.',
    ),

  mentalHealthScore: z
    .number()
    .min(0)
    .max(100)
    .describe(
      'Assess the mental health status based on reported mood, stress levels, and coping mechanisms. Higher scores suggest good mental well-being and effective stress management.',
    ),

  goalAchievementRate: z
    .number()
    .min(0)
    .max(100)
    .describe(
      'Rate the achievement of health goals. Consider progress made towards specific health objectives and consistency in working towards these goals. Higher scores indicate significant progress and commitment to health improvement.',
    ),

  overallHealthScore: z
    .number()
    .min(0)
    .max(100)
    .describe(
      'Calculate a cumulative score of overall health based on all other metrics. This should be a weighted average, giving appropriate importance to each aspect of health. Higher scores represent excellent overall health status.',
    ),

  keyInsights: z
    .string()
    .max(200)
    .describe(
      "Provide concise, impactful insights based on the health evaluation. Highlight the most significant findings, whether positive aspects or areas needing improvement. For example: 'Your consistent exercise routine is boosting overall health, but there's room for improvement in sleep quality which may enhance mental well-being.'",
    ),

  actionableAdvice: z
    .string()
    .max(250)
    .describe(
      "Offer specific, practical advice tailored to the user's health situation. Address the most pressing improvement area or suggest ways to leverage their strongest health aspect. For example: 'To improve sleep quality, establish a consistent bedtime routine and aim for 7-9 hours of sleep. This can complement your strong exercise habits and potentially boost your mental health score.'",
    ),
});

export const HealthJsonSchema = zodToJsonSchema(
  healthOutputSchema,
  'healthOutputSchema',
);
