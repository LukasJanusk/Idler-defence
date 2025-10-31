import type { Kysely } from 'kysely';

export async function up(db: Kysely<any>) {
  await db.schema
    .createTable('game.user')
    .ifNotExists()
    .addColumn('id', 'integer', c => c.primaryKey().generatedAlwaysAsIdentity())
    .addColumn('email', 'text', c => c.notNull().unique())
    .addColumn('name', 'text', c => c.notNull())
    .addColumn('password', 'text', c => c.notNull())
    .addColumn('date', 'text', c => c.notNull())
    .execute();
}

export async function down(db: Kysely<any>) {
  await db.schema.dropTable('game.user').ifExists().execute();
}
