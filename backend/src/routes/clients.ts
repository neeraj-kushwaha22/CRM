import { Router } from 'express';
import { prisma } from '../db.js';
import { requireAuth } from '../utils/auth.js';

const router = Router();

router.use(requireAuth);

router.get('/', async (_req, res, next) => {
  try {
    const clients = await prisma.client.findMany({ include: { contacts: true, deals: true, payments: true } });
    res.json(clients);
  } catch (e) { next(e); }
});

router.post('/', async (req, res, next) => {
  try {
    const client = await prisma.client.create({ data: req.body });
    res.json(client);
  } catch (e) { next(e); }
});

router.get('/:id', async (req, res, next) => {
  try {
    const client = await prisma.client.findUnique({ where: { id: req.params.id }, include: { contacts: true, deals: true, payments: true, projects: true } });
    res.json(client);
  } catch (e) { next(e); }
});

router.put('/:id', async (req, res, next) => {
  try {
    const client = await prisma.client.update({ where: { id: req.params.id }, data: req.body });
    res.json(client);
  } catch (e) { next(e); }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await prisma.client.delete({ where: { id: req.params.id } });
    res.json({ ok: true });
  } catch (e) { next(e); }
});

export default router;
