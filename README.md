# Gamer HUB

Games library powered by RAWG API to browse, add to library, mark as favourite and track games.

## Tech stack

- Typescript
- NextJS 15 (app router)
- PostgreSQL + drizzle ORM
- BetterAuth
- Bull MQ (for background games fetching)
- Tailwind
- Shadcn components
- Redis
- Zustand
- Zod
- React Form Hook

## Deployed version

Hosted version: https://gamer-hub-mu.vercel.app

## Running project locally

You will need to set up env variables as in the .env.example file

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
