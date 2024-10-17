# Technical test for Virtuve / Spain

## Subject

The aim of this technical test is to evaluate the candidate’s ability to develop and
implement backend solutions in a Node.js ecosystem with a focus on scalability,
clean architecture, and efficient design. The test will allow us to assess the
candidate’s proficiency in TypeScript, their understanding of key technologies and
principles (Prisma, PostgreSQL, Docker, etc.), and their ability to design solutions
that follow good software engineering practices such as SOLID principles and
Domain-Driven Design (DDD).

You will be tasked with building a simplified REST API for managing athlete data
and their performance metrics. This service will allow athletes to be registered,
their performance data to be updated, and basic queries on their data to be
executed.

### Stack

- TypeScript: The project must be developed using Node.js with TypeScript.
- Docker: The application should be containerized using Docker. Provide a
- Dockerfile and docker-compose configuration that sets up the app and a
- PostgreSQL instance.
- PostgreSQL: Use PostgreSQL as the database.
- Prisma: Use Prisma as the ORM for database interaction.
- Hono: Use Hono as http framework for building the API.

### Additional requirement

- Error Handling: Ensure proper error handling for invalid requests (e.g., non-
existent athlete IDs).
- Testing: Implement unit tests for critical parts of the functionality (e.g.,
creating athletes, retrieving metrics).
- Testing: Add integration / unitary tests (e.g., using Jest or Vitest) for critical
parts of the functionality.
- SOLID Principles: Demonstrate adherence to SOLID principles in your
implementation.
- OOD Principles: Demonstrate adherence to OOD principles in your
implementation.

More details [here](./Backend_Technical_Test.pdf)

## My solution

I decided to create a monorepo using PNPM workspace & [Turborepo](https://turbo.build/) to manage the different packages & applications for the project. Then, it would be easier to create modular components to follow Hexagonal architecture & DDD principles.

Current file structure is as followed:
```bash
.
├── apps
│   └── api # Hono-based REST API
└── packages
    ├── biz-core # Business logic
    ├── eslint-config-custom # Custom ESLint configuration module
    ├── prettier-config-custom # Custom Prettier configuration module
    └── prisma-db-adapter # Prisma Adapter
```

### Install depedencies
 
Install dependencies running command:
```shell
pnpm install --frozen-lockfile
```

### Test adapters

```shell
# Change current directory
cd packages/prisma-db-adapter
# Run testing database
pnpm run db:up
# Apply migrations and generate Prisma client
pnpm run db:migrate && pnpm run db:generate-client
# Execute tests
pnpm run test:i
```

### Run API (for development)

```shell
cd apps/api
pnpm run dev
```

### Build production image (using Docker)

```shell
docker build -t virtuve:test --progress=plain .
```

You can find the details about image building into the [Dockerfile](https://github.com/pr0m3th3usEx/challenges/blob/8706533545106c617e411abc7a7f4f2a069eced2/test-virtuve/Dockerfile).
