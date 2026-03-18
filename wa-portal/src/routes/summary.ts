import { Hono } from 'hono';
import { db, schema } from '../db';
import { eq, desc, and, gte, lte } from 'drizzle-orm';

const summary = new Hono();

// GET /summary - List all summaries
summary.get('/', async (c) => {
  const groupId = c.req.query('groupId');
  
  let query = db.select().from(schema.summaries).orderBy(desc(schema.summaries.createdAt));
  
  if (groupId) {
    query = db.select().from(schema.summaries)
      .where(eq(schema.summaries.waGroupId, groupId))
      .orderBy(desc(schema.summaries.createdAt));
  }
  
  const summaries = await query.limit(50);
  return c.json({ summaries });
});

// GET /summary/:id - Get specific summary
summary.get('/:id', async (c) => {
  const id = Number(c.req.param('id'));
  const result = await db.select().from(schema.summaries).where(eq(schema.summaries.id, id));
  
  if (result.length === 0) {
    return c.json({ error: 'Summary not found' }, 404);
  }
  
  return c.json({ summary: result[0] });
});

// POST /summary - Generate new summary
summary.post('/', async (c) => {
  const body = await c.req.json();
  const { waGroupId, periodStart, periodEnd } = body;
  
  // Get messages in the period
  const messages = await db.select().from(schema.messages)
    .where(and(
      eq(schema.messages.waGroupId, waGroupId),
      gte(schema.messages.timestamp, new Date(periodStart)),
      lte(schema.messages.timestamp, new Date(periodEnd))
    ));
  
  // TODO: Call AI service to generate summary
  // For now, return placeholder
  const summaryText = `Summary of ${messages.length} messages from ${periodStart} to ${periodEnd}`;
  
  const result = await db.insert(schema.summaries).values({
    waGroupId,
    periodStart: new Date(periodStart),
    periodEnd: new Date(periodEnd),
    summary: summaryText,
    messageCount: messages.length,
    participants: [...new Set(messages.map(m => m.senderName || m.senderId))],
  }).returning();
  
  return c.json({ summary: result[0] });
});

export default summary;
