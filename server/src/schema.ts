import z from 'zod';

const scoreSchema = z.object({
  id: z.coerce.number().int(),
  score: z.coerce.number().int().min(1, 'Cannot submit scores below 1'),
  name: z.coerce.string('Must be a String'),
  date: z.coerce.string('Must be a string'),
  rank: z.coerce.number().int(),
});

const postScoreSchema = scoreSchema.omit({ rank: true, id: true });

const userSchema = z.object({
  id: z.coerce.number().int(),
  email: z.email('Must be a valid email'),
  name: z.coerce.string('Must be a String'),
  password: z.coerce
    .string('Must be a String')
    .min(8, 'Password must be at least 8 characters')
    .max(100, 'Password must be at most 100 characters'),
  date: z.coerce.string('Must be a string'),
});

export const scoreSchemaWithoutRank = scoreSchema.omit({ rank: true });
export const userInsertable = userSchema.omit({ id: true });

export const parsePostScoreSchema = (data: unknown) =>
  postScoreSchema.parse(data);
export const parseUserSchema = (data: unknown) => userSchema.parse(data);
export const parseUserInsertable = (data: unknown) =>
  userInsertable.parse(data);

export type PostScore = z.infer<typeof postScoreSchema>;
export type ScoreNoRank = z.infer<typeof scoreSchemaWithoutRank>;
export type Score = z.infer<typeof scoreSchema>;
export type User = z.infer<typeof userSchema>;
export type UserInsertable = z.infer<typeof userInsertable>;
