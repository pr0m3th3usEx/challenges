-- CreateEnum
CREATE TYPE "DocumentValidationStatus" AS ENUM ('IN_PROGRESS', 'VALID', 'REFUSED', 'EXPIRED');

-- CreateTable
CREATE TABLE "Requirement" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Requirement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DocumentType" (
    "docType" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "addedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Document" (
    "id" TEXT NOT NULL,
    "version" TIMESTAMP(3) NOT NULL,
    "status" "DocumentValidationStatus" NOT NULL,
    "expirationDate" TIMESTAMP(3) NOT NULL,
    "docTypeName" TEXT NOT NULL,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DocumentTypeForRequirements" (
    "requirementId" TEXT NOT NULL,
    "docTypeName" TEXT NOT NULL,

    CONSTRAINT "DocumentTypeForRequirements_pkey" PRIMARY KEY ("requirementId","docTypeName")
);

-- CreateIndex
CREATE UNIQUE INDEX "DocumentType_docType_key" ON "DocumentType"("docType");

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_docTypeName_fkey" FOREIGN KEY ("docTypeName") REFERENCES "DocumentType"("docType") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentTypeForRequirements" ADD CONSTRAINT "DocumentTypeForRequirements_requirementId_fkey" FOREIGN KEY ("requirementId") REFERENCES "Requirement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentTypeForRequirements" ADD CONSTRAINT "DocumentTypeForRequirements_docTypeName_fkey" FOREIGN KEY ("docTypeName") REFERENCES "DocumentType"("docType") ON DELETE RESTRICT ON UPDATE CASCADE;
