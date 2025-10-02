import { Router } from 'express';
import { prisma } from '../db.js';
import { requireAuth } from '../utils/auth.js';

const router = Router();
router.use(requireAuth);

router.get('/', async (_req, res, next) => {
  try { res.json(await prisma.task.findMany()); } catch (e) { next(e); }
});

router.post('/', async (req, res, next) => {
  try { res.json(await prisma.task.create({ data: req.body })); } catch (e) { next(e); }
});

router.put('/:id', async (req, res, next) => {
  try { res.json(await prisma.task.update({ where: { id: req.params.id }, data: req.body })); } catch (e) { next(e); }
});

router.delete('/:id', async (req, res, next) => {
  try { await prisma.task.delete({ where: { id: req.params.id } }); res.json({ ok: true }); } catch (e) { next(e); }
});

export default router;
