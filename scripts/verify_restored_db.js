const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('--- Verifying New Supabase Database Counts (Project: vvivimdwycuseteduoqv) ---');
  
  const [
    categories,
    brands,
    models,
    variants,
    questions,
    options,
    rules,
    users,
    addresses,
    partners,
    quotes,
    orders,
    pickups,
    payments,
    auditLogs
  ] = await Promise.all([
    prisma.category.count(),
    prisma.brand.count(),
    prisma.deviceModel.count(),
    prisma.deviceVariant.count(),
    prisma.conditionQuestion.count(),
    prisma.conditionOption.count(),
    prisma.pricingRule.count(),
    prisma.user.count(),
    prisma.address.count(),
    prisma.partner.count(),
    prisma.quote.count(),
    prisma.order.count(),
    prisma.pickup.count(),
    prisma.payment.count(),
    prisma.auditLog.count(),
  ]);

  const counts = {
    'Categories (target: 3)': categories,
    'Brands (target: 28)': brands,
    'Device Models (target: 2441)': models,
    'Device Variants (target: 27267)': variants,
    'Condition Questions (target: 5)': questions,
    'Condition Options (target: 17)': options,
    'Pricing Rules (target: 16)': rules,
    'Users (target: 77)': users,
    'Addresses (target: 108)': addresses,
    'Partners (target: 5)': partners,
    'Quotes (target: 379)': quotes,
    'Orders (target: 85)': orders,
    'Pickups (target: 85)': pickups,
    'Payments (target: 22)': payments,
    'Audit Logs (target: 107)': auditLogs,
  };

  console.table(counts);

  // Sample a real user and a real order to verify read queries
  const sampleUser = await prisma.user.findFirst({
    where: { role: 'CUSTOMER' },
    select: { id: true, name: true, phone: true, email: true },
  });
  console.log('Sample User from DB:', sampleUser);

  const sampleOrder = await prisma.order.findFirst({
    select: { id: true, orderNumber: true, status: true, finalPrice: true, pickupDate: true },
  });
  console.log('Sample Order from DB:', sampleOrder);

  const sampleModel = await prisma.deviceModel.findFirst({
    where: { slug: 'realme-15x-5g' },
    include: { variants: true },
  });
  console.log('Sample Model (Realme 15x 5G):', {
    id: sampleModel?.id,
    name: sampleModel?.name,
    variantCount: sampleModel?.variants?.length,
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
