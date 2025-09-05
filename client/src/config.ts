import z from 'zod';

const schema = z.object({
  env: z.enum(['development', 'production', 'test']).default('development'),
  apiUrl: z.url(),
});

const config = schema.parse({
  env: import.meta.env.MODE,
  apiUrl: import.meta.env.VITE_API_URL,
});

export default config;
