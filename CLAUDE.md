# CLAUDE.md — portfolio-2026

> Read this file before writing any code. It overrides assumptions from training data.

---

## References

@AGENTS.md — warns that this Next.js version has breaking changes from training data. Read the
docs before writing any code, especially for routing, params, and server components.

---

## Design tone

These words define the aesthetic baseline. Apply them when making any visual or layout decision.

- **Movement** — the design is never static. Layouts imply direction, elements feel mid-motion or just landed. Scroll, wave, kinetic energy is built in.
- **Feels 3D but is 2D** — depth comes from layering: type over image, glass over background, scale shifts. Never literal 3D, always implied. Like an embossed surface or a magazine cover — dimension is felt, not rendered.
- **Editorial** — big confident type, intentional whitespace, photographic texture as the visual hero. Feels like a publication, not a portfolio template. Layouts are composed, not assembled.
- **Minimal warm** — nothing extra, but never cold. The terracotta, the off-white, Poppins at light weights — warmth is baked into the tokens. Restraint is the aesthetic, not a constraint.
- **Tactile** — even on screen, it should feel touchable. Material quality underlies every surface — grain, glass, emboss. Not skeuomorphic, just grounded.

**Visual depth model:** image or texture as the base layer, large editorial type on top, metadata small and secondary. Reference: type-over-dune (Oasis cover), embossed letterform (Coast), card-with-bleed-image (Blue behind the leaves).

**No-gos:** flat color gradients as the primary visual, heavy drop shadows, saturated colors, anything that feels like a SaaS dashboard or Dribbble shot.

---

## Copy rules

These are locked. Do not paraphrase, genericize, or reword without explicit instruction.

- **Hero tagline:** "Designer who builds. Engineer who cares about people."
- **Contact closing:** "If you're building something that matters to people, let's talk."
- **Do not** soften, shorten, or rephrase these lines silently. If a layout change requires
  shorter copy, ask first.
- **Voice overall:** specific over vague, assertive over hedged, no em-dashes, no corporate
  language. One flowing sentence over punchy fragments.

---

## Design tokens

### Colors (`globals.css` → `:root`)

| Token          | Value     | Notes                          |
|----------------|-----------|--------------------------------|
| `--background` | `#F5F1EB` | Warm off-white, page bg        |
| `--foreground` | `#1A1814` | Near-black, primary text       |
| `--midtone`    | `#4A4440` | Secondary text, muted elements |
| `--card`       | `#EDE8E1` | Card surface                   |
| `--border`     | `#DDD6CC` | Borders, dividers              |
| `--accent`     | `#C17B5A` | Terracotta, CTAs, highlights   |
| `--green`      | `#6B8C66` | Success, nature references     |

### Tailwind mapping (`@theme inline` in `globals.css`)

All tokens including `--green` are registered as Tailwind utilities via `--color-*`:
- `--color-background` → `bg-background`, `text-background`
- `--color-foreground` → `bg-foreground`, `text-foreground`
- `--color-midtone` → `bg-midtone`, `text-midtone`
- `--color-card` → `bg-card`, `text-card`
- `--color-border` → `bg-border`, `text-border`
- `--color-accent` → `bg-accent`, `text-accent`
- `--color-green` → `bg-green`, `text-green`

### Typography

- **Font:** Poppins (`next/font/google`)
- **Weights loaded:** 300 (light), 400 (regular), 600 (semibold)
- **CSS variable:** `--font-poppins`
- **Applied to:** `<html>` via `poppins.variable` class in `layout.tsx`
- **Tailwind:** `--font-sans: var(--font-poppins)` registered in `@theme` so `font-sans` resolves to Poppins

### Spacing & sizing

No custom tokens. Pure Tailwind defaults for all spacing, radius, and font-size values.

---

## Stack versions

| Package               | Version  | Notes                                              |
|-----------------------|----------|----------------------------------------------------|
| Next.js               | 16.2.2   | Turbopack, App Router, async params — breaking     |
| React                 | 19.2.4   |                                                    |
| Tailwind CSS          | 4.x      | Config lives in CSS via `@theme {}`, not `tailwind.config.js` |
| Framer Motion         | 12.x     | Breaking changes from v11                          |
| `@anthropic-ai/sdk`   | 0.86.x   |                                                    |
| shadcn/ui             | —        | Not installed. Do not import from it.              |

---

## Stack defaults

- TypeScript + Next.js App Router throughout
- Server components by default — add `"use client"` only when needed
- Use `git mv` for renaming files or assets on macOS (preserves git history)

---

## Dev server

- Runs on port **3000**
- If port 3000 is in use, kill the conflicting process — do not fall back to 3001

---

## UI iteration rules

- For large UI experiments: describe the approach in 1–2 sentences and wait for confirmation before writing any code
- Prefer card or switcher patterns over vertical timelines on mobile

---

## Case study slug map

| Slug                    | Project                                      |
|-------------------------|----------------------------------------------|
| `/case-study/bloom`     | Bloom — plant compatibility app              |
| `/case-study/path-360`  | PATH 360 Feedback (People Leader XD)         |
| `/case-study/sa-xd`     | Performance Platform (Senior Associate)      |
| `/case-study/visn`      | VISN — wearable navigation capstone          |

---

## Image asset locations

```
public/
├── case-study/
│   ├── bloom/       Bloom case study — screenshots + videos (V1 and Evolution phases)
│   ├── visn/        VISN capstone assets
│   └── vpr/         PATH + sa-xd assets
├── nikki.jpg        Hero portrait
└── resume.pdf       Résumé download
```

---

## SurferJourney / journeyData conventions

The files `SurferJourney.tsx` and `journeyData.ts` are actively modified. Key concepts:

`journeyNodes` — the array of nodes that make up the career/project timeline.

Each node has a `type` field with one of three values:

| Type      | Description                                            |
|-----------|--------------------------------------------------------|
| `career`  | A role or job — has employer, dates, title             |
| `project` | A shipped or in-progress project — has case study link |
| `horizon` | A future or aspirational item — marked "Coming Soon"   |

Do not add new node types without confirming first. Do not reorder nodes — the timeline is chronological and order is meaningful.
