import initDatabase from "../src/config/seed";
import { prisma } from "../src/config/client";

(async () => {
  try {
    console.log('Deleting existing products...');
    await prisma.product.deleteMany();
    // reset auto increment for MySQL
    try {
      await prisma.$executeRawUnsafe(`ALTER TABLE products AUTO_INCREMENT = 1`);
    } catch (e) {
      // ignore if not MySQL or not allowed
    }

    console.log('Running seed...');
    await initDatabase();
    const cnt = await prisma.product.count();
    console.log(`Seed complete. Products count: ${cnt}`);
  } catch (err) {
    console.error('Seed error:', err);
  } finally {
    await prisma.$disconnect();
    process.exit(0);
  }
})();
