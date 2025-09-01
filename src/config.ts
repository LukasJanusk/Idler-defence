import 'dotenv/config';
import { env } from 'process';

import z from 'zod';

const schema = z.object({
  env: z.enum(['development', 'production', 'test']).default('development'),
  port: z.coerce.number().default(4000),
  apiUrl: z.url(),
});

const config = schema.parse({
  env: env.NODE_ENV,
  port: env.PORT,
  apiUrl: env.VITE_API_URL,
});

export default config;
