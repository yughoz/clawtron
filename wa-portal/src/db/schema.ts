import { pgTable, serial, text, timestamp, jsonb, boolean, integer } from 'drizzle-orm/pg-core';

// WA Group Messages
export const messages = pgTable('messages', {
  id: serial('id').primaryKey(),
  waMessageId: text('wa_message_id').notNull().unique(),
  waGroupId: text('wa_group_id').notNull(),
  senderId: text('sender_id').notNull(),
  senderName: text('sender_name'),
  content: text('content'),
  messageType: text('message_type').default('text'), // text, image, video, etc
  timestamp: timestamp('timestamp').notNull(),
  metadata: jsonb('metadata'), // additional WA message data
  createdAt: timestamp('created_at').defaultNow(),
});

// AI Summaries
export const summaries = pgTable('summaries', {
  id: serial('id').primaryKey(),
  waGroupId: text('wa_group_id').notNull(),
  periodStart: timestamp('period_start').notNull(),
  periodEnd: timestamp('period_end').notNull(),
  summary: text('summary').notNull(),
  keyPoints: jsonb('key_points').$type<string[]>(),
  participants: jsonb('participants').$type<string[]>(),
  messageCount: integer('message_count').default(0),
  generatedAt: timestamp('generated_at').defaultNow(),
  createdAt: timestamp('created_at').defaultNow(),
});

// Settings
export const settings = pgTable('settings', {
  id: serial('id').primaryKey(),
  key: text('key').notNull().unique(),
  value: jsonb('value').notNull(),
  description: text('description'),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Tickets (for ticketing service)
export const tickets = pgTable('tickets', {
  id: serial('id').primaryKey(),
  waGroupId: text('wa_group_id').notNull(),
  summaryId: integer('summary_id').references(() => summaries.id),
  title: text('title').notNull(),
  description: text('description'),
  status: text('status').default('open'), // open, in_progress, resolved, closed
  priority: text('priority').default('normal'), // low, normal, high, urgent
  assignee: text('assignee'),
  labels: jsonb('labels').$type<string[]>(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Webhook Logs
export const webhookLogs = pgTable('webhook_logs', {
  id: serial('id').primaryKey(),
  endpoint: text('endpoint').notNull(),
  method: text('method').notNull(),
  payload: jsonb('payload'),
  response: jsonb('response'),
  statusCode: integer('status_code'),
  processed: boolean('processed').default(false),
  createdAt: timestamp('created_at').defaultNow(),
});

// Types
export type Message = typeof messages.$inferSelect;
export type NewMessage = typeof messages.$inferInsert;
export type Summary = typeof summaries.$inferSelect;
export type NewSummary = typeof summaries.$inferInsert;
export type Setting = typeof settings.$inferSelect;
export type Ticket = typeof tickets.$inferSelect;
export type NewTicket = typeof tickets.$inferInsert;
export type WebhookLog = typeof webhookLogs.$inferSelect;
