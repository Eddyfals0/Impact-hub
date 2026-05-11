import { pgTable, serial, text, integer, boolean, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').unique().notNull(),
  avatar: text('avatar'),
  passwordHash: text('password_hash'),
  authProvider: text('auth_provider').notNull().default('email'),
  googleSub: text('google_sub').unique(),
  role: text('role').notNull().default('donor'),
  country: text('country'),
  bio: text('bio'),
  isEmailVerified: boolean('is_email_verified').notNull().default(false),
  points: integer('points').default(0),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

export const projects = pgTable('projects', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  slug: text('slug').unique(),
  description: text('description').notNull(),
  category: text('category').notNull().default('general'),
  status: text('status').notNull().default('draft'),
  goal: integer('goal').notNull(),
  raised: integer('raised').default(0),
  coverImage: text('cover_image'),
  location: text('location'),
  beneficiaryName: text('beneficiary_name'),
  startDate: timestamp('start_date', { withTimezone: true }),
  endDate: timestamp('end_date', { withTimezone: true }),
  isFeatured: boolean('is_featured').notNull().default(false),
  creatorId: integer('creator_id').references(() => users.id),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

export const donations = pgTable('donations', {
  id: serial('id').primaryKey(),
  projectId: integer('project_id').references(() => projects.id).notNull(),
  userId: integer('user_id').references(() => users.id),
  amount: integer('amount').notNull(),
  donorName: text('donor_name').notNull(),
  donorEmail: text('donor_email').notNull(),
  isAnonymous: boolean('is_anonymous').notNull().default(false),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});
