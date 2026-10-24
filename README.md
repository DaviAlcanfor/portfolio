# portfolio

Personal site of Davi Alcanfor — AI engineer. Built with [Astro](https://astro.build) + TypeScript, no UI framework (≈3KB of JS).

## Run

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # type check + static build in dist/
```

## Structure

```
src/
  data/site.ts        all content: texts, links, playlist (edit here)
  lib/scramble.ts     glitch / text scramble effect
  layouts/Base.astro  <head>, fonts, global styles
  components/         Background, Marquee, Social, Player, Intro, Cursor, Icon
  pages/index.astro   the page
public/               background video (webm + mp4) and poster
```

Music plays through the YouTube IFrame API, loaded only on the first click.
