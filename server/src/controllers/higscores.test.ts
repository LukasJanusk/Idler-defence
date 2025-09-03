import request from 'supertest';
import createApp from '@/app';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { createTestDatabase } from '@/tests/utils/createTestDatabase';

const db = createTestDatabase();
const app = createApp(db);
afterEach(() => {
  db.deleteFrom('game.score').execute();
});
beforeEach(() => {
  db.deleteFrom('game.score').execute();
});
describe('ScoreController', () => {
  it.skip('should create a score', async () => {
    const response = await request(app)
      .post('/api/highscores')
      .send({ name: 'Alice', score: 100, date: new Date().toISOString() });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe('Alice');
    expect(response.body.score).toBe(100);
  });
  it('should get all scores', async () => {
    const response = await request(app).get('/api/highscores');
    expect(response.status).toBe(201);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should throw when invalid data is passed for creating score', async () => {
    const response = await request(app)
      .post('/api/highscores')
      .send({ id: 123, dance: 'slow' });
    expect(response.status).toBe(400);
    expect(response.body).toMatch(/Invalid input/i);
  });
});
