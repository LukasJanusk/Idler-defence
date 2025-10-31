import { createTestDatabase } from '@/tests/utils/createTestDatabase';
import { insertAll } from '@/tests/utils/records';
import { describe, it, expect, afterEach, beforeEach } from 'vitest';
import { useScoreRepository } from '.';

const db = createTestDatabase();
const repo = useScoreRepository(db);

afterEach(() => {
  db.deleteFrom('game.score').execute();
});
beforeEach(() => {
  db.deleteFrom('game.score').execute();
});
describe('game.score', () => {
  it('createScore', async () => {
    const insertable = {
      name: 'test',
      score: 24,
      date: '025-09-03T12:34:56.789Z',
    };
    const score = await repo.createScore(insertable);

    expect(score).toEqual({ id: expect.any(Number), ...insertable });
  });

  it('getAllScores', async () => {
    const [score] = await insertAll(db, 'game.score', [
      { score: 123, name: 'test', date: '025-09-03T12:34:56.789Z' },
    ]);

    const returned = await repo.getAllScores();

    expect(returned).toHaveLength(1);
    expect(returned[0]).toEqual({ ...score, id: expect.any(Number) });
  });

  it('getScoresAround', async () => {
    const [score1, score2, score3] = await insertAll(db, 'game.score', [
      { score: 123, name: 'test1', date: '025-09-03T12:34:56.789Z' },
      { score: 223, name: 'test2', date: '025-09-03T12:34:56.789Z' },
      { score: 323, name: 'test3', date: '025-09-03T12:34:56.789Z' },
    ]);

    const returned = await repo.getScoresAround(score2.id, 223);

    expect(returned).toHaveLength(3);
    expect(returned[0]).toEqual({ ...score3, rank: 1, id: expect.any(Number) });
    expect(returned[2]).toEqual({ ...score1, rank: 3, id: expect.any(Number) });
  });
});
