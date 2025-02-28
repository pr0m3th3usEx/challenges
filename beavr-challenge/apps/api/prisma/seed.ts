import { PrismaClient } from '@prisma/client';
import { readFile } from 'fs/promises';

const prisma = new PrismaClient();

async function main() {
  const requirementsTSV = (await readFile(`${__dirname}/requirements.tsv`)).toString();
  const documentsTSV = (await readFile(`${__dirname}/documents.tsv`)).toString();

  const documentTypes = documentsTSV
    .split('\n')
    .map((row) => row.trim().split('\t'))
    .slice(1)
    .map(([docType, name, description]) => ({
      docType,
      name,
      description,
    }));

  const requirements = requirementsTSV
    .split('\n')
    .map((row) => row.trim().split('\t'))
    .slice(1)
    .map(([name, description, documents]) => ({
      name,
      description,
      documents: documents.split(',').map((doc) => doc.trim()),
    }));

  console.log(documentTypes);
  console.log(requirements);

  // Add document types
  const promisesDocTypes = documentTypes.map((doc) =>
    prisma.documentType.create({
      data: {
        docType: doc.docType,
        name: doc.name,
        description: doc.description,
      },
    }),
  );

  await prisma.$transaction(promisesDocTypes);

  // Add requirements
  const promisesRequirements = requirements.map((requirement) =>
    prisma.requirement.create({
      data: {
        name: requirement.name,
        description: requirement.description,
        requiredDocuments: {
          create: requirement.documents.map((docTypeName) => ({ docTypeName })),
        },
      },
    }),
  );

  await prisma.$transaction(promisesRequirements);
}

main()
  .then(async () => {
    console.log('Seeding completed');
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
