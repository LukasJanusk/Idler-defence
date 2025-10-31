import { type Selectable, sql } from 'kysely';
import { type Database } from '../database/index';
import type {
  PostScore,
  Score,
  ScoreNoRank,
  UserInsertable,
  UserReturnable,
} from '../schema';

export function scoreRepository(db: Database) {
  const createScore = async (values: PostScore): Promise<ScoreNoRank> => {
    return db
      .insertInto('game.score')
      .values(values)
      .returningAll()
      .executeTakeFirstOrThrow();
  };
  const getAllScores = async (): Promise<Selectable<ScoreNoRank>[]> => {
    return db
      .selectFrom('game.score')
      .selectAll()
      .select(
        sql<number>`CAST(ROW_NUMBER() OVER (ORDER BY score DESC) AS INTEGER)`.as(
          'rank'
        )
      )
      .orderBy('rank', 'asc')
      .execute();
  };

  const getScoresAround = async (
    id: number,
    targetScore: number,
    range = 5
  ): Promise<Selectable<Score>[]> => {
    const ranked = db
      .selectFrom('game.score')
      .selectAll()
      .select(
        sql<number>`CAST(ROW_NUMBER() OVER (ORDER BY score DESC) AS INTEGER)`.as(
          'rank'
        )
      )
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

  return { createScore, getScoresAround, getAllScores };
}

function userRepository(db: Database) {
  const getUser = async (id: number): Promise<Selectable<UserReturnable>> => {
    return db
      .selectFrom('game.user')
      .select([
        'game.user.id',
        'game.user.date',
        'game.user.email',
        'game.user.name',
      ])
      .where('game.user.id', '=', id)
      .executeTakeFirstOrThrow();
  };

  const createUser = async (user: UserInsertable) => {
    return db
      .insertInto('game.user')
      .values({ ...user, date: new Date().toISOString() })
      .returning(['game.user.id', 'game.user.email'])
      .executeTakeFirstOrThrow();
  };

  return { getUser, createUser };
}

export const useScoreRepository = (db: Database) => scoreRepository(db);
export const useUserRepository = (db: Database) => userRepository(db);
