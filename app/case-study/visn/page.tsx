import Link from "next/link";
import { FONT } from "../../components/ui";
import { IntroMetadataSection } from "../../components/caseStudyUI";
import { NextProjectCard, NextProjectLink } from "../../components/ProjectNavigation";
import { caseStudyMetadata } from "../../lib/siteMetadata";

export const metadata = caseStudyMetadata({
  title: "VISN",
  description:
    "A wearable that combines obstacle detection and audio route guidance, making navigation without sight a solvable design problem.",
  slug: "visn",
});
import { SystemDiagram } from "./_components/AppMockup";
import ZoomableImage from "./_components/ZoomableImage";

const PROSE = "prose font-light leading-[1.8] text-[16px] sm:text-[18px]";
const LABEL = "text-[10px] tracking-[0.28em] uppercase";
const SECTION_HEADING = { fontSize: "clamp(20px, 2.2vw, 28px)", letterSpacing: "-0.02em", lineHeight: 1.25 };

export default function VisnCaseStudy() {
  return (
    <main style={{ background: "var(--background)", color: "var(--foreground)", ...FONT }}>

      {/* ── Top bar ── */}
      <div className="sticky top-0 z-40" style={{ backgroundColor: "var(--card)", maskImage: "linear-gradient(to bottom, #000 62%, transparent 100%)", WebkitMaskImage: "linear-gradient(to bottom, #000 62%, transparent 100%)" }}>
        <div className="max-w-[1260px] mx-auto px-6 sm:px-10 h-12 flex items-center justify-between">
          <Link href="/" className="text-[11px] font-normal tracking-[0.15em] uppercase text-[var(--midtone)] hover:text-[var(--foreground)] transition-colors duration-200">← Back</Link>
          <span className="hidden text-[11px] font-normal tracking-[0.15em] uppercase text-[var(--midtone)] md:inline">Rutgers University · Jan – May 2019</span>
          <NextProjectLink currentHref="/case-study/visn" />
        </div>
      </div>

      {/* ── Hero text ── */}
      <div className="max-w-[1260px] mx-auto px-6 sm:px-10 pt-16 pb-12 flex flex-col gap-6">
        <p className={`${LABEL} text-[var(--accent-text)]`}>PM & Engineer</p>
        <h1 className="font-light max-w-[1100px]" style={{ fontSize: "clamp(32px, calc(5vw - 2px), 52px)", letterSpacing: "-0.03em", lineHeight: 1.14 }}>
          Navigation without sight is a design problem. I designed a wearable tool that combined obstacle detection & route guidance through audio<span style={{ color: "var(--accent)" }}>.</span>
        </h1>
        <IntroMetadataSection
          role="PM & Engineer"
          timeline="Rutgers University · Jan – May 2019"
          platform="Wearable hardware + software"
          results={[
            { value: "2nd", label: "of 60 teams · capstone competition" },
            { value: "5m", label: "obstacle-detection range" },
          ]}
        />
      </div>

      {/* ── Hero image ── */}
      <div className="max-w-[1260px] mx-auto px-6 sm:px-10 pb-0">
        <figure className="flex flex-col gap-4">
          <ZoomableImage
            src="/visn/hero-image.webp"
            alt="VISN hero image"
            width={1818}
            height={794}
            aspectRatio="1818/794"
            fit="contain"
            sizes="(max-width: 1024px) 100vw, 896px"
          />
        </figure>
      </div>

      {/* ── The Problem ── */}
      <div className="max-w-[1260px] mx-auto px-6 sm:px-10">
        <section className="py-16 flex flex-col gap-10">
          <div className="flex flex-col gap-5 md:grid md:grid-cols-[1fr_2fr] md:gap-16">
            <div className="flex flex-col gap-2">
              <p className={`${LABEL} text-[var(--accent-text)]`}>The problem</p>
              <h2 className="font-light" style={SECTION_HEADING}>Navigation without sight is a design problem</h2>
            </div>
            <div className="flex flex-col gap-8">
              <div className={`${PROSE}`} style={{ color: "var(--body)" }}>
                <p>Visually impaired people navigate the world with a combination of memory, muscle memory, and whatever technology they can afford: canes, guide dogs, and a handful of smart devices that each solve part of the problem but none of it completely.</p>
                <p>Existing solutions like SUNU (a sonar wristband) or Google Lookout didn&apos;t exist back in 2019. No single system combined real-time object proximity, directional awareness, and turn-by-turn navigation in one wearable, accessible package.</p>
                <p>We wanted to build that. A system that could tell you: where you're going, what's in your way, and which direction you're facing, all through your ears, hands-free.</p>
                <p>At 21 I scoped this as a hardware gap: what the sensors could detect. What I&apos;d frame now is the user&apos;s gap: blind travelers navigate the familiar fluently; it&apos;s the unfamiliar that breaks down.</p>
              </div>
            </div>
          </div>

          <figure className="flex flex-col gap-3">
            <ZoomableImage
              src="/visn/visn-poster.webp"
              alt="VISN project poster presentation"
              width={988}
              height={758}
              aspectRatio="16/9"
              fit="cover"
              sizes="(max-width: 1024px) 100vw, 896px"
            />
          </figure>
        </section>

        {/* ── The System ── */}
        <section className="py-16 flex flex-col gap-10">
          <div className="flex flex-col gap-5 md:grid md:grid-cols-[1fr_2fr] md:gap-16">
            <div className="flex flex-col gap-2">
              <p className={`${LABEL} text-[var(--accent-text)]`}>The approach</p>
              <h2 className="font-light" style={SECTION_HEADING}>One system, two layers</h2>
            </div>
            <div className={`${PROSE}`} style={{ color: "var(--body)" }}>
              <p>VISN was a hardware-software system designed to work as one. The hardware lived on the body; the software ran on the user's phone; they communicated over Bluetooth in near real-time.</p>
              <p><strong>Hardware.</strong> An Arduino Nano, four Maxbotix ultrasonic sensors, a magnetometer (compass), and an HC-06 Bluetooth module, all wired into a breadboard circuit and enclosed in a fanny pack worn on the chest. The sensors measured the distance and angle to objects in the user's path. The compass tracked the direction they were facing. All of it streamed to the app.</p>
              <p><strong>Software.</strong> An Android app built in Android Studio. It pulled Google Maps data for turn-by-turn directions and layered in the live hardware stream, so as the user walked, they heard both their route and real-time obstacle alerts: "Object 3 feet ahead. Please move."</p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <figure className="flex flex-col gap-2">
              <ZoomableImage
                src="/visn/visn-circuit.webp"
                alt="VISN circuit diagram with Arduino Nano and sensors"
                width={951}
                height={436}
                aspectRatio="951/436"
                fit="contain"
                sizes="(max-width: 1024px) 100vw, 896px"
                background="var(--card)"
              />
              <figcaption className="text-[10px] font-light text-[var(--midtone)] tracking-wide">Circuit diagram: Arduino Nano, four ultrasonic sensors, magnetometer, HC-06 Bluetooth module</figcaption>
            </figure>
          </div>
        </section>

        {/* ── The Form Factor ── */}
        <section className="py-16 flex flex-col gap-10">
          <div className="flex flex-col gap-5 md:grid md:grid-cols-[1fr_2fr] md:gap-16">
            <div className="flex flex-col gap-2">
              <p className={`${LABEL} text-[var(--accent-text)]`}>The design</p>
              <h2 className="font-light" style={SECTION_HEADING}>The decision that mattered the most</h2>
            </div>
            <div className={`${PROSE}`} style={{ color: "var(--body)" }}>
              <p>We tried a harness first. It held the hardware well: good sensor angles, stable on the body. But it was heavy, conspicuous, and made people feel more disabled, not less. That wasn't acceptable.</p>
              <p>The fanny pack was the answer. Worn on the chest, it gave the sensors the right field of view without restricting movement. It was familiar, lightweight, and, critically, something a person might choose to wear anyway. It didn't announce that you needed help.</p>
              <p>That decision shaped how I think about assistive technology. The best tools disappear into the life of the person using them. Dignity is a design requirement.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <figure className="flex flex-col gap-3">
              <ZoomableImage
                src="/visn/visn2.webp"
                alt="VISN wearable: red fanny pack on a mannequin, labeled with multi-element ultrasonic sensors, Arduino Nano processing unit, 9-axis gyroscope/IMU, internal Li-ion battery, and power-status LEDs"
                width={1024}
                height={741}
                aspectRatio="1024/741"
                fit="contain"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <figcaption className="text-[10px] font-light text-[var(--midtone)] tracking-wide">The wearable setup: sensors, Arduino, and compass inside a fanny pack worn on the chest; the Android app handled navigation and obstacle alerts</figcaption>
            </figure>

            <figure className="flex flex-col gap-4">
              <div
                className="rounded-2xl px-6 sm:px-10 py-10 sm:py-12 h-full"
                // Fixed light panel: the diagram is a hand-colored illustration
                // (#4A4440 ink), so it stays on a light figure background in dark mode.
                style={{ background: "#D5CFC0" }}
              >
                <SystemDiagram />
              </div>
              <figcaption className="text-[10px] font-light text-[var(--midtone)] tracking-wide text-center max-w-[60ch] mx-auto">
                Current VISN architecture: wearable sensing, phone intelligence, and non-visual guidance working as one loop.
              </figcaption>
            </figure>
          </div>
        </section>

        {/* ── What We Shipped ── */}
        <section className="py-16 flex flex-col gap-10">
          <div className="flex flex-col gap-5 md:grid md:grid-cols-[1fr_2fr] md:gap-16">
            <div className="flex flex-col gap-2">
              <p className={`${LABEL} text-[var(--accent-text)]`}>Outcome</p>
              <h2 className="font-light" style={SECTION_HEADING}>We won our capstone.</h2>
            </div>
            <div className={`${PROSE}`} style={{ color: "var(--body)" }}>
              <p>We shipped a working end-to-end system: real route guidance from the app, live obstacle detection from the wearable, and a reliable Bluetooth link between the two. In outdoor tests, the experience held together in real walking conditions.</p>
              <p>We were also explicit about what was incomplete. Directional left/right guidance from the magnetometer was not production-ready by demo day, indoor positioning remained unreliable, and moving-obstacle handling was out of scope for the capstone timeline.</p>
              <p>The outcome was clear: the project direction worked. For four people in four months, it was proof that the core system was valuable, feasible, and worth taking further.</p>
            </div>
          </div>
        </section>

        {/* ── Reflection + Redesign ── */}
        <section className="py-16 flex flex-col gap-12 border-b border-[var(--border)]">
          <div className="flex flex-col gap-5 md:grid md:grid-cols-[1fr_2fr] md:gap-16">
            <div className="flex flex-col gap-2">
              <p className={`${LABEL} text-[var(--accent-text)]`}>Reflection</p>
              <h2 className="font-light" style={SECTION_HEADING}>If I built VISN today</h2>
            </div>
            <div className={`${PROSE}`} style={{ color: "var(--body)" }}>
              <p>Here's what I didn't know at the time: product design existed as a discipline. I was the project manager and the engineer on this team, and I thought that was the whole job. The fanny pack call, the audio-first interface, the decision to build around dignity, those came from instinct, not training.</p>
              <p>I still think those instincts were right. But I can see now how much further we could have taken them with the tools I've learned since. Seven years later, some of what I'd change is technical: the hardware is smaller, the sensors are better, indoor positioning actually works. But most of what I'd change is about the experience itself, starting with the work it takes to earn it: I&apos;d shadow how blind travelers already move through a route they know by heart, then design only for the gap between that and an unfamiliar one, instead of scoping for &ldquo;navigation&rdquo; in the abstract and letting the hardware decide what the product was.</p>
            </div>
          </div>

          <figure className="flex flex-col gap-4">
            <ZoomableImage
              src="/visn/visn-hero1.webp"
              alt="VISN hero image"
              width={1272}
              height={640}
              aspectRatio="1272/640"
              fit="contain"
              sizes="(max-width: 1024px) 100vw, 896px"
              background="var(--card)"
            />
          </figure>

        </section>

        <NextProjectCard currentHref="/case-study/visn" />

        {/* ── Footer ── */}
        <footer className="py-10 flex flex-wrap items-center justify-between gap-2">
          <p className="text-[10px] font-light text-[var(--midtone)] tracking-wide">© 2026 Niharika Mishra</p>
          <Link href="/" className="text-[11px] font-normal tracking-[0.2em] uppercase text-[var(--midtone)] hover:text-[var(--foreground)] border-b border-[var(--border)] pb-0.5 hover:border-[var(--foreground)] transition-colors duration-200">
            ← Back to portfolio
          </Link>
        </footer>
      </div>
    </main>
  );
}
