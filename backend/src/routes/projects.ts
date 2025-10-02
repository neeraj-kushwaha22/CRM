import { Router } from 'express';
import { prisma } from '../db.js';
import { requireAuth } from '../utils/auth.js';

const router = Router();
router.use(requireAuth);

router.get('/', async (_req, res, next) => {
  try { res.json(await prisma.project.findMany({ include: { tasks: true } })); } catch (e) { next(e); }
});

router.post('/', async (req, res, next) => {
  try { res.json(await prisma.project.create({ data: req.body })); } catch (e) { next(e); }
});

router.put('/:id', async (req, res, next) => {
  try { res.json(await prisma.project.update({ where: { id: req.params.id }, data: req.body })); } catch (e) { next(e); }
});

router.delete('/:id', async (req, res, next) => {
  try { await prisma.project.delete({ where: { id: req.params.id } }); res.json({ ok: true }); } catch (e) { next(e); }
});

export default router;
