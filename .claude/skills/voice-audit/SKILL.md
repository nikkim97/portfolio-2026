---
name: nikki-voice-audit
description: Audit and edit all written content on Nikki's portfolio site (portfolio-2026 / nikkimishra.com) for voice, tone, and copy quality. Use this skill whenever the task involves writing, reviewing, editing, or auditing any user-facing copy in this repo — hero text, case study prose, about page, project descriptions, captions, microcopy, button labels, meta descriptions, alt text. Also use it when asked to "check the tone," "make this sound like me," "audit the site," or when generating any new copy for the site, even a single sentence. If content is being touched, this skill applies.
---

# Nikki Voice Audit

This skill defines Nikki's writing voice and how to audit or edit site copy to match it. It has four parts: the voice (what good sounds like), the two registers (bio voice vs case study voice), the flags (what to catch), and the workflow (how to run an audit and report findings).

## Who is writing

Nikki is a design leader with an engineering background, pivoting toward product leadership at taste-forward companies. Her career throughline: she started as an engineer building credit decisioning systems and kept asking "who's actually on the other end of this?" That question moved her into design. Her portfolio voice is warm, confident, precise, and specific. Short, plain, curious, no perfume. The site should read as a design leader's, not a personal blog: warm and thoughtful is the floor, precise and confident is the bar.

Tone in three words, locked from prior work: **warm, confident, not cute.**

## The voice

**1. Concrete beats abstract, always.**
Specifics do the work that mission statements pretend to. If a sentence could appear on anyone's portfolio, it fails.
- ✗ "My foundation as an engineer was fueled by a lifelong curiosity"
- ✓ "I became an engineer because I've always wanted to know how things work"
- ✗ "I build good for the world"
- ✓ "I surf despite not growing up athletic, and I've hiked volcanoes for the same reason"

**2. Single flowing sentences over choppy fragments (default register).**
Nikki's bio and hero copy favors one sentence that carries a full thought over staccato fragments.
- ✗ "Systems brain. Human heart. Ships things."
- ✓ "I think in systems, design for humans, and build to ship."
Exception: see the case study register below. Do not "fix" intentionally restrained case study prose into flowing sentences.

**3. One clean parallel is strong; stacked parallels are an AI tell.**
"Engineering taught me how things work. Design taught me why people do what they do" earns its keep. Three or more parallel constructions in a row reads as generated text. Flag over-stacked parallels for rewrite.

**4. Name an emotion once, at most.**
Repeating "excited," "passionate," or "love" dilutes it. Usually the specifics convey the feeling and the emotion word can go entirely.

**5. No borrowed internet phrasing.**
Terms like "side quests," "vibes," "unlocked something for me" read as someone else's voice. Exception: "vibe coding" is allowed as a term of art for her building process, but flag it once per audit as a judgment call for formal-audience pages.

**6. Cut throat-clearing and filler subtext.**
Sentences that wind up before saying anything should collapse into the sentence that says the thing. Filler taglines that gesture at meaning without adding it (a previously cut example: "Every project started with a human question") get deleted, not reworded.

**7. Directness over hedging.**
No "I believe," "I feel like," "sort of," "really." State it.

**8. Case studies lead with the human problem, not the job title or output.**
Each project opens with the question being solved (e.g., "How do you make peer feedback feel fair, useful, and human at enterprise scale?"), then the work. Questions as openers are an established pattern of her voice.

**9. No tidy summarizing sentences.**
Wrap-up lines that restate what the reader just read ("Ultimately, this project taught me...") are an AI tell. If a section ends by summarizing itself, cut the summary.

## The two registers

**Bio/hero/about register:** warm, flowing, personal. Full sentences, first person, the greeting warmth ("Hi, I'm Nikki") is a feature, not a flaw. Stripping warmth in favor of cold positioning statements is a known failure mode; do not do it.

**Case study register:** dry, declarative, restrained. Shorter, flatter sentences laid like tiles, with meaning carried in the gaps rather than through connective prose. Do not add lyrical connective tissue or explanatory language to case study prose; the understatement is intentional. The AI tells to remove here are stacked parallels and tidy summaries, not the clipped rhythm itself.

When auditing, identify which register a page belongs to before flagging rhythm issues.

## Hard rules (never violate)

1. **No em-dashes.** Anywhere. Restructure the sentence, use a colon, a comma, or split into two sentences.
2. **No emojis in site copy.** Anywhere, including timeline markers, cards, footers, and decorative glyphs like ✦. They read cute when the site needs to read intentional.
3. **Locked copy — do not edit, do not suggest edits:**
   - Hero line: *"I pay close attention, and I trust what I notice. That's how I've found my way to the work that mattered most."*
   - Contact closing (verify still live before assuming, but treat as locked if present): *"If you're building something that matters to people, let's talk."*
4. **Never silently soften, shorten, or rephrase locked lines.** If a layout change requires shorter copy, ask first.
5. **Never add flattery or softeners to her copy about herself** (no "humbled," "grateful for the opportunity," "lucky enough to").
6. **Surf culture is a personal throughline, not a theme.** It can appear in bio/about content as a fact of her life, and surf imagery can exist as atmosphere. Do not turn it into a metaphor, motif, or extended analogy in the writing.
7. **No corporate language.** Specific over vague, assertive over hedged.

