# WA Portal

WhatsApp Group Summary & Ticketing System

## Tech Stack

- **Runtime:** Bun
- **Framework:** Hono
- **Database:** PostgreSQL
- **ORM:** Drizzle
- **Frontend:** React + Tailwind (coming soon)

## Project Structure

```
wa-portal/
├── src/
│   ├── db/
│   │   ├── index.ts      # Database connection
│   │   └── schema.ts     # Drizzle schema
│   ├── routes/
│   │   ├── webhook.ts    # Waha webhook receiver
│   │   ├── summary.ts    # Summary endpoints
│   │   ├── ticket.ts     # Ticketing endpoints
│   │   └── settings.ts   # Settings endpoints
│   ├── services/         # Business logic
│   ├── utils/            # Helper functions
│   └── index.ts          # App entry point
├── drizzle.config.ts     # Drizzle config
├── package.json
└── .env.example
```

## Setup

### 1. Install Dependencies

```bash
bun install
```

### 2. Setup Environment

```bash
cp .env.example .env
# Edit .env with your credentials
```

### 3. Setup Database

```bash
# Generate migrations
bun run db:generate

# Push schema to database
bun run db:push
```

### 4. Run Server

```bash
# Development (with hot reload)
bun run dev

# Production
bun run start
```

## API Endpoints

### Health

- `GET /` - API info
- `GET /health` - Health check

### Webhook

- `POST /webhook/waha` - Receive messages from Waha
- `GET /webhook/logs` - View webhook logs

### Summary

- `GET /summary` - List summaries
- `GET /summary/:id` - Get summary
- `POST /summary` - Generate new summary

### Tickets

- `GET /tickets` - List tickets
- `GET /tickets/:id` - Get ticket
- `POST /tickets` - Create ticket
- `PATCH /tickets/:id` - Update ticket
- `DELETE /tickets/:id` - Delete ticket

### Settings

- `GET /settings` - List settings
- `GET /settings/:key` - Get setting
- `PUT /settings/:key` - Update/create setting
- `DELETE /settings/:key` - Delete setting

## Environment Variables

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string |
| `WA_GROUP_ID` | WhatsApp group ID |
| `OPENCLAW_API_URL` | OpenClaw API URL |
| `OPENCLAW_API_KEY` | OpenClaw API key |
| `VIKUNJA_URL` | Vikunja URL |
| `VIKUNJA_TOKEN` | Vikunja API token |
| `PORT` | Server port (default: 3000) |

## Phases

- [x] Phase 1: Setup Project & Database
- [ ] Phase 2: Backend - Webhook & Router
- [ ] Phase 3: Backend - Summary Service
- [ ] Phase 4: Backend - Ticketing Service
- [ ] Phase 5: Frontend - Settings Website

## License

MIT
