import 'dotenv/config';
import { env } from 'process';
import z from 'zod';

const isTest = env.NODE_ENV === 'test';

const schema = z.object({
  env: z.enum(['development', 'production', 'test']).default('development'),
  port: z.coerce.number().default(4000),
  database: z.object({
    connectionString: z.url('Invalid url'),
  }),
  auth: z.object({
    passwordCost: z.number(),
    tokenKey: z.string(),
  }),
});

const config = schema.parse({
  env: env.NODE_ENV,
  port: env.PORT,
  database: { connectionString: isTest ? env.TEST_DATABASE : env.DATABASE_URL },
  auth: {
    passwordCost: 10,
    tokenKey: env.TOKEN_KEY,
  },
});

export default config;
