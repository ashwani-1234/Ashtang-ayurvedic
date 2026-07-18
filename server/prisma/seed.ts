import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding Ashtang Ayurved database...');

  // 1. Create default doctor (Without forcing ID #1!)
  const existingDoctor = await prisma.doctor.findFirst({
    where: { name: 'Dr. Brahma Prakash Maurya' }
  });

  if (!existingDoctor) {
    await prisma.doctor.create({
      data: {
        name: 'Dr. Brahma Prakash Maurya',
        specialty: 'BAMS, Panchkarma Specialist',
        bio: 'Offering world-class Ayurvedic procedures in Sitapur with 3+ years of clinical experience.',
        phone: '+918052899698',
      },
    });
  }

  // 2. Create core services
  const services = [
    { name: 'Agni Karma', durationMinutes: 30, description: 'Thermal micro-cautery for muscular and joint pain relief.' },
    { name: 'Panchkarma', durationMinutes: 60, description: 'Five-fold detoxification to restore body balance.' },
    { name: 'Leech Therapy', durationMinutes: 45, description: 'Natural blood purification for skin and varicose veins.' },
  ];

  for (const s of services) {
    await prisma.service.upsert({
      where: { name: s.name },
      update: {},
      create: s,
    });
  }

  // 3. Create default review (Without forcing ID #1 to protect PostgreSQL sequence!)
  const existingReview = await prisma.review.findFirst({
    where: { name: 'Amit Sharma, Sitapur' }
  });

  if (!existingReview) {
    await prisma.review.create({
      data: {
        name: 'Amit Sharma, Sitapur',
        text: 'The Agni Karma treatment for my joint pain was miraculous. Highly recommend Ashtang Ayurved!',
        stars: 5,
      },
    });
  }

  console.log('✅ Seeding complete! PostgreSQL sequence counters are synchronized.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });