# Serenity

A feel-good ambient nature video website — eight curated scenes scheduled across your day.

## Stack

- Next.js 14 (App Router, TypeScript)
- Tailwind CSS
- Local HTML5 `<video>` playback (no YouTube embeds)
- Deployed on Vercel

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Videos

Add loopable H.264 MP4 files to `public/videos/`:

`rain.mp4`, `ocean.mp4`, `mountains.mp4`, `forest.mp4`, `fireplace.mp4`, `waterfall.mp4`, `sunrise.mp4`, `aurora.mp4`

Missing files fall back to the Unsplash thumbnail with a “Video coming soon” overlay.

## Deploy

Push to GitHub and import the repo in [Vercel](https://vercel.com). Default Next.js settings work; Unsplash images are allowed via `images.remotePatterns` in `next.config.mjs`.
