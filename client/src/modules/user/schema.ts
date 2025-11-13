import z from 'zod';

const userSchema = z.object({
  id: z.coerce.string(),
  username: z.coerce.string(),
  email: z.email(),
});

const loginSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(8, 'Must be at least 8 characters long')
    .max(100, 'Must be shorter than 100 characters'),
});

const singupSchema = loginSchema.extend({
  username: z.string(),
});

export type Token = string;
export type LoginData = z.infer<typeof loginSchema>;
export type User = z.infer<typeof userSchema>;
export type SignupData = z.infer<typeof singupSchema>;

export const parseLoginData = (data: unknown) => loginSchema.parse(data);
export const parseUser = (data: unknown) => userSchema.parse(data);
export const parseSignupData = (data: unknown) => singupSchema.parse(data);
