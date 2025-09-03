import type { Kysely } from 'kysely';

export async function up(db: Kysely<any>) {
  await db.schema.createSchema('game').ifNotExists().execute();
  await db.schema
    .createTable('game.score')
    .ifNotExists()
    .addColumn('id', 'integer', c => c.primaryKey().generatedAlwaysAsIdentity())
    .addColumn('name', 'text', c => c.notNull())
    .addColumn('score', 'integer', c => c.notNull())
    .addColumn('date', 'text', c => c.notNull())
    .execute();
}

export async function down(db: Kysely<any>) {
  await db.schema.dropTable('game.score').ifExists().execute();
  await db.schema.dropSchema('game').ifExists().execute();
}