## Flag patterns (catch and rewrite)

| Pattern | Example | Fix approach |
|---|---|---|
| Résumé varnish | "fueled by," "leveraging," "passionate about," "proven track record" | Rewrite as plain speech |
| Mission-statement abstraction | "building good for the world," "making an impact" | Replace with the concrete thing she actually did or made |
| Repeated emotion words | "excited" twice in one paragraph | Keep one or zero; let specifics carry it |
| Choppy fragments in bio register | Three fragments in a row on about/hero | Merge into flowing sentences |
| Over-stacked parallels | Three+ mirrored constructions in a row | Break the pattern, keep at most one parallel |
| Tidy summarizing sentences | "In the end, this experience showed me..." | Cut; end on the last real point |
| Hedges | "I think," "kind of," "just" | Delete or state directly |
| Em-dashes | — | Restructure (hard rule) |
| Emojis / decorative glyphs | 🧭 🌱 ✦ | Remove (hard rule) |
| Internet-borrowed phrasing | "side quests," "living my best life" | Rewrite in her words |
| Corporate design-speak | "delightful experiences," "user-centric solutions," "design thinking" | Say what actually happened |
| Filler subtext / taglines | "Every project started with a human question" | Delete, don't reword |
| Anyone's-portfolio test failures | Sentences with no detail unique to her | Add the specific or cut |
| Passive constructions hiding the actor | "the system was scaled to 70,000 employees" | "I helped scale it from an 800-person pilot to 70,000+ employees" |
| Case study opening with title/output | "As lead designer on PATH..." | Reopen with the human problem or question |

## Calibration examples (real before/after edits she approved)

**Before:** "I feel excited about moving from insight to working product faster than ever with vibe coding - design and engineering are how I stay excited about building good for the world."
**After:** "Vibe coding lets me move from insight to working product faster than ever, and my engineering roots mean I'm not guessing at what's possible. That combination is why I still love building."

**Before:** "Travel is how I feed my curiosity. I'm wired to ask questions... I chase side quests that stretch me, like hiking volcanoes or surfing despite not having grown up athletic."
**After:** "Travel keeps me curious, and so does being a little out of my depth. I surf despite not growing up athletic, and I've hiked volcanoes for the same reason: I'm happiest when something is stretching me."

Note what changed: throat-clearing cut, borrowed phrase removed, emotion carried by specifics, sentences flow instead of fragmenting.

Phrases from her live site that sound like her, for calibration: "I make complex things feel human," "who's actually on the other end of this," "I think in systems, design for humans, and build to ship."

## Audit workflow

When asked to audit the site (or a page, or a component):

1. **Find the content.** Copy lives in page files, components, and any content/data files (check `app/`, `components/`, `content/`, `data/`, MDX files if present). Include microcopy: button labels, nav items, image captions, alt text, meta descriptions, 404 text.
2. **Identify the register per page** (bio/hero/about vs case study) before flagging rhythm issues.
3. **Diagnose before rewriting.** Nikki prefers a diagnosis of what's off before seeing rewritten output. Produce a findings report first:
   - Group findings by page/component.
   - For each finding: file path + line, the current text, which flag pattern it hits, and a proposed rewrite.
   - Order by severity: hard-rule violations first, then voice misses, then nitpicks.
   - Note anything that passes and is strong; do not manufacture findings to seem thorough. A clean page is a valid result.
4. **Wait for approval on the report before making edits**, unless she explicitly says "audit and fix." When fixing, make edits exactly as approved; do not improvise additional "improvements" in the same pass.
5. **Never rewrite locked copy.** If locked copy seems inconsistent with surrounding edits, flag the surrounding copy, not the locked line.
6. **Preserve meaning.** These are voice edits, not content edits. If a factual claim seems wrong or outdated (e.g., employee counts, project scope), flag it separately as a question; do not silently change facts. Canonical facts: PATH 360 scaled from an 800-person pilot to 70,000+ employees.
7. **Alt text and captions have a different bar.** Plain, descriptive, useful; voice rules apply loosely. Clarity wins over personality there.

## Reporting format

```
## Voice Audit: [scope]

### Hard-rule violations
- `app/about/page.tsx:42` — em-dash in "design — and engineering"
  → "design and engineering"

### Voice
- `app/page.tsx:18` — résumé varnish: "passionate about crafting delightful experiences"
  → "I design systems people actually want to use" [or her preferred specific]

### Passes
- Case study intro on /work/path-360 reads in-voice; no changes recommended.

### Questions (facts, not voice)
- `app/about/page.tsx:60` says "60,000 employees"; earlier copy says 70,000+. Which is current?
```

## Tone check for new copy

Before shipping any newly written sentence, run it through:
1. Could this appear on anyone's portfolio? If yes, add a specific or cut.
2. Does it contain an em-dash, emoji, hedge, or emotion word doing repeated work?
3. Read it aloud: does it sound like a person talking?
4. Which register is this? Bio copy flows; case study copy stays restrained.
5. Does it end by summarizing itself? Cut the summary.
If it fails any check, rewrite before presenting.
