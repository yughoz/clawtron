import { Hono } from 'hono';
import { db, schema } from '../db';
import { eq } from 'drizzle-orm';

const webhook = new Hono();

// POST /webhook/waha - Receive messages from Waha
webhook.post('/waha', async (c) => {
  try {
    const body = await c.req.json();
    
    // Log incoming webhook
    const log = await db.insert(schema.webhookLogs).values({
      endpoint: '/webhook/waha',
      method: 'POST',
      payload: body,
      processed: false,
    }).returning();

    // Extract message data from Waha webhook
    const messageData = body.data || body;
    
    // Save message to database
    if (messageData.id && messageData.from) {
      await db.insert(schema.messages).values({
        waMessageId: messageData.id,
        waGroupId: messageData.from,
        senderId: messageData.sender?.id || messageData.author || 'unknown',
        senderName: messageData.sender?.name || messageData.pushName || null,
        content: messageData.body || messageData.content || null,
        messageType: messageData.type || 'text',
        timestamp: new Date(messageData.timestamp * 1000 || Date.now()),
        metadata: messageData,
      }).onConflictDoNothing();
    }

    // Mark as processed
    await db.update(schema.webhookLogs)
      .set({ processed: true, statusCode: 200 })
      .where(eq(schema.webhookLogs.id, log[0].id));

    return c.json({ success: true, message: 'Webhook received' });
  } catch (error: any) {
    console.error('Webhook error:', error);
    return c.json({ error: error.message }, 500);
  }
});

// GET /webhook/logs - View webhook logs
webhook.get('/logs', async (c) => {
  const logs = await db.select().from(schema.webhookLogs).limit(100);
  return c.json({ logs });
});

export default webhook;
