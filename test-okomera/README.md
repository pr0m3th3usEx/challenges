# Okomera Organoid Visualization & Analysis App

## 1. Introduction

This project is a technical proof of concept for Okomera. It provides a full-stack application to visualize and analyze images of mouse organoids, with segmentation overlays to help biomedical researchers analyze samples more effectively. Built with a React frontend and a Node.js backend, the application allows for interactive viewing and basic analysis of organoid images hosted on Google Cloud Storage, with metadata managed in MongoDB.

## 2. Setup

### A. Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/pr0m3th3usEx/test-okomera.git
   ```

2. **Build Docker Images:**
   - For the web app:
     ```bash
     docker build -t okomera_app:test --target app .
     ```
   - For the API:
     ```bash
     docker build -t okomera_api:test --target api .
     ```

3. **Google Cloud Services Configuration:**
   - This app uses Google Cloud Storage to store organoid images.
   - **Steps:**
     1. Create a project on the Google Cloud Console and set up a Google Cloud Storage bucket.
     2. Create a service account with the `roles/iam.serviceAccountTokenCreator` role to handle bucket interactions.
     3. Add the `roles/iam.serviceAccountTokenCreator` role to your account to allow impersonation.

### B. Configure Environment

1. **Install Google Cloud Platform CLI Tools:**
   - Install `gcloud` on your local environment to enable Google Cloud service authentication.
   - Authenticate with the impersonated service account:
     ```bash
     gcloud auth application-default login --impersonate-service-account [your-service-account]
     ```

2. **Database & Environment Variables:**
   - **Seed MongoDB Database with Metadata:**
    1. Place the `MouseOrganoids` dataset folder at the root of the repository.
    2. Configure the environment variables in a `.env` file at the root level with the following structure (example into `apps/api/env.example`):
        ```env
        DATABASE_URL=mongodb://random:password@localhost:27017/
        PORT=3000
        GCP_PROJECT_ID=---GCP-PROJECT-ID---
        GCP_BUCKET_NAME=---GCP-BUCKET-NAME---
        ```
    3. Update the environment of `api` service into docker-compose.prod.yaml
    3. Run the database seed script:
        ```bash
        cd apps/api
        set -a
        source .env
        set +a
        pnpm i
        pnpm run db:seed
        ```

### C. Run Full Application Stack

Use Docker Compose to set up the application stack with the production configuration:

```bash
docker-compose -f docker-compose.prod.yaml up
```

## 3. Run Application

Once the application stack is up, access the frontend at `http://localhost:4173`. The frontend will connect to the backend API and allow you to view and analyze organoid 
images with segmentation overlays.