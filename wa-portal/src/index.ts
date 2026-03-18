import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';

// Routes
import webhookRoutes from './routes/webhook';
import summaryRoutes from './routes/summary';
import ticketRoutes from './routes/ticket';
import settingsRoutes from './routes/settings';

const app = new Hono();

// Middleware
app.use('*', logger());
app.use('*', cors());

// Health check
app.get('/', (c) => {
  return c.json({
    name: 'WA Portal API',
    version: '1.0.0',
    status: 'running',
    timestamp: new Date().toISOString(),
  });
});

app.get('/health', (c) => {
  return c.json({ status: 'ok' });
});

// Routes
app.route('/webhook', webhookRoutes);
app.route('/summary', summaryRoutes);
app.route('/tickets', ticketRoutes);
app.route('/settings', settingsRoutes);

// 404 handler
app.notFound((c) => {
  return c.json({ error: 'Not Found' }, 404);
});

// Error handler
app.onError((err, c) => {
  console.error('Error:', err);
  return c.json({ error: 'Internal Server Error', message: err.message }, 500);
});

const port = Number(process.env.PORT) || 3000;

console.log(`🚀 WA Portal API running on port ${port}`);

export default {
  port,
  fetch: app.fetch,
};
