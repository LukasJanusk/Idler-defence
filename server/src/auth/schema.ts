import { z } from 'zod';

export const schema = z.object({
  user: z.object({
    id: z.string(),
  }),
  iat: z.number().optional(),
  exp: z.number().optional(),
});

export const parseTokenPayload = (data: unknown) => schema.parse(data);
export type TokenPayload = z.infer<typeof schema>;
