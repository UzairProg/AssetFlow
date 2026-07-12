const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const adminEmail = 'admin@assetflow.com';
  const existing = await prisma.user.findUnique({
    where: { email: adminEmail }
  });

  if (existing) {
    console.log('Seed: Admin user already exists. Skipping seed.');
    return;
  }

  const hashedPassword = await bcrypt.hash('adminpassword', 10);
  const admin = await prisma.user.create({
    data: {
      name: 'System Admin',
      email: adminEmail,
      password: hashedPassword,
      role: 'ADMIN',
      status: 'ACTIVE'
    }
  });

  console.log('Seed: Default admin created successfully:', admin.email);
}

main()
  .catch((e) => {
    console.error('Seed: Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
