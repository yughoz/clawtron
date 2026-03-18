import { Hono } from 'hono';
import { db, schema } from '../db';
import { eq, desc } from 'drizzle-orm';

const ticket = new Hono();

// GET /tickets - List all tickets
ticket.get('/', async (c) => {
  const status = c.req.query('status');
  const groupId = c.req.query('groupId');
  
  let query = db.select().from(schema.tickets).orderBy(desc(schema.tickets.createdAt));
  
  if (status) {
    query = db.select().from(schema.tickets)
      .where(eq(schema.tickets.status, status))
      .orderBy(desc(schema.tickets.createdAt));
  }
  
  if (groupId) {
    query = db.select().from(schema.tickets)
      .where(eq(schema.tickets.waGroupId, groupId))
      .orderBy(desc(schema.tickets.createdAt));
  }
  
  const tickets = await query.limit(50);
  return c.json({ tickets });
});

// GET /tickets/:id - Get specific ticket
ticket.get('/:id', async (c) => {
  const id = Number(c.req.param('id'));
  const result = await db.select().from(schema.tickets).where(eq(schema.tickets.id, id));
  
  if (result.length === 0) {
    return c.json({ error: 'Ticket not found' }, 404);
  }
  
  return c.json({ ticket: result[0] });
});

// POST /tickets - Create new ticket
ticket.post('/', async (c) => {
  const body = await c.req.json();
  
  const result = await db.insert(schema.tickets).values({
    waGroupId: body.waGroupId,
    summaryId: body.summaryId || null,
    title: body.title,
    description: body.description || null,
    status: body.status || 'open',
    priority: body.priority || 'normal',
    assignee: body.assignee || null,
    labels: body.labels || [],
  }).returning();
  
  return c.json({ ticket: result[0] }, 201);
});

// PATCH /tickets/:id - Update ticket
ticket.patch('/:id', async (c) => {
  const id = Number(c.req.param('id'));
  const body = await c.req.json();
  
  const result = await db.update(schema.tickets)
    .set({
      ...body,
      updatedAt: new Date(),
    })
    .where(eq(schema.tickets.id, id))
    .returning();
  
  if (result.length === 0) {
    return c.json({ error: 'Ticket not found' }, 404);
  }
  
  return c.json({ ticket: result[0] });
});

// DELETE /tickets/:id - Delete ticket
ticket.delete('/:id', async (c) => {
  const id = Number(c.req.param('id'));
  
  const result = await db.delete(schema.tickets)
    .where(eq(schema.tickets.id, id))
    .returning();
  
  if (result.length === 0) {
    return c.json({ error: 'Ticket not found' }, 404);
  }
  
  return c.json({ success: true });
});

export default ticket;
