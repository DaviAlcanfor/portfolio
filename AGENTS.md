# AGENTS.md

Personal portfolio of Davi Alcanfor (AI engineer, São Paulo). One page, inspired by
[Ruben Marcus](https://www.rubenmarcus.dev)'s portfolio: full-screen background video,
info overlaid on top, glitch text and a music player.

## Principles

- **Light first.** No UI framework. Astro ships static HTML; client JS is a few KB of
  plain TypeScript. Don't add React/GSAP/etc. unless a feature truly needs it.
- **Content lives in `src/data/site.ts`.** Texts, roles, marquee, socials, playlist and
  projects. Components only render it — edit data, not markup.
- **Site copy is in English.** The owner speaks Portuguese; comments in code are in Portuguese.
- **Terminal / Matrix aesthetic.** Amber on black (`--fg: #ffb627`), Martian Mono, glitch
  text, terminal metaphors (`ls projects`, `>_` favicon, block cursor). New UI should fit it.
- **Not glowy inside content.** Glow only on hover of overlay text/icons. The projects
  terminal is flat and spaced out — it should look like a real shell, not a neon sign.

## Stack & commands

Astro 7 + TypeScript 6 (`@astrojs/check` does not support TS 7 yet).

```sh
npm run dev      # http://localhost:4321
npm run build    # astro check (types) + static build to dist/
```

Deploy: Vercel, static, zero config.

## Structure

```
src/
  data/site.ts         all content (SITE, MARQUEE, SOCIALS, TRACKS, PROJECTS)
  lib/scramble.ts      glitch effect + glitchOnHover() for [data-glitch]
  layouts/Base.astro   <head>, fonts, favicon, OG tags, global styles
  styles/global.css    tokens, reset, hover glow, ::selection, :focus-visible
  components/
    Background.astro   video, edge mask, mouse parallax
    Marquee.astro      scrolling top line (rendered twice for a seamless loop)
    Social.astro       icon links
    Player.astro       YouTube IFrame player, loaded on first click
    Intro.astro        rotating role + bio + "ls projects" button
    Terminal.astro     <dialog> with projects, opens with button or "/" key
    Cursor.astro       terminal block cursor + falling glyph trail
    Icon.astro, icons.ts   inline Lucide-style SVGs
public/                bg.webm, bg.mp4, poster.jpg, og.jpg, favicon.svg, apple-touch-icon.png
```

## Behaviors worth knowing

- **Glitch:** `scramble(el, text, ms)` animates letters into place. Any element with
  `data-glitch` scrambles on hover. It is skipped while the user is selecting text,
  because it rewrites `innerHTML`. `scramble` remembers each element's final text,
  so hovering mid-animation still resolves to the right string.
- **Roles** rotate every 3s (`SITE.roles`). The bio decodes once on load.
- **Player:** YouTube API loads only on first click. The `playing` class on `<body>`
  drives the icons; it ignores BUFFERING so "click to listen" doesn't flicker.
  Track titles/artists are hand-written in `TRACKS` (channel names are often wrong,
  e.g. a label's channel).
- **Cursor:** only on `(hover: hover) and (pointer: fine)`. It's an amber block with
  `mix-blend-mode: difference`: amber over black, black over the yellow face. Hidden until
  the first mouse move. A custom cursor can't render above a modal `<dialog>` (top layer),
  so the terminal uses a native SVG cursor drawn as the same amber block.
- **Responsive:** breakpoint 768px. Background switches on `orientation: portrait`
  (wider video, top/bottom fade, dark gradient behind icons and text).
- **Reduced motion** is respected everywhere: no marquee, trail, blink or parallax,
  and scramble sets the text instantly.

## Gotchas we already hit

- **Class names collide across components.** Astro scopes styles, not `querySelector`.
  A `.caret` in the terminal was grabbed by the cursor script. Use unique class names
  for anything a script looks up.
- The global `* { margin: 0 }` reset kills `<dialog>` centering — the terminal sets `margin: auto`.
- Don't spread a boolean in Astro attributes (`{...(cond && {...})}`) — it crashes the
  build. Use `attr={cond ? x : undefined}`.
- OG/Twitter meta tags need an absolute URL. `astro.config.mjs` builds `site` from
  Vercel's `VERCEL_PROJECT_PRODUCTION_URL`, which picks the custom domain if there is one.
  Local builds have no `site`, so the tags are skipped there; that is expected.

## Background video pipeline

The source is a Hailuo AI clip (`video_quase_completo.mp4`, 1374x768, 24fps, ~5.9s) that
lives outside the repo. The head turns ~300°, not a full 360°. It is processed with ffmpeg:

1. `delogo` the "MINIMAX | Hailuo AI" watermark (bottom-right) and a sparkle logo that
   only shows in frames 0–8. We don't crop, because cropping cut off the chin and neck.
2. Boomerang loop (forward + reversed, dropping duplicate frames) for a seamless loop.
3. Encode at native resolution: VP9 2-pass 2 Mbps (`bg.webm`, ~2.9MB) and H.264 2.5 Mbps
   (`bg.mp4`). The 0.9 Mbps / 1280px version visibly lost the halftone detail.
4. `poster.jpg` and `og.jpg` come from the frame at 1.0s. Earlier frames are still grey,
   before the amber color kicks in.

```sh
D="delogo=x=1220:y=612:w=70:h=150:enable='lte(n,8)',delogo=x=1030:y=690:w=336:h=62"
F="$D,split[a][b];[b]reverse,trim=start_frame=1,setpts=PTS-STARTPTS[r];[a][r]concat=n=2:v=1:a=0,trim=end_frame=279,setpts=PTS-STARTPTS"
ffmpeg -i in.mp4 -an -filter_complex "$F" -c:v libvpx-vp9 -b:v 2000k -deadline good -cpu-used 1 -row-mt 1 -pass 1 -f null -
ffmpeg -i in.mp4 -an -filter_complex "$F" -c:v libvpx-vp9 -b:v 2000k -deadline good -cpu-used 1 -row-mt 1 -pass 2 public/bg.webm
ffmpeg -i in.mp4 -an -filter_complex "$F,format=yuv420p" -c:v libx264 -b:v 2500k -maxrate 3000k -bufsize 6000k -preset slow -movflags +faststart public/bg.mp4
```

Biggest possible upgrade: regenerate the clip at 1080p with a full 360° turn, then rerun
this pipeline. `trim=end_frame` and the delogo boxes must be re-checked for a new source.

## Ideas not done yet

- Résumé (PDF) link next to the social icons.
- Live São Paulo clock in a corner.
- RGB-split glitch on the video when the track changes.
- Easter-egg commands in the terminal (`whoami`, `contact`, `play <artist>`).
