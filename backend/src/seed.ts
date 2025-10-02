import { prisma } from './db.js';
import bcrypt from 'bcryptjs';

async function main() {
  const adminPass = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: { name: 'Admin', email: 'admin@example.com', password: adminPass, role: 'ADMIN' }
  });

  const client = await prisma.client.create({
    data: {
      name: 'Acme Corp',
      industry: 'Manufacturing',
      email: 'info@acme.test',
      phone: '+91 9876543210',
      address: 'Ahmedabad, Gujarat',
      notes: 'Priority client',
      ownerId: admin.id,
      contacts: { create: [{ name: 'Manish Patel', email: 'manish@acme.test', phone: '98765 43210' }] },
      deals: { create: [{ title: 'Annual AMC', value: 250000, stage: 'PROPOSAL' }] },
      payments: { create: [{ amount: 50000, status: 'PARTIAL', method: 'NEFT', notes: 'Advance' }] },
      projects: { create: [{ name: 'LT Panel Upgrade', status: 'ACTIVE', notes: 'Site: Gandhinagar' }] },
    }
  });

  await prisma.task.create({
    data: { title: 'Site survey', status: 'IN_PROGRESS', clientId: client.id, notes: 'Visit on Friday' }
  });

  await prisma.activity.create({
    data: { type: 'CALL', summary: 'Spoke with procurement re: AMC scope', userId: admin.id, clientId: client.id }
  });

  console.log('Seed complete. Admin: admin@example.com / admin123');
}

main().finally(() => prisma.$disconnect());
