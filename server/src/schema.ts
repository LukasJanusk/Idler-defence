import z from 'zod';

const scoreSchema = z.object({
  id: z.coerce.number().int(),
  score: z.coerce.number().int().min(1, 'Cannot submit scores below 1'),
  name: z.coerce.string('Must be a String'),
  date: z.coerce.string('Must be a string'),
  rank: z.coerce.number().int(),
});

const postScoreSchema = scoreSchema.omit({ rank: true, id: true });
export const scoreSchemaWithoutRank = scoreSchema.omit({ rank: true });
export const parsePostScoreSchema = (data: unknown) =>
  postScoreSchema.parse(data);

export type PostScore = z.infer<typeof postScoreSchema>;
export type ScoreNoRank = z.infer<typeof scoreSchemaWithoutRank>;
export type Score = z.infer<typeof scoreSchema>;
