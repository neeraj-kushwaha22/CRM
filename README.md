# Sales‑Tech‑Sync CRM (Starter Kit)

A production‑grade **starter** CRM tailored for tracking **clients, payments, work (projects & tasks), and sales (deals)**. Built to be easy to run on Windows.

## Stack
- **Backend**: Node.js + Express + TypeScript + Prisma ORM + **SQLite** by default (works out‑of‑the‑box). Switchable to PostgreSQL.
- **Auth**: JWT (access & refresh), bcrypt password hashing, role‑based guards (ADMIN, MANAGER, AGENT, TECH).
- **Frontend**: React + Vite + TypeScript + TailwindCSS + React Router.
- **Features**: Clients, Contacts, Deals, Payments, Projects, Tasks, Activities, Users/Roles.
- **Quality**: Zod validation (ready to add), central error handler, CORS, request logging.

## Quick Start (Local)
1) Install **Node 20+**.
2) In one terminal:
   ```bash
   cd backend
   cp .env.example .env
   npm i
   npx prisma migrate dev --name init
   npm run seed
   npm run dev
   ```
   - Server runs at **http://localhost:4000**
3) In another terminal:
   ```bash
   cd frontend
   npm i
   npm run dev
   ```
   - Frontend runs at **http://localhost:5173**
4) Login with:
   - **Email**: admin@example.com
   - **Password**: admin123
