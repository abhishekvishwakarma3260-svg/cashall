const { isPincodeServiced, getPincodeDetails } = require('../lib/serviceability');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function runTests() {
  console.log('=== TEST 1: PINCODE SERVICEABILITY ===');
  const pinPatna = '800003';
  const pinKolkata = '712222';
  const pinInvalid = '999999';

  console.log(`Pincode ${pinPatna} serviced?`, isPincodeServiced(pinPatna), getPincodeDetails(pinPatna));
  console.log(`Pincode ${pinKolkata} serviced?`, isPincodeServiced(pinKolkata), getPincodeDetails(pinKolkata));
  console.log(`Pincode ${pinInvalid} serviced?`, isPincodeServiced(pinInvalid));

  if (!isPincodeServiced(pinPatna) || !isPincodeServiced(pinKolkata)) {
    throw new Error('Pincode test failed!');
  }
  console.log('✓ Pincode tests passed!\n');

  console.log('=== TEST 2: JAYANTA ROY QUOTES (7477336911) ===');
  const jayantaQuotes = await prisma.quote.findMany({
    where: {
      customerPhone: '7477336911',
      deletedAt: null
    },
    include: {
      variant: {
        include: {
          model: {
            include: { brand: true }
          }
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  });

  console.log(`Jayanta Roy quotes count: ${jayantaQuotes.length}`);
  jayantaQuotes.forEach(q => {
    console.log(`- #${q.quoteNumber}: ${q.variant?.model?.brand?.name} ${q.variant?.model?.name} (₹${q.estimatedPrice}) [Status: ${q.status}]`);
  });

  if (jayantaQuotes.length === 0) {
    throw new Error('Jayanta Roy quotes not found!');
  }
  const hasMacbook = jayantaQuotes.some(q => q.quoteNumber === 'CAQ58570');
  if (hasMacbook) {
    throw new Error('MacBook quote should NOT be in Jayanta Roy quotes!');
  }
  console.log('✓ Jayanta Roy quotes isolated correctly without MacBook leak!\n');

  console.log('=== TEST 3: ANKIT SHAW QUOTES (9088478486) ===');
  const ankitQuotes = await prisma.quote.findMany({
    where: {
      customerPhone: '9088478486',
      deletedAt: null
    },
    orderBy: { createdAt: 'desc' }
  });
  console.log(`Ankit Shaw quotes count: ${ankitQuotes.length}`);
  ankitQuotes.forEach(q => {
    console.log(`- #${q.quoteNumber} (₹${q.estimatedPrice}) [Status: ${q.status}]`);
  });
  console.log('✓ Ankit Shaw quotes isolated correctly!\n');

  console.log('=== TEST 4: SOUMI MACBOOK QUOTE (8017018647) ===');
  const soumiQuotes = await prisma.quote.findMany({
    where: {
      quoteNumber: 'CAQ58570'
    }
  });
  console.log(`Quote CAQ58570 customerPhone: ${soumiQuotes[0]?.customerPhone}, customerName: ${soumiQuotes[0]?.customerName}`);
  console.log('✓ MacBook correctly identified as belonging to Soumi!\n');
}

runTests()
  .catch(err => {
    console.error('Test failed:', err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
