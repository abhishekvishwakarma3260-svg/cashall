import { LegalDocumentService } from "../lib/services/legal-document.service";

async function main() {
  console.log("Seeding default legal documents (v1.0)...");
  const seeded = await LegalDocumentService.seedAllDefaultDocuments();
  console.log(`Successfully seeded ${seeded.length} legal documents.`);
  for (const doc of seeded) {
    console.log(`- ${doc.documentType} (v${doc.version}): Hash ${doc.contentHash.slice(0, 12)}... [Status: ${doc.status}]`);
  }
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Seeding error:", err);
    process.exit(1);
  });
