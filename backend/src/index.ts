import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import authRoutes from './routes/auth.js';
import clientRoutes from './routes/clients.js';
import dealRoutes from './routes/deals.js';
import projectRoutes from './routes/projects.js';
import taskRoutes from './routes/tasks.js';
import paymentRoutes from './routes/payments.js';
import activityRoutes from './routes/activities.js';
import { errorHandler } from './utils/error.js';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(helmet());
app.use(cors({ origin: (process.env.CORS_ORIGIN?.split(',') || '*'), credentials: true } as any));
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (_req, res) => res.json({ ok: true, name: 'Sales-Tech-Sync CRM API' }));

app.use('/auth', authRoutes);
app.use('/clients', clientRoutes);
app.use('/deals', dealRoutes);
app.use('/projects', projectRoutes);
app.use('/tasks', taskRoutes);
app.use('/payments', paymentRoutes);
app.use('/activities', activityRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
