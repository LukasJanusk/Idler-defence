import z from 'zod';

const schema = z.object({
  port: z.coerce.number().default(4000),
  apiUrl: z.url(),
});

const config = schema.parse({
  apiUrl: import.meta.env.VITE_API_URL,
});

export default config;
