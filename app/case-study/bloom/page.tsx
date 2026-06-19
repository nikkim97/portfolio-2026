import Link from "next/link";
import { FONT } from "../../components/ui";
import { IntroMetadataSection, SectionLabel, SectionHeading, Screenshot, Prose, PullQuote } from "../../components/caseStudyUI";

export default function BloomCaseStudy() {
  return (
    <main className="min-h-screen flex flex-col" style={{ background: "var(--background)", color: "var(--foreground)", ...FONT }}>

      {/* Top bar */}
      <div
        className="sticky top-0 z-40 border-b border-[var(--border)]"
        style={{ backgroundColor: "rgba(245,241,235,0.92)", backdropFilter: "blur(12px)" }}
      >
        <div className="max-w-[1260px] mx-auto px-6 sm:px-10 h-12 flex items-center justify-between">
          <Link href="/" className="text-[11px] font-normal tracking-[0.15em] uppercase text-[var(--midtone)] hover:text-[var(--foreground)] transition-colors duration-200">
            ← Back
          </Link>
          <span className="text-[11px] font-normal tracking-[0.15em] uppercase text-[var(--midtone)]">
            Personal Project · 2026
          </span>
        </div>
      </div>

      <div className="max-w-[1260px] mx-auto w-full px-6 sm:px-10">

        {/* ── Hero ── */}
        <section className="pt-16 pb-12 flex flex-col gap-6">
          <p className="text-[10px] tracking-[0.22em] uppercase text-[var(--accent)]">
            Product Design · Vibe Coding
          </p>
          <h1
            className="font-light max-w-[1100px]"
            style={{ fontSize: "clamp(32px, calc(5vw - 2px), 52px)", letterSpacing: "-0.03em", lineHeight: 1.14 }}
          >
            Most compatibility tools flatten people into generic traits. I used plant care as a warmer metaphor for emotional needs, daily rhythms, and relationship fit<span style={{ color: "var(--accent)" }}>.</span>
          </h1>
          <IntroMetadataSection
            role="Product partner: concept, trait framework, question design, and copy tone"
            timeline="March 2026: two sessions, three days apart"
            platform="Web app"
            results={[
              { value: "1 day", label: "idea to working app" },
              { value: "8", label: "plant archetypes" },
              { value: "6", label: "personality traits" },
            ]}
          />
        </section>

        {/* ── Hero image ── */}
        <div>
          <Screenshot
            label="Hero, Bloom V1 homepage: 'Every relationship has a nature'"
            caption="V1 homepage running on localhost:3000, March 23 2026"
          />
        </div>

        {/* ── The concept ── */}
        <section className="py-16 flex flex-col gap-10">
          <div className="flex flex-col gap-5 md:grid md:grid-cols-[1fr_2fr] md:gap-16">
            <div className="flex flex-col gap-2">
              <SectionLabel>The concept</SectionLabel>
              <SectionHeading>Plant care needs are surprisingly good metaphors for people</SectionHeading>
            </div>
            <Prose>
              <p>
                A Monstera needs full sun and constant water. A Cactus thrives on neglect. Most compatibility tools ask about values or love languages. Bloom asks about emotional metabolism: how you actually function day to day, not how you'd like to.
              </p>
              <p>
                Six plant traits map to six human ones. Water frequency becomes how often someone needs quality time and connection. Light needs map to social energy: full sun is extrovert, low light is introvert. Root retention is how much alone time you need before you can show up for others. Temperature sensitivity is your need for stability versus capacity to handle change.
              </p>
              <p>
                You answer 13 questions. The algorithm scores you against 8 plant archetypes and finds your closest match. Then your partner does the same. The result is a pairing, <em>Monstera meets Chinese Elephant Ear</em>, with a breakdown of where you align and where you're different, and what to do about it.
              </p>
            </Prose>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Screenshot
              label="Trait map: plant care needs (water, light, roots, humidity, temp, growth) mapped to human personality equivalents"
              caption="The trait framework: plant care needs mapped to human personality"
            />
            <Screenshot
              label="Question design: Claude conversation rebuilding the quiz questions in a warm, non-clinical voice"
              caption="Asking Claude to rebuild the question set in my voice: warm and non-clinical"
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
                I established the collaboration model in the first conversation. I handled the product thinking: the concept, the trait framework, the question design, the copy tone. Claude built everything.
              </p>
              <p>
                The concept came out of a live chat where I brought the plant analogy and Claude helped map it to human behavior, asked sharper questions about what the quiz was really measuring, and pushed the product thinking further than I'd taken it alone, surfacing real relationship friction points like after-work energy management and social calendar negotiation that I hadn't articulated yet.
              </p>
              <p>
                Then I opened a terminal. Claude wrote the entire app in one pass: quiz data, 8 plant profiles, scoring logic, 24 suggestion cards, quiz flow, results page, homepage. Watching the file list appear one by one is a particular kind of strange.
              </p>
            </Prose>
          </div>

          <PullQuote>
            "Think of it like: I'm the product partner, Claude Code is the developer. You're the founder talking to both."
          </PullQuote>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Screenshot
              label="Collaboration model: Claude establishing 'I'm the product partner, Claude Code is the developer'"
              caption="The collaboration model, established in the first session"
            />
            <Screenshot
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
              <SectionHeading>Functional. But the cards felt like data, not people.</SectionHeading>
            </div>
            <Prose>
              <p>
                V1 worked. The homepage was clean and editorial: <em>"Every relationship has a nature."</em> The quiz flowed. The results page paired you with another plant and showed trait bar charts side by side.
              </p>
              <p>
                But the results felt surface-level. The trait bars were accurate, they were doing the right job, but they didn't tell you anything meaningful about <em>who you were</em> as that plant. You got data. You didn't get a mirror.
              </p>
              <p>
                There was also a moment that looked like a bug but wasn't. Claude debugged why two plants were showing no differences: <em>"It's not a bug, it's the data. Look at their trait matrices side by side."</em> Monstera and Chinese Elephant Ear scored within one point on seven out of seven traits. They really were almost identical. Claude offered to handle it gracefully. I directed how.
              </p>
            </Prose>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Screenshot
              label="V1 results page: Monstera meets Chinese Elephant Ear with trait bar charts side by side"
              caption="V1 results page: correct, but more data display than emotional resonance"
            />
            <Screenshot
              label="V1 results with plant cards flipped: descriptions visible but writing still surface-level"
              caption="Cards flipped to reveal descriptions: the writing needed to be richer"
            />
          </div>

          <div>
            <Screenshot
              label="Debug moment: Claude identifying that two plants scoring identically isn't a bug, it's the data"
              caption="'It's not a bug, it's the data.' Claude acting like a product partner, not just a code executor"
            />
          </div>

        </section>

        {/* ── Evolution ── */}
        <section className="py-16 flex flex-col gap-10">
          <div className="flex flex-col gap-5 md:grid md:grid-cols-[1fr_2fr] md:gap-16">
            <div className="flex flex-col gap-2">
              <SectionLabel>Evolution</SectionLabel>
              <SectionHeading>Three days later. Two things changed. The gap closed.</SectionHeading>
            </div>
            <Prose>
              <p>
                I came back with a clear list of what felt off. The plant cards needed to feel like portraits, not profiles. And the compatibility section needed to do actual interpretive work, not just surface the data, but tell you what it meant.
              </p>
              <p>
                Plant descriptions became character studies. <em>"You don't open up for just anyone, and that's not a flaw, it's discernment. When the conditions are right you are one of the most loving, attentive partners there is. The person who takes the time to understand you gets something truly rare."</em> That's a different thing to read than a bar chart.
              </p>
              <p>
                The compatibility breakdown split into <em>Where you align</em> and <em>Where you're different.</em> Not just which traits matched, but what that means in practice, with practical pull quotes as advice. <em>"Keep checking in even when things are good. The couples who stay emotionally close aren't the ones who talk when things are hard. They're the ones who never fully stop talking."</em>
              </p>
              <p>
                The iteration loop: Claude built, I reviewed on localhost, I redirected or approved. Three files. Fifty seconds of thinking. Meaningfully better.
              </p>
            </Prose>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Screenshot
              label="Evolved plant cards: descriptions rewritten as character portraits, not trait profiles"
              caption="Plant cards after iteration: descriptions that read like portraits, not profiles"
            />
            <Screenshot
              label="'Where you align / Where you're different' compatibility breakdown with practical pull-quote advice"
              caption="'Where you align / Where you're different': interpretation, not just data"
            />
          </div>

          <div>
            <Screenshot
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
              <SectionHeading>The bottleneck shifted. The work didn't disappear.</SectionHeading>
            </div>
            <Prose>
              <p>
                Vibe coding isn't about typing less code. It's a different kind of creative work: you're directing rather than building, which means the bottleneck shifts from implementation to decision-making.
              </p>
              <p>
                The places I spent real time: the concept, the trait framework, the question design, the copy tone. Not scaffolding. Claude can build scaffolding. What it can't tell you is whether the quiz questions feel like an interrogation or a conversation, or whether the results page earns the emotional weight it's asking for. That judgment is still yours.
              </p>
              <p>
                What surprised me most was the debugging moment. <em>"It's not a bug, it's the data."</em> Claude looked at the trait matrices, identified the real issue, and offered a solution that was actually better than what I'd have reached for. That was Claude acting like a product partner. I didn't fully expect it, and it's changed how I think about what these tools are actually good at.
              </p>
              <p>
                If I were doing it again: I'd define the visual design more intentionally upfront. The aesthetic emerged fine, but I made reactionary decisions rather than intentional ones. Next time I'd spec the design system before the first build command.
              </p>
            </Prose>
          </div>
        </section>

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
