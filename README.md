# Bhaargav K C — Portfolio

React 18, Vite, TypeScript, and plain CSS. The site uses Orbitron for display text, IBM Plex Mono for HUD labels, and IBM Plex Sans for body copy.

## Run locally

```bash
npm install
npm run dev
```

## Edit content

Personal content lives in [src/data/content.ts](src/data/content.ts), with its contracts in [src/data/types.ts](src/data/types.ts). Update that data file for projects, experience, education, skills, links, and profile copy.

The production build rejects `TODO` and `DRAFT` markers in `content.ts`:

```bash
npm run check:content
```

Missing values render development-only placeholders and render empty in production. Add the supplied profile image at `public/photo.jpeg` and the resume at `public/resume.pdf`.

## Verify

```bash
npm run lint
npx tsc -b
npm run build
```

## Deploy to Vercel

1. Push the repository to GitHub.
2. Import the repository in Vercel.
3. Keep the detected Vite settings: `npm run build` with output directory `dist`.
4. Deploy. Vercel will redeploy on pushes to the selected production branch.
5. After the final domain is known, update `public/sitemap.xml` and add its absolute URL to `public/robots.txt`.

No backend, database, or `vercel.json` is required.
