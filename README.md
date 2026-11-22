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

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

```bash
cp .env.example .env
```

### 3. Start PostgreSQL

```bash
docker compose up -d db
```

### 4. Generate Prisma client

```bash
npm run prisma:generate
```

### 5. Run in development

```bash
npm run start:dev
```

- API: `http://localhost:3000/api`
- Swagger: `http://localhost:3000/docs`

## Scripts

```bash
npm run start:dev
npm run build
npm run test
npm run lint
npm run prisma:migrate
npm run prisma:studio
```

## Docker

```bash
docker compose up --build
```
