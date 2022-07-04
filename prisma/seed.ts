import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function seed() {
  const email = 'kaylee@drakenfruit.com';

  // cleanup the existing database
  await prisma.user.delete({ where: { email } }).catch(() => {
    // no worries if it doesn't exist yet
  });

  const hashedPassword = await bcrypt.hash('kayleeiscool', 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });

  await prisma.item.create({
    data: {
      name: 'Tim de Turtle',
      description:
        'Verandert de kinderkamer in een prachtige zonsondergang met vogels die door de hele kamer vliegen, terwijl je luistert naar ontspannende Afrikaanse geluiden.',
      userId: user.id,
      amount: 100,
      tags: ['speelgoed'],
      imageUrl:
        'https://www.zazu-kids.com/wp-content/uploads/2022/03/TIM-Product-shot-Projection-2400x1875-1-2048x1600.jpg',
    },
  });

  await prisma.item.create({
    data: {
      name: 'Baby Yoda romper',
      description:
        'Een set bestaande uit een romper, een short en een accessoire van zacht katoenen tricot met print. De romper heeft korte mouwen en een drukknoopsluiting in het kruis. De short heeft een comfortabele en mooi aansluitende pasvorm over de luier.',
      userId: user.id,
      amount: 14.99,
      tags: ['kleding'],
      imageUrl:
        'https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2Ff6%2Ff9%2Ff6f9b4a49d50b319ec96815406ff6ee682721743.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B2%5D&call=url[file:/product/fullscreen]',
    },
  });

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
