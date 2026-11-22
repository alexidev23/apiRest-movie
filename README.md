# Tournament API

REST API for managing football tournaments. Project initialized with the agreed stack; domain features will be implemented step by step.

## Stack

- **NestJS + TypeScript** (strict)
- **PostgreSQL + Prisma**
- **class-validator + class-transformer**
- **JWT + Passport** (prepared for admin/organizer auth)
- **Swagger/OpenAPI**
- **Jest**
- **Docker + Docker Compose**
- **pnpm** (package manager)

## Requirements

- **Node.js** `>=20.19.0`
- **pnpm** `>=9.0.0`

This project uses **pnpm** exclusively. The exact version is pinned in `package.json` (`packageManager`), so with Corepack enabled the correct pnpm is used automatically:

```bash
corepack enable
```

## Getting Started

### 1. Install dependencies

```bash
pnpm install
```

### 2. Configure environment

```bash
cp .env.example .env
```

| Variable         | Required        | Default       | Description                          |
| ---------------- | --------------- | ------------- | ------------------------------------ |
| `DATABASE_URL`   | yes             | –             | PostgreSQL connection string         |
| `JWT_SECRET`     | yes (min 8)     | –             | Secret used to sign JWTs             |
| `JWT_EXPIRES_IN` | no              | `1d`          | JWT lifetime                         |
| `PORT`           | no              | `3000`        | HTTP port                            |
| `NODE_ENV`       | no              | `development` | `development`, `production`, `test`  |
| `ADMIN_EMAIL`    | no              | –             | Bootstrap admin email                |
| `ADMIN_PASSWORD` | no              | –             | Bootstrap admin password             |

Variables are validated on startup: the app fails fast with a readable message when a required value is missing or invalid.

### 3. Start PostgreSQL

```bash
docker compose up -d db
```

### 4. Generate Prisma client

```bash
pnpm prisma:generate
```

### 5. Run in development

```bash
pnpm start:dev
```

- API: `http://localhost:3000/api`
- Health: `http://localhost:3000/health`
- Swagger: `http://localhost:3000/docs`

## Scripts

```bash
pnpm start:dev        # Start in watch mode
pnpm build            # Build production bundle
pnpm start:prod       # Run compiled app
pnpm test             # Run unit tests
pnpm test:e2e         # Run e2e tests
pnpm lint             # Lint and fix
pnpm format           # Format with Prettier
pnpm prisma:generate  # Generate Prisma client
pnpm prisma:migrate   # Create/apply dev migration
pnpm prisma:studio    # Open Prisma Studio
```

## Docker

Build and run the API together with PostgreSQL:

```bash
docker compose up --build
```

The `api` container waits for PostgreSQL to be healthy, applies pending Prisma migrations, and then starts the server.

- API: `http://localhost:3000/api`
- Health: `http://localhost:3000/health`
- Swagger: `http://localhost:3000/docs`

Environment values are read from `.env` when present; otherwise local development defaults are used.
