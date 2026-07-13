import Link from "next/link";
import { FONT } from "../../components/ui";
import { IntroMetadataSection, SectionLabel, SectionHeading, Screenshot, Prose } from "../../components/caseStudyUI";
import { NextProjectCard, NextProjectLink } from "../../components/ProjectNavigation";

export default function BloomCaseStudy() {
  return (
    <main className="min-h-screen flex flex-col" style={{ background: "var(--background)", color: "var(--foreground)", ...FONT }}>

      {/* Top bar */}
      <div
        className="sticky top-0 z-40 border-b border-[var(--border)]"
        style={{ backgroundColor: "var(--card)" }}
      >
        <div className="max-w-[1260px] mx-auto px-6 sm:px-10 h-12 flex items-center justify-between">
          <Link href="/" className="text-[11px] font-normal tracking-[0.15em] uppercase text-[var(--midtone)] hover:text-[var(--foreground)] transition-colors duration-200">
            ← Back
          </Link>
          <span className="hidden text-[11px] font-normal tracking-[0.15em] uppercase text-[var(--midtone)] md:inline">
            Personal Project · 2026
          </span>
          <NextProjectLink currentHref="/case-study/bloom" />
        </div>
      </div>

      <div className="max-w-[1260px] mx-auto w-full px-6 sm:px-10">

        {/* ── Hero ── */}
        <section className="pt-16 pb-12 flex flex-col gap-6">
          <div className="flex items-center justify-between gap-4">
            <p className="text-[10px] tracking-[0.22em] uppercase text-[var(--accent-text)]">
              Product Design · Vibe Coding
            </p>
            <a
              href="https://plantmatch-six.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-1.5 text-[10px] font-normal tracking-[0.22em] uppercase text-[var(--accent-text)] border-b border-[var(--border)] pb-0.5 hover:border-[var(--accent)] transition-colors duration-200"
            >
              Live prototype ↗
            </a>
          </div>
          <h1
            className="font-light max-w-[1100px]"
            style={{ fontSize: "clamp(32px, calc(5vw - 2px), 52px)", letterSpacing: "-0.03em", lineHeight: 1.14 }}
          >
            Moving in with my partner, I realized I&apos;m a pothos and he&apos;s a snake plant — same space, completely different needs. Bloom turns that into a quiz for couples figuring out how to live together<span style={{ color: "var(--accent)" }}>.</span>
          </h1>
          <IntroMetadataSection
            role="Builder: concept, trait framework, question design, and copy tone"
            timeline="Personal March 2026"
            platform="Web mobile"
            results={[
              { value: "1 day", label: "idea to working app" },
            ]}
          />
        </section>

        {/* ── Hero image ── */}
        <div>
          <Screenshot
            src="/case-study/bloom/hero-new.png"
            aspect="1060/992"
            priority
            label="Hero, Bloom V1 homepage: 'Every relationship has a nature'"
            caption="V1 homepage running on localhost:3000, March 23 2026"
          />
        </div>

        {/* ── The concept (origin + how it works, combined) ── */}
        <section className="pt-14 pb-16 flex flex-col gap-10">
          <div className="flex flex-col gap-5 md:grid md:grid-cols-[1fr_2fr] md:gap-16">
            <div className="flex flex-col gap-2">
              <SectionLabel>The concept</SectionLabel>
              <SectionHeading>A way to talk about our differences without taking them personally</SectionHeading>
            </div>
            <Prose>
              <p>
                It came out of a hard conversation. My partner and I had recently moved in together, deep in the kind of talk every new couple has — why our days run on different rhythms, why the way he recharges isn&apos;t the way I do. The pothos-and-snake-plant line just fell out of me, and something about it made the whole thing easier: his needs were valid, so were mine, and we only had to find the overlap and be gentle about the places we didn&apos;t.
              </p>
              <p>
                That&apos;s the idea Bloom runs on. A Monstera needs full sun and constant water; a cactus thrives on neglect — people run on the same range, even if most compatibility tools never look for it. They ask what you value, or your love language; I wanted Bloom to ask something more honest: not how you&apos;d <em>like</em> to show up for someone, but how you actually do, day to day. So I mapped six plant-care needs onto six human ones — watering became quality time, light became social energy, root space became how much solitude you need before you can show up for someone else.
              </p>
              <p>
                I spent most of the initial work talking to Claude and planning how to make the quiz genuinely useful, because I personally wanted something like this to exist. I put extra effort into mapping the plants, care types, and human equivalents so the result would make emotional sense, not just feel like a cute metaphor.
              </p>
            </Prose>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Screenshot
              src="/case-study/bloom/design-qs.png"
              aspect="1728/1308"
              label="Trait map: plant care needs (water, light, roots, humidity, temp, growth) mapped to human personality equivalents"
              caption="The trait framework: plant care needs mapped to human personality"
            />
            <Screenshot
              src="/case-study/bloom/friction-points.png"
              aspect="2914/1354"
              label="Question design: Claude conversation rebuilding the quiz questions in a warm, non-clinical voice"
              caption="Asking Claude to rebuild the question set in my voice: warm and non-clinical"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Screenshot
              src="/case-study/bloom/quiz1.png"
              aspect="1472/1216"
              label="A live Bloom quiz question, 'After an argument, what helps you feel okay again,' with four answer choices"
              caption="The real quiz: thirteen questions, written to feel like a conversation, not an intake form"
            />
            <Screenshot
              src="/case-study/bloom/quiz2.png"
              aspect="1594/1280"
              label="Individual result: 'You are Monstera, The Expansive One,' with a short character description"
              caption="Your result before your partner's: the plant you are, in plain language"
            />
          </div>
        </section>

        {/* ── The build ── */}
        <section className="py-16 flex flex-col gap-10">
          <div className="flex flex-col gap-5 md:grid md:grid-cols-[1fr_2fr] md:gap-16">
            <div className="flex flex-col gap-2">
              <SectionLabel>The build</SectionLabel>
              <SectionHeading>I'm the product partner. Claude Code is the developer.</SectionHeading>
            </div>
            <Prose>
              <p>
                I set the terms in the very first conversation: I'd own the product thinking — the concept, the trait framework, the questions, the tone of the writing — and Claude would do the building. That line held the whole way through.
              </p>
              <p>
                The concept itself took shape in a live chat. I brought the plant analogy; Claude helped map it onto human behavior, asked sharper questions about what the quiz was really measuring, and pushed the thinking past where I'd taken it alone — surfacing friction points I hadn't yet put words to, like after-work energy and the negotiation of a shared social calendar.
              </p>
              <p>
                Then I opened a terminal, and Claude wrote the entire app in a single pass: quiz data, eight plant profiles, scoring logic, twenty-four suggestion cards, the quiz flow, the results page, the homepage. Watching the file list appear one line at a time is its own particular kind of strange.
              </p>
            </Prose>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Screenshot
              src="/case-study/bloom/scoring-logic.png"
              aspect="1786/982"
              label="Product dialogue: Claude mapping scoring logic and offering to draft the questions or defer to my calls"
              caption="The collaboration in action: Claude proposes the approach, I make the product calls"
            />
            <Screenshot
              src="/case-study/bloom/claude-do.png"
              aspect="1786/1258"
              label="Terminal build: Claude Code writing the full app (quiz data, scoring, UI) in one pass"
              caption="Claude Code building the full app, quiz data, scoring, UI, in one terminal session"
            />
          </div>

        </section>

        {/* ── V1 ── */}
        <section className="py-16 flex flex-col gap-10">
          <div className="flex flex-col gap-5 md:grid md:grid-cols-[1fr_2fr] md:gap-16">
            <div className="flex flex-col gap-2">
              <SectionLabel>V1</SectionLabel>
              <SectionHeading>It worked — but the cards felt like data, not people.</SectionHeading>
            </div>
            <Prose>
              <p>
                The first version worked. The homepage landed exactly where I wanted it — clean and editorial, opening on <em>"Every relationship has a nature"</em> — and the quiz flowed straight through to a results page that set your trait charts beside your partner's.
              </p>
              <p>
                It was fun to experiment and feel my creativity move while using Claude. For the first time, I could combine my engineering foundation with my design instincts and maximize both: shaping the logic, testing the flow, and still caring deeply about whether the experience felt valuable. The best part was taking the quiz with my partner when he came home that same day.
              </p>
            </Prose>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Screenshot
              src="/case-study/bloom/hero2.2.png"
              aspect="1732/1390"
              label="V1 results page: Monstera meets Chinese Elephant Ear, two partner cards side by side"
              caption="V1 results page: correct, but more data display than emotional resonance"
            />
            <Screenshot
              src="/case-study/bloom/02.b.png"
              aspect="1536/1372"
              label="V1 cards flipped to reveal short descriptions and trait bars, accurate but surface-level"
              caption="Cards flipped to reveal the writing: the trait bars were right, but it read like data, not a mirror"
            />
          </div>

        </section>

        {/* ── Evolution ── */}
        <section className="py-16 flex flex-col gap-10">
          <div className="flex flex-col gap-5 md:grid md:grid-cols-[1fr_2fr] md:gap-16">
            <div className="flex flex-col gap-2">
              <SectionLabel>Evolution</SectionLabel>
              <SectionHeading>Three days later, I came back and closed the gap.</SectionHeading>
            </div>
            <Prose>
              <p>
                After testing with friends and coworkers, I had fun playing with the formatting, but the bigger opportunity was the voice. The quiz could not frame one partner as the easy plant and another as the difficult one — a cactus is not worse than a monstera; it just needs different care.
              </p>
              <p>
                That language mattered. Everyone is unique, and god knows there are enough differences in the world; I wanted Bloom to help people feel understood instead of categorized. So the descriptions became more affirming, careful, and specific — written to make each person feel acceptable as they are.
              </p>
              <p>
                I also added a similar/different section so couples could better understand who they were to each other: where their care needs aligned, where they diverged, and how to talk about those differences without making either person the problem.
              </p>
            </Prose>
          </div>

          <div>
            <Screenshot
              src="/case-study/bloom/quiz3.png"
              aspect="1604/1356"
              label="Evolved results: Monstera meets Pothos, both cards rewritten as character portraits with trait bars"
              caption="The evolved pairing, Monstera meets Pothos: cards that read like portraits, not profiles"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Screenshot
              src="/case-study/bloom/quiz4.png"
              aspect="1594/1276"
              label="'Where you align': shared strengths explained in plain language with practical advice"
              caption="'Where you align': what you share, interpreted, not just matched"
            />
            <Screenshot
              src="/case-study/bloom/quiz5.png"
              aspect="1600/1218"
              label="'Where you're different': differences framed as things worth knowing, with a concrete suggestion"
              caption="'Where you're different': the gaps, reframed as things worth knowing about"
            />
          </div>

          <div>
            <Screenshot
              src="/case-study/bloom/evo-terminal.png"
              aspect="2110/200"
              label="Terminal: Claude confirming iteration complete: 'Check localhost:3000, run a quiz and see if the results feel more nuanced'"
              caption="'All three files updated. Check localhost:3000, run a quiz and see if the results feel more nuanced.'"
            />
          </div>

        </section>

        {/* ── Takeaway ── */}
        <section className="py-16 flex flex-col gap-10">
          <div className="flex flex-col gap-5 md:grid md:grid-cols-[1fr_2fr] md:gap-16">
            <div className="flex flex-col gap-2">
              <SectionLabel>What I learned</SectionLabel>
              <SectionHeading>I&apos;m an ideas person. I finally got to work like one.</SectionHeading>
            </div>
            <Prose>
              <p>
                In an enterprise environment, getting an interaction out of my head and into something real meant routing through a stack of tools and a stack of people — and most of my ideas died in that distance. Building Bloom, I could work the way I actually think: try a flow, feel it, scrap it, try another, making the calls myself in real time. I explored more interaction ideas in a few weeks than I had in years of structured work.
              </p>
              <p>
                For a long time, the thing standing between an idea and a working version of it was a learning curve — knowing the right tools, in the right order, well enough. With that barrier gone, the only thing left in the way was my own judgment — which is exactly where I want the work to live.
              </p>
              <p>
                It showed up most in the small calls. When a pairing came back with almost nothing to set the two apart, I didn&apos;t accept the empty <em>&ldquo;where you differ&rdquo;</em> section — I dug into why. The data was right; the experience wasn&apos;t. So I made the call: when two people align that closely, name it and make it a moment — <em>&ldquo;you&apos;re remarkably well-matched&rdquo;</em> — instead of leaving a hole. I was steering the product the whole way; the build kept pace.
              </p>
              <p>
                Bloom came straight out of my own life, and that&apos;s the part that&apos;s stuck. Nearly every couple I show it to asks me to buy the domain and send it to them — not as a gag, but because they genuinely want it for their own relationship. The thing my partner and I were navigating, it turns out, is something a lot of people are quietly working out too.
              </p>
            </Prose>
          </div>
        </section>

        <NextProjectCard currentHref="/case-study/bloom" />

        {/* ── Footer ── */}
        <footer className="py-10 flex flex-wrap items-center justify-between gap-2">
          <p className="text-[10px] font-light text-[var(--midtone)] tracking-wide">© 2026 Niharika Mishra</p>
          <Link
            href="/"
            className="text-[11px] font-normal tracking-[0.2em] uppercase text-[var(--midtone)] hover:text-[var(--foreground)] border-b border-[var(--border)] pb-0.5 hover:border-[var(--foreground)] transition-colors duration-200"
          >
            ← Back to portfolio
          </Link>
        </footer>
      </div>
    </main>
  );
}
