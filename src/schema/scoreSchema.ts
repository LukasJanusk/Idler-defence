import z from 'zod';

const scoreSchema = z.object({
  id: z.string(),
  rank: z.number(),
  score: z.number().int().min(1, 'Cannot submit scores of 0'),
  name: z
    .string()
    .min(1, 'Name must be at least 1 character')
    .max(20, 'Name must be 20 or less characters'),
  date: z.string(),
});

const highscores = z.array(scoreSchema);
const createScoreSchema = scoreSchema.omit({ id: true, rank: true });
export const parseCreateScore = (data: unknown) =>
  createScoreSchema.parse(data);
export const parseScore = (data: unknown) => scoreSchema.parse(data);
export const parseHighscores = (data: unknown) => highscores.parse(data);
export type Score = z.infer<typeof scoreSchema>;
export type CreateScore = z.infer<typeof createScoreSchema>;
export type Highscores = z.infer<typeof highscores>;
