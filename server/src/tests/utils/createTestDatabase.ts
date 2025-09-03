import { createDatabase } from '@/database';
import config from '@/config';

export const createTestDatabase = () => {
  if (config.env !== 'test') {
    throw new Error('Must run in test enviroment');
  }
  const db = createDatabase(config.database);
  return db;
};
