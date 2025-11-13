import request from 'supertest';
import createApp from '@/app';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { createTestDatabase } from '@/tests/utils/createTestDatabase';
import { insertAll } from '@/tests/utils/records';
import { omit } from 'lodash';

const db = createTestDatabase();
const app = createApp(db);
afterEach(() => {
  db.deleteFrom('game.user').execute();
});
beforeEach(() => {
  db.deleteFrom('game.user').execute();
});
describe('userController', () => {
  it('should create a user', async () => {
    const response = await request(app).post('/api/user').send({
      name: 'testUser',
      password: 'SecurePassword$$$777',
      email: 'testUser@mail.com',
    });
    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      id: expect.any(Number),
      email: 'testUser@mail.com',
      username: 'testUser',
    });
  });

  it('should return user data', async () => {
    const [testUser] = await insertAll(db, 'game.user', [
      {
        name: 'testUser',
        password: 'SecurePassword$$$777',
        email: 'testUser@mail.com',
        date: new Date().toISOString(),
      },
    ]);

    const response = await request(app).get(`/api/user/${testUser.id}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(omit(testUser, ['password', 'date']));
  });
  it('should throw error for invalid user data', async () => {
    const response = await request(app)
      .post('/api/user')
      .send({ id: 123, email: 'slow', name: 'testUser' });

    expect(response.status).toBe(400);
    expect(response.body).toMatch(/must be a valid email/i);
  });
  it('should throw error when no user found', async () => {
    const response = await request(app).get('/api/user/99999');
    expect(response.status).toBe(404);
    expect(response.body.error).toMatch(/user not found/i);
  });
});
