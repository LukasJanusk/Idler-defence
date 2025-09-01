import 'dotenv/config';
import { env } from 'process';
import z from 'zod';

const schema = z.object({
  env: z.enum(['development', 'production', 'test']).default('development'),
  port: z.coerce.number().default(4000),
  database: z.object({
    connectionString: z.url('Invalid url'),
  }),
});

const config = schema.parse({
  env: env.NODE_ENV,
  port: env.PORT,
  database: { connectionString: env.DATABASE_URL },
});

export default config;
