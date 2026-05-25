import Link from "next/link";
import { FONT, GLASS } from "../../components/ui";
import { SystemDiagram } from "./_components/AppMockup";
import ZoomableImage from "./_components/ZoomableImage";

const PROSE = "prose text-sm font-light leading-[1.85]";
const LABEL = "text-[10px] tracking-[0.28em] uppercase";
const SECTION_HEADING = { fontSize: "clamp(18px, 2vw, 26px)", letterSpacing: "-0.02em", lineHeight: 1.25 };

function Metrics({ label = "Outcomes", stats }: { label?: string; stats: { value: string; label: string }[] }) {
  return (
    <div className="flex flex-col gap-4 pb-2 border-b border-[var(--border)]">
      <p className={`${LABEL} text-[var(--midtone)]`}>{label}</p>
      <div className="flex flex-wrap gap-8">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col gap-1">
            <p className="font-light tabular-nums" style={{ fontSize: "clamp(28px, 3.5vw, 44px)", letterSpacing: "-0.03em", color: "var(--accent)" }}>{s.value}</p>
            <p className="text-[11px] font-light tracking-wide" style={{ color: "var(--midtone)" }}>{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function VisnCaseStudy() {
  return (
    <main style={{ background: "var(--background)", color: "var(--foreground)", ...FONT }}>

      {/* ── Top bar ── */}
      <div className="sticky top-0 z-40 border-b border-[var(--border)]" style={{ backgroundColor: "rgba(245,241,235,0.92)", backdropFilter: "blur(12px)" }}>
        <div className="max-w-5xl mx-auto px-6 sm:px-16 h-12 flex items-center justify-between">
          <Link href="/" className="text-[11px] font-normal tracking-[0.15em] uppercase text-[var(--midtone)] hover:text-[var(--foreground)] transition-colors duration-200">← Back</Link>
          <span className="text-[11px] font-normal tracking-[0.15em] uppercase text-[var(--midtone)]">Rutgers University · Jan – May 2019</span>
        </div>
      </div>

      {/* ── Hero text ── */}
      <div className="max-w-5xl mx-auto px-6 sm:px-16 pt-16 pb-12 flex flex-col gap-6">
        <p className={`${LABEL} text-[var(--accent)]`}>PM & Designer · Rutgers Capstone · Team of 4</p>
        <h1 className="font-light" style={{ fontSize: "clamp(32px, 5vw, 64px)", letterSpacing: "-0.03em", lineHeight: 1.05, maxWidth: "16ch" }}>
          VISN<span style={{ color: "var(--accent)" }}>.</span>
        </h1>
        {/* Context card — problem statement / role | platform / timeline */}
        <div className="grid grid-cols-1 sm:grid-cols-[2fr_1fr] rounded-2xl overflow-hidden" style={GLASS}>
          <div className="flex flex-col gap-5 p-6">
            <div className="flex flex-col gap-2">
              <p className={`${LABEL} text-[var(--midtone)]`}>Problem statement</p>
              <p className="font-light text-sm leading-relaxed" style={{ color: "#3A3530" }}>
                No single wearable combined real-time object proximity, directional awareness, and turn-by-turn navigation in one accessible package. Could we tell someone who is visually impaired where they're going and what's in the way — all through their ears?
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <p className={`${LABEL} text-[var(--midtone)]`}>Role</p>
              <p className="font-light text-sm leading-relaxed" style={{ color: "#3A3530" }}>
                PM & designer on a team of 4 — led product direction, owned the UX and interface design, and shaped the hardware and system design of the wearable.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-5 p-6 sm:border-l border-[var(--border)]">
            <div className="flex flex-col gap-1">
              <p className={`${LABEL} text-[var(--midtone)]`}>Platform</p>
              <p className="font-light text-sm" style={{ color: "#3A3530" }}>Wearable hardware + software</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className={`${LABEL} text-[var(--midtone)]`}>Timeline</p>
              <p className="font-light text-sm" style={{ color: "#3A3530" }}>Rutgers University · Jan – May 2019</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Hero image ── */}
      <div className="max-w-5xl mx-auto px-6 sm:px-16 pb-0">
        <figure className="flex flex-col gap-4">
          <ZoomableImage
            src="/visn/hero-image.png"
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
      <div className="max-w-5xl mx-auto px-6 sm:px-16">
        <section className="py-16 flex flex-col gap-10 border-b border-[var(--border)]">
          <div className="flex flex-col gap-5 md:grid md:grid-cols-[1fr_2fr] md:gap-16">
            <div className="flex flex-col gap-2">
              <p className={`${LABEL} text-[var(--accent)]`}>The problem</p>
              <h2 className="font-light" style={SECTION_HEADING}>Navigation without sight is a design problem</h2>
            </div>
            <div className="flex flex-col gap-8">
              <Metrics stats={[
                { value: "2nd", label: "of 60 teams · capstone competition" },
                { value: "5m", label: "obstacle-detection range" },
              ]} />
              <div className={`${PROSE}`} style={{ color: "#3A3530" }}>
                <p>Visually impaired people navigate the world with a combination of memory, muscle memory, and whatever technology they can afford — canes, guide dogs, and a handful of smart devices that each solve part of the problem but none of it completely.</p>
                <p>Existing solutions like SUNU (a sonar wristband) or Google Lookout could detect nearby objects or read aloud what a camera saw. But no single system combined real-time object proximity, directional awareness, and turn-by-turn navigation in one wearable, accessible package.</p>
                <p>We wanted to build that. A system that could tell you: where you're going, what's in your way, and which direction you're facing — all through your ears, hands-free.</p>
              </div>
            </div>
          </div>

          <figure className="flex flex-col gap-3">
            <ZoomableImage
              src="/visn/visn-poster.png"
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
        <section className="py-16 flex flex-col gap-10 border-b border-[var(--border)]">
          <div className="flex flex-col gap-5 md:grid md:grid-cols-[1fr_2fr] md:gap-16">
            <div className="flex flex-col gap-2">
              <p className={`${LABEL} text-[var(--accent)]`}>The approach</p>
              <h2 className="font-light" style={SECTION_HEADING}>One system, two layers</h2>
            </div>
            <div className={`${PROSE}`} style={{ color: "#3A3530" }}>
              <p>VISN was a hardware-software system designed to work as one. The hardware lived on the body; the software ran on the user's phone; they communicated over Bluetooth in near real-time.</p>
              <p><strong>Hardware.</strong> An Arduino Nano, four Maxbotix ultrasonic sensors, a magnetometer (compass), and an HC-06 Bluetooth module — all wired into a breadboard circuit and enclosed in a fanny pack worn on the chest. The sensors measured the distance and angle to objects in the user's path. The compass tracked the direction they were facing. All of it streamed to the app.</p>
              <p><strong>Software.</strong> An Android app built in Android Studio. It pulled Google Maps data for turn-by-turn directions and layered in the live hardware stream — so as the user walked, they heard both their route and real-time obstacle alerts: "Object 3 feet ahead. Please move."</p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <figure className="flex flex-col gap-2">
              <ZoomableImage
                src="/visn/visn-circuit.png"
                alt="VISN circuit diagram with Arduino Nano and sensors"
                width={951}
                height={436}
                aspectRatio="951/436"
                fit="contain"
                sizes="(max-width: 1024px) 100vw, 896px"
                background="var(--card)"
              />
              <figcaption className="text-[10px] font-light text-[var(--midtone)] tracking-wide">Circuit diagram — Arduino Nano, four ultrasonic sensors, magnetometer, HC-06 Bluetooth module</figcaption>
            </figure>
          </div>
        </section>

        {/* ── The Form Factor ── */}
        <section className="py-16 flex flex-col gap-10 border-b border-[var(--border)]">
          <div className="flex flex-col gap-5 md:grid md:grid-cols-[1fr_2fr] md:gap-16">
            <div className="flex flex-col gap-2">
              <p className={`${LABEL} text-[var(--accent)]`}>The design</p>
              <h2 className="font-light" style={SECTION_HEADING}>The decision that mattered the most</h2>
            </div>
            <div className={`${PROSE}`} style={{ color: "#3A3530" }}>
              <p>We tried a harness first. It held the hardware well — good sensor angles, stable on the body. But it was heavy, conspicuous, and made people feel more disabled, not less. That wasn't acceptable.</p>
              <p>The fanny pack was the answer. Worn on the chest, it gave the sensors the right field of view without restricting movement. It was familiar, lightweight, and — critically — something a person might choose to wear anyway. It didn't announce that you needed help.</p>
              <p>That decision shaped how I think about assistive technology. The best tools disappear into the life of the person using them. Dignity is a design requirement.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-6">
            <figure className="flex flex-col gap-3">
              <ZoomableImage
                src="/visn/visn-wearable.png"
                alt="VISN wearable fanny pack with sensor placement"
                width={673}
                height={487}
                aspectRatio="16/9"
                fit="cover"
                sizes="(max-width: 768px) 100vw, 25vw"
              />
              <figcaption className="text-[10px] font-light text-[var(--midtone)] tracking-wide">The wearable setup — sensors, Arduino, and compass inside a fanny pack worn on the chest; the Android app handled navigation and obstacle alerts</figcaption>
            </figure>

            <figure className="flex flex-col gap-4">
              <div
                className="rounded-2xl px-6 sm:px-10 py-10 sm:py-12 h-full"
                style={{ background: "var(--card)" }}
              >
                <SystemDiagram />
              </div>
              <figcaption className="text-[10px] font-light text-[var(--midtone)] tracking-wide text-center max-w-[60ch] mx-auto">
                Current VISN architecture — wearable sensing, phone intelligence, and non-visual guidance working as one loop.
              </figcaption>
            </figure>
          </div>
        </section>

        {/* ── What We Shipped ── */}
        <section className="py-16 flex flex-col gap-10 border-b border-[var(--border)]">
          <div className="flex flex-col gap-5 md:grid md:grid-cols-[1fr_2fr] md:gap-16">
            <div className="flex flex-col gap-2">
              <p className={`${LABEL} text-[var(--accent)]`}>Outcome</p>
              <h2 className="font-light" style={SECTION_HEADING}>We won our capstone.</h2>
            </div>
            <div className={`${PROSE}`} style={{ color: "#3A3530" }}>
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
              <p className={`${LABEL} text-[var(--accent)]`}>Reflection</p>
              <h2 className="font-light" style={SECTION_HEADING}>If I built VISN today</h2>
            </div>
            <div className={`${PROSE}`} style={{ color: "#3A3530" }}>
              <p>Here's what I didn't know at the time: product design existed as a discipline. I was the project manager and the engineer on this team, and I thought that was the whole job. The fanny pack call, the audio-first interface, the decision to build around dignity — those came from instinct, not training.</p>
              <p>I still think those instincts were right. But I can see now how much further we could have taken them with the tools I've learned since. Seven years later, some of what I'd change is technical — the hardware is smaller, the sensors are better, indoor positioning actually works. But most of what I'd change is about the experience itself, starting with the work it takes to earn it: sit with visually impaired users first, learn how they already navigate, and design around that — not around what the hardware can do.</p>
            </div>
          </div>

          <figure className="flex flex-col gap-4">
            <ZoomableImage
              src="/visn/visn-hero1.png"
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

        {/* ── Footer ── */}
        <footer className="py-10 border-t border-[var(--border)] flex flex-wrap items-center justify-between gap-2">
          <p className="text-[10px] font-light text-[var(--midtone)] tracking-wide">© 2026 Niharika Mishra</p>
          <Link href="/" className="text-[11px] font-normal tracking-[0.2em] uppercase text-[var(--midtone)] hover:text-[var(--foreground)] border-b border-[var(--border)] pb-0.5 hover:border-[var(--foreground)] transition-colors duration-200">
            ← Back to portfolio
          </Link>
        </footer>
      </div>
    </main>
  );
}
