import { z } from 'zod';
import zodToJsonSchema from 'zod-to-json-schema';

export const relationshipsOutputSchema = z.object({
  familyRelationshipsQuality: z
    .number()
    .min(0)
    .max(100)
    .describe(
      'Evaluate the quality of family relationships. Consider factors like communication, support, conflict resolution, and overall satisfaction. Higher scores indicate strong, positive family connections.',
    ),

  friendshipsQuality: z
    .number()
    .min(0)
    .max(100)
    .describe(
      'Assess the quality of friendships. Consider aspects such as mutual support, trust, shared experiences, and depth of connections. Higher scores suggest fulfilling and robust friendships.',
    ),

  romanticRelationshipsQuality: z
    .number()
    .min(0)
    .max(100)
    .describe(
      'Evaluate the quality of romantic relationships. Consider factors like communication, intimacy, mutual respect, and overall satisfaction. Higher scores indicate healthy, fulfilling romantic connections.',
    ),

  overallSatisfactionScore: z
    .number()
    .min(0)
    .max(10)
    .describe(
      "This score should directly reflect the overallSatisfaction from the RelationshipsDTO. It represents the user's subjective assessment of their relationships across all domains.",
    ),

  relationshipGoalsClarity: z
    .number()
    .min(0)
    .max(100)
    .describe(
      'Evaluate the clarity and feasibility of relationship goals. Consider how specific, measurable, achievable, relevant, and time-bound these goals are. Higher scores suggest well-defined, realistic relationship objectives.',
    ),

  socialNetworkStrength: z
    .number()
    .min(0)
    .max(100)
    .describe(
      "Assess the overall strength and diversity of the individual's social network. Consider factors like the size of the network, frequency of interactions, and variety of relationships. Higher scores indicate a robust, supportive social network.",
    ),

  emotionalSupportScore: z
    .number()
    .min(0)
    .max(100)
    .describe(
      'Evaluate the level of emotional support received and provided across all relationships. Consider factors like empathy, availability during tough times, and mutual understanding. Higher scores suggest strong emotional bonds and support systems.',
    ),

  overallRelationshipHealth: z
    .number()
    .min(0)
    .max(100)
    .describe(
      'Calculate an overall relationship health score based on all other metrics. This should be a weighted average, giving appropriate importance to each aspect of relationships. Higher scores represent excellent overall relationship health.',
    ),

  keyInsight: z
    .string()
    .max(200)
    .describe(
      "Offer a concise, impactful insight based on the relationship analysis. This should highlight the most significant finding, whether positive or an area for improvement. For example: 'Your strong friendships provide a solid foundation for your social well-being, but there's room to enhance family relationships for a more balanced social life.'",
    ),

  actionableAdvice: z
    .string()
    .max(250)
    .describe(
      "Provide specific, practical advice tailored to the user's relationship situation. This should address the most pressing improvement area or leverage their strongest relationship aspect. For example: 'To strengthen family relationships, consider scheduling regular family activities or check-ins. This can help improve communication and connection, complementing the strong support you already receive from friendships.'",
    ),
});

export const RelationshipsJsonSchema = zodToJsonSchema(
  relationshipsOutputSchema,
  'relationshipsOutputSchema',
);
