@AGENTS.md

## UI Iteration
- Before implementing large UI experiments (e.g., vertical text, alternate layouts), describe the approach in 1-2 sentences and confirm with user before coding.
- For mobile variants, prefer card/switcher patterns over vertical timelines unless specified.

## Stack Versions
- **Next.js 16.2.2** — Turbopack on by default. Dynamic route `params` are a Promise: always `await params` in server components (`const { slug } = await params`). App Router only.
- **React 19.2.4** — `use()`, `useOptimistic`, `useFormStatus` are stable. No need to import React for JSX.
- **Tailwind CSS 4.x** — No `tailwind.config.js`. Config lives in CSS via `@theme {}`. Import is `@import "tailwindcss"` (not the old `@tailwind base/components/utilities` directives). Some utility names changed from v3.
- **Framer Motion 12.x** — API is stable; no breaking changes from v11 for this project's usage.
- **shadcn/ui** — not installed. If added, use the Tailwind v4 compatible init path.

## Stack Defaults
- This portfolio uses TypeScript + Next.js App Router. All pages are server components by default; add `"use client"` only when needed.
- When renaming image/asset files on macOS, use `git mv` to avoid case-insensitivity issues.

## Dev Server
- Default port is 3000; if occupied, kill the other process rather than silently falling back to 3001.

## Projects

### Bloom (Plant Match)
- **Source material:** `/Users/niharikamishra/Desktop/Plant Match`
- **Status:** Case study in progress
- **Story angle:** Personal project built to learn Claude Code; focus on iteration speed and visual exploration
- **Image mapping:**
  - V1 = parent folder (`/Users/niharikamishra/Desktop/Plant Match`) — the initial working app: homepage, quiz flow, results page showing plant pairing + trait bars
  - Evolution = `/Users/niharikamishra/Desktop/Plant Match/PM V1 issues` — iteration after identifying V1 issues: richer plant descriptions, "Where you align / Where you're different" result sections, Claude Code building in the terminal
- **App concept:** Plant-based relationship compatibility quiz. 8 plant types (Monstera, Orchid, Elephant Ear, Peace Lily, Fiddle Leaf, Snake Plant, Pothos, Cactus). 6 traits map plant care needs to human personality: Water (need for affirmation), Root retention (solo recharge), Light (social energy), Humidity (emotional warmth), Temperature (need for stability), Growth rate (pace of life). Quiz produces a pairing — "Monstera meets Chinese Elephant Ear" — with alignment and difference breakdowns.
- **Collaboration model:** "I'm the product partner, Claude Code is the developer." Nikki directed the product decisions; Claude Code built and iterated on the code.
