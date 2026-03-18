import { Hono } from 'hono';
import { db, schema } from '../db';
import { eq } from 'drizzle-orm';

const settings = new Hono();

// GET /settings - List all settings
settings.get('/', async (c) => {
  const result = await db.select().from(schema.settings);
  return c.json({ settings: result });
});

// GET /settings/:key - Get specific setting
settings.get('/:key', async (c) => {
  const key = c.req.param('key');
  const result = await db.select().from(schema.settings).where(eq(schema.settings.key, key));
  
  if (result.length === 0) {
    return c.json({ error: 'Setting not found' }, 404);
  }
  
  return c.json({ setting: result[0] });
});

// PUT /settings/:key - Update or create setting
settings.put('/:key', async (c) => {
  const key = c.req.param('key');
  const body = await c.req.json();
  
  // Upsert setting
  const existing = await db.select().from(schema.settings).where(eq(schema.settings.key, key));
  
  let result;
  if (existing.length > 0) {
    result = await db.update(schema.settings)
      .set({
        value: body.value,
        description: body.description || existing[0].description,
        updatedAt: new Date(),
      })
      .where(eq(schema.settings.key, key))
      .returning();
  } else {
    result = await db.insert(schema.settings).values({
      key,
      value: body.value,
      description: body.description || null,
    }).returning();
  }
  
  return c.json({ setting: result[0] });
});

// DELETE /settings/:key - Delete setting
settings.delete('/:key', async (c) => {
  const key = c.req.param('key');
  
  const result = await db.delete(schema.settings)
    .where(eq(schema.settings.key, key))
    .returning();
  
  if (result.length === 0) {
    return c.json({ error: 'Setting not found' }, 404);
  }
  
  return c.json({ success: true });
});

export default settings;
