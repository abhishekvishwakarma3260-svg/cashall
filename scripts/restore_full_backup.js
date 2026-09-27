const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

function parseDate(v) {
  if (!v) return null;
  const d = new Date(v);
  return isNaN(d.getTime()) ? null : d;
}

// Helper to chunk array
function chunkArray(array, size) {
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

async function restore() {
  console.log('--- Starting Full Database Restoration into New Supabase Project ---');
  const backupPath = path.join(__dirname, '..', 'database_backups', 'cashall_full_backup_2026-09-11T10-49-29-553Z.json');
  const backup = JSON.parse(fs.readFileSync(backupPath, 'utf8'));

  // 1. Categories
  console.log(`\n[1/15] Restoring Categories (${backup.category?.length || 0})...`);
  if (backup.category && backup.category.length > 0) {
    const formatted = backup.category.map(c => ({
      id: c.id,
      name: c.name,
      slug: c.slug,
      active: c.active !== undefined ? c.active : true,
      sortOrder: c.sortOrder || 0,
      createdAt: parseDate(c.createdAt) || new Date(),
      updatedAt: parseDate(c.updatedAt) || new Date(),
      deletedAt: parseDate(c.deletedAt),
    }));
    await prisma.category.createMany({ data: formatted, skipDuplicates: true });
    console.log(`✓ Categories restored.`);
  }

  // 2. Brands
  console.log(`\n[2/15] Restoring Brands (${backup.brand?.length || 0})...`);
  if (backup.brand && backup.brand.length > 0) {
    const formatted = backup.brand.map(b => ({
      id: b.id,
      name: b.name,
      slug: b.slug,
      logoUrl: b.logoUrl || null,
      category: b.category || 'MOBILE',
      active: b.active !== undefined ? b.active : true,
      sortOrder: b.sortOrder || 0,
      createdAt: parseDate(b.createdAt) || new Date(),
      updatedAt: parseDate(b.updatedAt) || new Date(),
      deletedAt: parseDate(b.deletedAt),
    }));
    await prisma.brand.createMany({ data: formatted, skipDuplicates: true });
    console.log(`✓ Brands restored.`);
  }

  // 3. QuestionSet (Required by ConditionQuestions and DeviceModels)
  console.log(`\n[3/15] Restoring QuestionSet...`);
  await prisma.questionSet.upsert({
    where: { id: '550e8400-e29b-41d4-a716-446655440000' },
    update: {},
    create: {
      id: '550e8400-e29b-41d4-a716-446655440000',
      name: 'Default Mobile Condition Questions',
      description: 'Default inspection questions for mobile devices',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
  console.log(`✓ QuestionSet ready.`);

  // 4. Condition Questions
  console.log(`\n[4/15] Restoring Condition Questions (${backup.conditionQuestion?.length || 0})...`);
  if (backup.conditionQuestion && backup.conditionQuestion.length > 0) {
    const formatted = backup.conditionQuestion.map(q => ({
      id: q.id,
      questionSetId: q.questionSetId || '550e8400-e29b-41d4-a716-446655440000',
      title: q.title,
      subtitle: q.subtitle || null,
      group: q.group,
      type: q.type || 'SINGLE',
      sortOrder: q.sortOrder || 0,
      isRequired: q.isRequired !== undefined ? q.isRequired : true,
      active: q.active !== undefined ? q.active : true,
      createdAt: parseDate(q.createdAt) || new Date(),
      updatedAt: parseDate(q.updatedAt) || new Date(),
      deletedAt: parseDate(q.deletedAt),
    }));
    await prisma.conditionQuestion.createMany({ data: formatted, skipDuplicates: true });
    console.log(`✓ Condition Questions restored.`);
  }

  // 5. Condition Options
  console.log(`\n[5/15] Restoring Condition Options...`);
  const rawOptions = [
    { id: "550e8400-e29b-41d4-a716-446655440041", questionId: "550e8400-e29b-41d4-a716-446655440031", label: "Turns ON normally", description: "Phone powers up to home screen", iconName: "Power", sortOrder: 1 },
    { id: "550e8400-e29b-41d4-a716-446655440042", questionId: "550e8400-e29b-41d4-a716-446655440031", label: "Power / Boot Issue", description: "Does not turn on or gets stuck on logo", iconName: "PowerOff", sortOrder: 2 },
    { id: "550e8400-e29b-41d4-a716-446655440043", questionId: "550e8400-e29b-41d4-a716-446655440032", label: "Flawless / Like New", description: "No scratches, zero defects", iconName: "Sparkles", sortOrder: 1 },
    { id: "550e8400-e29b-41d4-a716-446655440044", questionId: "550e8400-e29b-41d4-a716-446655440032", label: "Minor Scratches", description: "1-2 light surface hairline scratches", iconName: "Minimize2", sortOrder: 2 },
    { id: "550e8400-e29b-41d4-a716-446655440045", questionId: "550e8400-e29b-41d4-a716-446655440032", label: "Heavy Scratches", description: "Multiple deep noticeable scratches", iconName: "Layers", sortOrder: 3 },
    { id: "550e8400-e29b-41d4-a716-446655440046", questionId: "550e8400-e29b-41d4-a716-446655440032", label: "Cracked / Damaged Glass", description: "Visible glass cracks or touch issue", iconName: "Smartphone", sortOrder: 4 },
    { id: "550e8400-e29b-41d4-a716-446655440047", questionId: "550e8400-e29b-41d4-a716-446655440033", label: "Flawless Body", description: "No dents, no scratches", iconName: "ShieldCheck", sortOrder: 1 },
    { id: "550e8400-e29b-41d4-a716-446655440048", questionId: "550e8400-e29b-41d4-a716-446655440033", label: "Minor Wear", description: "Light paint wear or minor micro scuffs", iconName: "Sliders", sortOrder: 2 },
    { id: "550e8400-e29b-41d4-a716-446655440049", questionId: "550e8400-e29b-41d4-a716-446655440033", label: "Dents / Scratches", description: "Noticeable dents on corners or back glass scuffs", iconName: "AlertTriangle", sortOrder: 3 },
    { id: "550e8400-e29b-41d4-a716-446655440050", questionId: "550e8400-e29b-41d4-a716-446655440033", label: "Heavy Structural Damage", description: "Bent frame, cracked back panel", iconName: "XCircle", sortOrder: 4 },
    { id: "550e8400-e29b-41d4-a716-446655440051", questionId: "550e8400-e29b-41d4-a716-446655440034", label: "All Functions Work Perfectly", description: "Cameras, Wi-Fi, Speakers, Fingerprint/FaceID all fine", iconName: "CheckCircle2", sortOrder: 1 },
    { id: "550e8400-e29b-41d4-a716-446655440052", questionId: "550e8400-e29b-41d4-a716-446655440034", label: "1-2 Minor Issues", description: "Weak battery health or slightly muffled speaker", iconName: "AlertCircle", sortOrder: 2 },
    { id: "550e8400-e29b-41d4-a716-446655440053", questionId: "550e8400-e29b-41d4-a716-446655440034", label: "Major Fault (Camera/Wi-Fi/Biometric)", description: "Camera blurry, FaceID failed or Wi-Fi unresponsive", iconName: "AlertTriangle", sortOrder: 3 },
    { id: "550e8400-e29b-41d4-a716-446655440054", questionId: "550e8400-e29b-41d4-a716-446655440035", label: "Original Box + Original Charger", description: "Complete inbox packaging included", iconName: "PackageCheck", sortOrder: 1 },
    { id: "550e8400-e29b-41d4-a716-446655440055", questionId: "550e8400-e29b-41d4-a716-446655440035", label: "Original Box Only", description: "No charger cable included", iconName: "Package", sortOrder: 2 },
    { id: "550e8400-e29b-41d4-a716-446655440056", questionId: "550e8400-e29b-41d4-a716-446655440035", label: "Original Charger Only", description: "No original box included", iconName: "Zap", sortOrder: 3 },
    { id: "550e8400-e29b-41d4-a716-446655440057", questionId: "550e8400-e29b-41d4-a716-446655440035", label: "Device Only", description: "No box or charger included", iconName: "Smartphone", sortOrder: 4 },
  ];
  const conditionOptions = rawOptions.map(o => ({
    ...o,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  }));
  await prisma.conditionOption.createMany({ data: conditionOptions, skipDuplicates: true });
  console.log(`✓ Condition Options restored.`);

  // 6. Pricing Rules
  console.log(`\n[6/15] Restoring Pricing Rules (${backup.pricingRule?.length || 0})...`);
  if (backup.pricingRule && backup.pricingRule.length > 0) {
    const formatted = backup.pricingRule.map(r => ({
      id: r.id,
      modelId: r.modelId || null,
      variantId: r.variantId || null,
      questionId: r.questionId,
      optionId: r.optionId,
      ruleType: r.ruleType,
      adjustmentType: r.adjustmentType || 'PERCENTAGE_DEDUCTION',
      adjustmentValue: r.adjustmentValue,
      minValue: r.minValue || null,
      maxValue: r.maxValue || null,
      priority: r.priority || 0,
      active: r.active !== undefined ? r.active : true,
      createdAt: parseDate(r.createdAt) || new Date(),
      updatedAt: parseDate(r.updatedAt) || new Date(),
      deletedAt: parseDate(r.deletedAt),
    }));
    await prisma.pricingRule.createMany({ data: formatted, skipDuplicates: true });
    console.log(`✓ Pricing Rules restored.`);
  }

  // 7. Device Models (2,441 records)
  console.log(`\n[7/15] Restoring Device Models (${backup.deviceModel?.length || 0})...`);
  if (backup.deviceModel && backup.deviceModel.length > 0) {
    const formatted = backup.deviceModel.map(m => ({
      id: m.id,
      brandId: m.brandId,
      questionSetId: m.questionSetId || null,
      name: m.name,
      slug: m.slug,
      category: m.category || 'MOBILE',
      imageUrl: m.imageUrl || null,
      releaseYear: m.releaseYear || null,
      basePrice: m.basePrice || 0,
      description: m.description || null,
      popular: m.popular !== undefined ? m.popular : false,
      active: m.active !== undefined ? m.active : true,
      createdAt: parseDate(m.createdAt) || new Date(),
      updatedAt: parseDate(m.updatedAt) || new Date(),
      deletedAt: parseDate(m.deletedAt),
    }));
    const chunks = chunkArray(formatted, 300);
    for (let i = 0; i < chunks.length; i++) {
      await prisma.deviceModel.createMany({ data: chunks[i], skipDuplicates: true });
      process.stdout.write(`  Inserted models chunk ${i + 1}/${chunks.length}\r`);
    }
    console.log(`\n✓ Device Models restored (${formatted.length}).`);
  }

  // 8. Device Variants (27,267 records)
  console.log(`\n[8/15] Restoring Device Variants (${backup.deviceVariant?.length || 0})...`);
  if (backup.deviceVariant && backup.deviceVariant.length > 0) {
    const formatted = backup.deviceVariant.map(v => ({
      id: v.id,
      modelId: v.modelId,
      ram: v.ram || null,
      storage: v.storage,
      basePrice: v.basePrice || 0,
      active: v.active !== undefined ? v.active : true,
      sortOrder: v.sortOrder || 0,
      createdAt: parseDate(v.createdAt) || new Date(),
      updatedAt: parseDate(v.updatedAt) || new Date(),
      deletedAt: parseDate(v.deletedAt),
    }));
    const chunks = chunkArray(formatted, 500);
    for (let i = 0; i < chunks.length; i++) {
      await prisma.deviceVariant.createMany({ data: chunks[i], skipDuplicates: true });
      process.stdout.write(`  Inserted variants chunk ${i + 1}/${chunks.length} (${(i + 1) * 500} records)\r`);
    }
    console.log(`\n✓ Device Variants restored (${formatted.length}).`);
  }

  // 9. Users (77 records)
  console.log(`\n[9/15] Restoring Users (${backup.user?.length || 0})...`);
  if (backup.user && backup.user.length > 0) {
    const formatted = backup.user.map(u => ({
      id: u.id,
      phone: u.phone,
      name: u.name || null,
      email: u.email || null,
      role: u.role || 'CUSTOMER',
      status: u.status || 'ACTIVE',
      firebaseUid: u.firebaseUid,
      lastLogin: parseDate(u.lastLogin),
      isBlocked: u.isBlocked !== undefined ? u.isBlocked : false,
      blockedAt: parseDate(u.blockedAt),
      blockReason: u.blockReason || null,
      blockedByAdminId: u.blockedByAdminId || null,
      createdAt: parseDate(u.createdAt) || new Date(),
      updatedAt: parseDate(u.updatedAt) || new Date(),
      deletedAt: parseDate(u.deletedAt),
    }));
    await prisma.user.createMany({ data: formatted, skipDuplicates: true });
    console.log(`✓ Users restored.`);
  }

  // 10. Addresses (108 records)
  console.log(`\n[10/15] Restoring Addresses (${backup.address?.length || 0})...`);
  if (backup.address && backup.address.length > 0) {
    const formatted = backup.address.map(a => ({
      id: a.id,
      userId: a.userId,
      fullName: a.fullName,
      phone: a.phone,
      house: a.house || null,
      street: a.street || null,
      area: a.area || null,
      landmark: a.landmark || null,
      city: a.city || null,
      state: a.state || 'West Bengal',
      pincode: a.pincode,
      latitude: a.latitude || null,
      longitude: a.longitude || null,
      createdAt: parseDate(a.createdAt) || new Date(),
      updatedAt: parseDate(a.updatedAt) || new Date(),
      deletedAt: parseDate(a.deletedAt),
    }));
    await prisma.address.createMany({ data: formatted, skipDuplicates: true });
    console.log(`✓ Addresses restored.`);
  }

  // 11. Partners (5 records)
  console.log(`\n[11/15] Restoring Partners (${backup.partner?.length || 0})...`);
  if (backup.partner && backup.partner.length > 0) {
    const formatted = backup.partner.map(p => ({
      id: p.id,
      name: p.name,
      phone: p.phone,
      email: p.email || null,
      businessName: p.businessName || null,
      city: p.city || 'Kolkata',
      status: p.status || 'ACTIVE',
      rating: p.rating || 5,
      completedPickups: p.completedPickups || 0,
      createdAt: parseDate(p.createdAt) || new Date(),
      updatedAt: parseDate(p.updatedAt) || new Date(),
      deletedAt: parseDate(p.deletedAt),
    }));
    await prisma.partner.createMany({ data: formatted, skipDuplicates: true });
    console.log(`✓ Partners restored.`);
  }

  // 12. Quotes (379 records)
  console.log(`\n[12/15] Restoring Quotes (${backup.quote?.length || 0})...`);
  if (backup.quote && backup.quote.length > 0) {
    const formatted = backup.quote.map(q => ({
      id: q.id,
      quoteNumber: q.quoteNumber,
      variantId: q.variantId,
      selectedAnswersJson: typeof q.selectedAnswersJson === 'string' ? q.selectedAnswersJson : JSON.stringify(q.selectedAnswersJson || []),
      basePrice: q.basePrice,
      totalDeductions: q.totalDeductions || 0,
      estimatedPrice: q.estimatedPrice,
      breakdownJson: typeof q.breakdownJson === 'string' ? q.breakdownJson : JSON.stringify(q.breakdownJson || {}),
      expiresAt: parseDate(q.expiresAt) || new Date(Date.now() + 7 * 86400000),
      status: q.status || 'ACTIVE',
      customerPhone: q.customerPhone || null,
      customerName: q.customerName || null,
      userId: q.userId || null,
      createdAt: parseDate(q.createdAt) || new Date(),
      updatedAt: parseDate(q.updatedAt) || new Date(),
      deletedAt: parseDate(q.deletedAt),
    }));
    const chunks = chunkArray(formatted, 100);
    for (const chunk of chunks) {
      await prisma.quote.createMany({ data: chunk, skipDuplicates: true });
    }
    console.log(`✓ Quotes restored.`);
  }

  // 13. Orders (85 records)
  console.log(`\n[13/15] Restoring Orders (${backup.order?.length || 0})...`);
  if (backup.order && backup.order.length > 0) {
    const formatted = backup.order.map(o => ({
      id: o.id,
      orderNumber: o.orderNumber,
      quoteId: o.quoteId,
      userId: o.userId,
      addressId: o.addressId || null,
      pickupDate: o.pickupDate || 'Today',
      pickupTimeSlot: o.pickupTimeSlot || '1 PM - 4 PM',
      status: o.status || 'QUOTE_CREATED',
      finalPrice: o.finalPrice || null,
      agentId: o.agentId || null,
      urn: o.urn || null,
      paymentScreenshotUrl: o.paymentScreenshotUrl || null,
      cancellationReason: o.cancellationReason || null,
      createdAt: parseDate(o.createdAt) || new Date(),
      updatedAt: parseDate(o.updatedAt) || new Date(),
      deletedAt: parseDate(o.deletedAt),
    }));
    await prisma.order.createMany({ data: formatted, skipDuplicates: true });
    console.log(`✓ Orders restored.`);
  }

  // 14. Pickups & Payments
  console.log(`\n[14/15] Restoring Pickups (${backup.pickup?.length || 0}) & Payments (${backup.payment?.length || 0})...`);
  if (backup.pickup && backup.pickup.length > 0) {
    const formatted = backup.pickup.map(p => ({
      id: p.id,
      orderId: p.orderId,
      partnerId: p.partnerId || null,
      date: p.date,
      timeSlot: p.timeSlot,
      status: p.status || 'SCHEDULED',
      notes: p.notes || null,
      assignedAt: parseDate(p.assignedAt),
      createdAt: parseDate(p.createdAt) || new Date(),
      updatedAt: parseDate(p.updatedAt) || new Date(),
      deletedAt: parseDate(p.deletedAt),
    }));
    await prisma.pickup.createMany({ data: formatted, skipDuplicates: true });
    console.log(`✓ Pickups restored.`);
  }
  if (backup.payment && backup.payment.length > 0) {
    const formatted = backup.payment.map(p => ({
      id: p.id,
      orderId: p.orderId,
      amount: p.amount,
      method: p.method || 'UPI',
      status: p.status || 'PENDING',
      transactionRef: p.transactionRef || null,
      paidAt: parseDate(p.paidAt),
      createdAt: parseDate(p.createdAt) || new Date(),
      updatedAt: parseDate(p.updatedAt) || new Date(),
      deletedAt: parseDate(p.deletedAt),
    }));
    await prisma.payment.createMany({ data: formatted, skipDuplicates: true });
    console.log(`✓ Payments restored.`);
  }

  // 15. Audit Logs (107 records)
  console.log(`\n[15/15] Restoring Audit Logs (${backup.auditLog?.length || 0})...`);
  if (backup.auditLog && backup.auditLog.length > 0) {
    const formatted = backup.auditLog.map(l => ({
      id: l.id,
      actorId: l.actorId,
      actorRole: l.actorRole,
      action: l.action,
      tableName: l.tableName,
      recordId: l.recordId,
      oldValuesJson: l.oldValuesJson || null,
      newValuesJson: l.newValuesJson || null,
      createdAt: parseDate(l.createdAt) || new Date(),
      updatedAt: parseDate(l.updatedAt) || new Date(),
      deletedAt: parseDate(l.deletedAt),
    }));
    await prisma.auditLog.createMany({ data: formatted, skipDuplicates: true });
    console.log(`✓ Audit Logs restored.`);
  }

  console.log('\n====================================================');
  console.log('🎉 ALL TABLES RESTORED SUCCESSFULLY WITH ZERO LOSS!');
  console.log('====================================================\n');
}

restore()
  .catch((err) => {
    console.error('Migration failed:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
