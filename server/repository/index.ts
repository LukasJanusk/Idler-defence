import { type Selectable, sql } from 'kysely';
import { createDatabase, type Database } from '../database/index.ts';
import type { PostScore, Score, ScoreNoRank } from '../schema.ts';
import config from '../config.ts';

const db = createDatabase(config.database);

export function scoreRepository(db: Database) {
  const createScore = async (values: PostScore): Promise<ScoreNoRank> => {
    return db
      .insertInto('game.score')
      .values(values)
      .returningAll()
      .executeTakeFirstOrThrow();
  };

  const getScoresAround = async (
    id: number,
    targetScore: number,
    range = 5,
  ): Promise<Selectable<Score>[]> => {
    const ranked = db
      .selectFrom('game.score')
      .selectAll()
      .select(sql<number>`ROW_NUMBER() OVER (ORDER BY score DESC)`.as('rank'))
      .as('ranked');

    const target = await db
      .selectFrom(ranked)
      .select('rank')
      .where('score', '=', targetScore)
      .where('id', '=', id)
      .executeTakeFirst();

    if (!target) throw new Error('Unable to get highscores.');

    const targetRank = target.rank;

    return db
      .selectFrom(ranked)
      .selectAll()
      .where('rank', '>=', targetRank - range)
      .where('rank', '<=', targetRank + range)
      .orderBy('rank')
      .execute();
  };

  return { createScore, getScoresAround };
}

export const repo = scoreRepository(db);
