# Eva's Tiny Chaos World

Interactive mobile-first romantic game & surprise web app built with React, TypeScript, Tailwind CSS, and Vite.

## Deploying to Vercel

This project is a zero-config static Vite SPA (no backend server or environment variables required).

### Option 1: GitHub + Vercel Dashboard
1. Push this repository to GitHub.
2. Import the repository in [Vercel](https://vercel.com/new).
3. Vercel automatically detects `vercel.json` (`vite` framework, `npm run build`, output directory `dist`).
4. Click **Deploy**.

### Option 2: Vercel CLI
```bash
npm install
npm run build
npx vercel --prod
```

## Custom Dudu & Bubu GIFs
Drop any `.gif` files inside `public/gifs/` (for example `public/gifs/welcome.gif`) and update the matching key in `src/data/assets.ts` (for example `welcome: '/gifs/welcome.gif'`). Any empty key automatically renders the built-in animated SVG Dudu & Bubu reactions.
