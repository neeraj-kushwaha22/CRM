# Deploying Sales‑Tech‑Sync CRM (Step‑by‑Step)

This guide deploys **backend on Render** and **frontend on Vercel**, both free tiers.

---
## 0) Push to GitHub
Create two repos (or one monorepo with subfolders). Easiest is two repos:
- `sts-crm-backend`  → contents of `/backend`
- `sts-crm-frontend` → contents of `/frontend`

---
## 1) Backend on Render (with free PostgreSQL)
1. Go to https://render.com → **New** → **Blueprint** → select the backend repo.
   - Render will auto-detect `backend/render.yaml` and create:
     - A **Web Service** (Node)
     - A **PostgreSQL database** (free plan)
2. On the service page, check the settings:
   - **Build Command**: `npm install && npx prisma migrate deploy && npm run build`
   - **Start Command**: `npm run start`
   - **Environment Variables**: `DATABASE_URL` auto-wired to the database; JWT secrets auto-generated.
   - **CORS_ORIGIN**: Set later to your frontend URL (e.g., `https://your-frontend.vercel.app`).
3. After deploy, if seed data is missing, open **Shell** → run:
   ```bash
   node dist/seed.js
   ```

Your backend base URL will look like: `https://sts-crm-backend.onrender.com`

---
## 2) Frontend on Vercel
1. Go to https://vercel.com → **New Project** → import your `frontend` repo.
2. Set **Environment Variables**:
   - Key: `VITE_API_URL`
   - Value: `https://sts-crm-backend.onrender.com`  (replace with your actual Render URL)
3. Build settings:
   - Build command: `npm run build`
   - Output dir: `dist`
4. Deploy. You’ll get a URL like `https://sales-tech-sync-crm.vercel.app`

---
## 3) Fix CORS on Backend
On Render, set env var **CORS_ORIGIN** to include the Vercel URL you just got, e.g.:
```
CORS_ORIGIN=https://sales-tech-sync-crm.vercel.app,http://localhost:5173
```
Re-deploy the backend.

---
## 4) Login & Invite Team
- Visit your Vercel URL → Login with `admin@example.com / admin123` (from seed).
- Create users via API:
  - Temporarily call `POST /auth/register` from a tool like Postman with new emails/passwords and roles.
  - Or add a simple "Create User" admin page later.

---
## 5) Optional: Custom Domain (GoDaddy)
### Frontend (Vercel)
- In Vercel → Project → **Domains** → Add domain (e.g., `crm.yourdomain.com`). Follow Vercel prompts to add a CNAME in GoDaddy DNS.

### Backend (Render)
- In Render → Service → **Custom Domains** → Add `api.yourdomain.com`. Add the given A/CNAME records in GoDaddy.
- Update `VITE_API_URL` on Vercel and `CORS_ORIGIN` on Render to use the new domains.

---
## 6) Production Database Notes
- PostgreSQL is provisioned on Render via `render.yaml`. Prisma uses `DATABASE_URL` automatically.
- For backups, use Render’s PG backup tools or an external managed provider.

---
## 7) Troubleshooting
- **CORS error**: Ensure backend **CORS_ORIGIN** includes your exact frontend origin (https, no trailing slash). Re-deploy backend.
- **Unauthorized (401)**: Token expired; log in again.
- **Prisma errors**: Ensure `npx prisma migrate deploy` ran on build; check service logs.
- **Seeding didn’t run**: Shell into the service and run `node dist/seed.js` once.

---
## 8) Local Development continues to work
- Frontend: `npm run dev` → http://localhost:5173
- Backend: `npm run dev` → http://localhost:4000
- Ensure `frontend/.env` contains `VITE_API_URL=http://localhost:4000`
