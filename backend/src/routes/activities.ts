import { Router } from 'express';
import { prisma } from '../db.js';
import { requireAuth } from '../utils/auth.js';

const router = Router();
router.use(requireAuth);

router.get('/', async (_req, res, next) => {
  try { res.json(await prisma.activity.findMany({ orderBy: { createdAt: 'desc' } })); } catch (e) { next(e); }
});

router.post('/', async (req, res, next) => {
  try { res.json(await prisma.activity.create({ data: req.body })); } catch (e) { next(e); }
});

export default router;
