# Technical test for Platus (YC 2024)

## Subject

Build a super MVP web application:

- were a user can upload a PDF document
- user can select text
- user can ask via a text prompt to iterate the highlighted text (similar to Notion)
- Time Frame: End of Day

- Preferred stack: Nextjs, Typescript, Vercel, Github, OpenAI4o

## My solution

Using technical requirements, I finished the project in a 8 hours providing all features, reponsive UI, and OpenAI API integration to update text extracting from a PDF that you can upload on the platform.

### Test it by yourself !

### Install dependencies

```bash
#[]
$ cp env.example .env
$ sed -i 's/-----FILL-ME------/<YOUR_API_KEY>/g' .env
```

Then, run the development server:

```bash
npm install
npm run dev
# or
yarn
yarn dev
# or
pnpm install
pnpm dev
# or
bun install
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.