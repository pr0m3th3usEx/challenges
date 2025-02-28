# Database structure

### Models and Relationships

#### **Requirement**
- **Fields:**
  - `id`: Unique identifier for the requirement (UUID).
  - `name`: Name of the requirement.
  - `description`: Detailed description of the requirement.
- **Relationships:**
  - `requiredDocuments`: Many-to-many relationship with `DocumentType` via `DocumentTypeForRequirements`.

---

#### **DocumentType**
- **Fields:**
  - `docType`: Unique identifier for the document type.
  - `name`: Name of the document type.
  - `description`: Description of the document type.
  - `addedAt`: Timestamp when the document type was added (defaults to current time).
- **Relationships:**
  - `documents`: One-to-many relationship with `Document`.
  - `relatedRequirements`: Many-to-many relationship with `Requirement` via `DocumentTypeForRequirements`.

---

#### **Document**
- **Fields:**
  - `id`: Unique identifier for the document (UUID).
  - `version`: Version timestamp of the document.
  - `status`: Validation status of the document (enum: `IN_PROGRESS`, `VALID`, `REFUSED`, `EXPIRED`).
  - `expirationDate`: Expiration date of the document.
- **Relationships:**
  - `docType`: Many-to-one relationship with `DocumentType` (foreign key: `docTypeName`).

---

#### **DocumentTypeForRequirements**
- **Fields:**
  - `requirementId`: Foreign key to `Requirement`.
  - `docTypeName`: Foreign key to `DocumentType`.
- **Primary Key:**
  - Composite primary key (`requirementId`, `docTypeName`).
- **Relationships:**
  - `requirement`: Many-to-one relationship with `Requirement`.
  - `documentType`: Many-to-one relationship with `DocumentType`.

---

### Enums

#### **DocumentValidationStatus**
- Possible values:
  - `IN_PROGRESS`
  - `VALID`
  - `REFUSED`
  - `EXPIRED`

---

### Relationships Summary
1. **Requirement ↔ DocumentType (Many-to-Many):**
   - Intermediated by `DocumentTypeForRequirements`.
2. **DocumentType ↔ Document (One-to-Many):**
   - Each document is associated with a single document type.
3. **Requirement ↔ Document (Indirect):**
   - Through the many-to-many link between `Requirement` and `DocumentType`, and the one-to-many link between `DocumentType` and `Document`.