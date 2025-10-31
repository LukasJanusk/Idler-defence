import { createTestDatabase } from '@/tests/utils/createTestDatabase';
import { insertAll } from '@/tests/utils/records';
import { describe, it, expect, afterEach, beforeEach } from 'vitest';
import { useUserRepository } from '.';
import { omit } from 'lodash';

const db = createTestDatabase();
const repo = useUserRepository(db);

afterEach(() => {
  db.deleteFrom('game.user').execute();
});
beforeEach(() => {
  db.deleteFrom('game.user').execute();
});
describe('game.user', () => {
  it('createUser', async () => {
    const insertable = {
      name: 'test',
      email: 'test@mail.com',
      password: 'securepassword777%',
      date: '025-09-03T12:34:56.789Z',
    };
    const user = await repo.createUser(insertable);

    expect(user).toEqual({ id: expect.any(Number), email: insertable.email });
  });

  it('getUser', async () => {
    const [user] = await insertAll(db, 'game.user', [
      {
        name: 'test',
        email: 'test@mail.com',
        password: 'SecurePassword$$$777',
        date: '025-09-03T12:34:56.789Z',
      },
    ]);

    const returned = await repo.getUser(user.id);

    expect(returned).toEqual(omit(user, ['password']));
  });
});
