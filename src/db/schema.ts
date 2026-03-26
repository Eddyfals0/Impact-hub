import { pgTable, serial, text, integer } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').unique().notNull(),
  avatar: text('avatar'),
  points: integer('points').default(0),
});

export const projects = pgTable('projects', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  goal: integer('goal').notNull(),
  raised: integer('raised').default(0),
  creatorId: integer('creator_id').references(() => users.id),
});
