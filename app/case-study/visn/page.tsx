import Link from "next/link";
import { FONT } from "../../components/ui";

const PROSE = "prose text-sm font-light leading-[1.85]";
const LABEL = "text-[10px] tracking-[0.28em] uppercase";
const SECTION_HEADING = { fontSize: "clamp(18px, 2vw, 26px)", letterSpacing: "-0.02em", lineHeight: 1.25 };

function Placeholder({ label, aspect = "16/9" }: { label: string; aspect?: string }) {
  return (
    <div
      className="w-full overflow-hidden rounded-xl flex items-center justify-center"
      style={{ aspectRatio: aspect, background: "var(--card)", border: "1px dashed var(--border)" }}
    >
      <p className="text-[10px] tracking-[0.2em] uppercase text-[var(--midtone)] opacity-50 px-4 text-center">{label}</p>
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
        <p className={`${LABEL} text-[var(--midtone)]`}>PM & Designer · Rutgers Capstone · Team of 4</p>
        <h1 className="font-light" style={{ fontSize: "clamp(32px, 5vw, 64px)", letterSpacing: "-0.03em", lineHeight: 1.05, maxWidth: "16ch" }}>
          VISN<span style={{ color: "var(--accent)" }}>.</span>
        </h1>
        <p className="font-light leading-relaxed max-w-[58ch]" style={{ fontSize: "clamp(14px, 1.3vw, 17px)", color: "#3A3530" }}>
          A wearable navigation system for visually impaired people — hardware and software, end to end. Built as a Rutgers senior capstone. Won first place among 60 engineering teams. The project that confirmed my instinct: when I back an idea that matters, I can make it real.
        </p>
      </div>

      {/* ── Hero image ── */}
      <div className="max-w-5xl mx-auto px-6 sm:px-16 pb-0">
        <Placeholder label="Hero — photo of Nikki presenting VISN at the Rutgers capstone fair" aspect="4/3" />
      </div>

      {/* ── The Problem ── */}
      <div className="max-w-5xl mx-auto px-6 sm:px-16">
        <section className="py-16 flex flex-col gap-10 border-b border-[var(--border)]">
          <div className="flex flex-col gap-5 md:grid md:grid-cols-[1fr_2fr] md:gap-16">
            <div className="flex flex-col gap-2">
              <p className={`${LABEL} text-[var(--accent)]`}>The Problem</p>
              <h2 className="font-light" style={SECTION_HEADING}>Navigation without sight is a design problem</h2>
            </div>
            <div className={`${PROSE}`} style={{ color: "#3A3530" }}>
              <p>Visually impaired people navigate the world with a combination of memory, muscle memory, and whatever technology they can afford — canes, guide dogs, and a handful of smart devices that each solve part of the problem but none of it completely.</p>
              <p>Existing solutions like SUNU (a sonar wristband) or Google Lookout could detect nearby objects or read aloud what a camera saw. But no single system combined real-time object proximity, directional awareness, and turn-by-turn navigation in one wearable, accessible package.</p>
              <p>We wanted to build that. A system that could tell you: where you're going, what's in your way, and which direction you're facing — all through your ears, hands-free.</p>
            </div>
          </div>

          <figure className="flex flex-col gap-3">
            <Placeholder label="Problem — visually impaired navigation: person with cane, phone, and sensor device; gap in existing solutions" aspect="16/9" />
          </figure>
        </section>

        {/* ── The System ── */}
        <section className="py-16 flex flex-col gap-10 border-b border-[var(--border)]">
          <div className="flex flex-col gap-5 md:grid md:grid-cols-[1fr_2fr] md:gap-16">
            <div className="flex flex-col gap-2">
              <p className={`${LABEL} text-[var(--midtone)]`}>01</p>
              <h2 className="font-light" style={SECTION_HEADING}>One system, two layers</h2>
            </div>
            <div className={`${PROSE}`} style={{ color: "#3A3530" }}>
              <p>VISN was a hardware-software system designed to work as one. The hardware lived on the body; the software ran on the user's phone; they communicated over Bluetooth in near real-time.</p>
              <p><strong>Hardware.</strong> An Arduino Nano, four Maxbotix ultrasonic sensors, a magnetometer (compass), and an HC-06 Bluetooth module — all wired into a breadboard circuit and enclosed in a fanny pack worn on the chest. The sensors measured the distance and angle to objects in the user's path. The compass tracked the direction they were facing. All of it streamed to the app.</p>
              <p><strong>Software.</strong> An Android app built in Android Studio. It pulled Google Maps data for turn-by-turn directions and layered in the live hardware stream — so as the user walked, they heard both their route and real-time obstacle alerts: "Object 3 feet ahead. Please move."</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <figure className="flex flex-col gap-2 sm:w-[60%]">
              <Placeholder label="Circuit diagram — Arduino Nano connected to four ultrasonic sensors, magnetometer, and HC-06 Bluetooth module" aspect="4/3" />
              <figcaption className="text-[10px] font-light text-[var(--midtone)] tracking-wide">Circuit diagram — Arduino Nano, four ultrasonic sensors, magnetometer, HC-06 Bluetooth module</figcaption>
            </figure>
            <figure className="flex flex-col gap-2 sm:w-[40%]">
              <Placeholder label="Hardware components — Arduino Nano, HC-06 Bluetooth module, Android Studio (the software stack)" aspect="4/3" />
              <figcaption className="text-[10px] font-light text-[var(--midtone)] tracking-wide">The hardware stack — inexpensive, modular, and small enough to fit in a fanny pack</figcaption>
            </figure>
          </div>
        </section>

        {/* ── The Form Factor ── */}
        <section className="py-16 flex flex-col gap-10 border-b border-[var(--border)]">
          <div className="flex flex-col gap-5 md:grid md:grid-cols-[1fr_2fr] md:gap-16">
            <div className="flex flex-col gap-2">
              <p className={`${LABEL} text-[var(--midtone)]`}>02</p>
              <h2 className="font-light" style={SECTION_HEADING}>The design decision that mattered most</h2>
            </div>
            <div className={`${PROSE}`} style={{ color: "#3A3530" }}>
              <p>We tried a harness first. It held the hardware well — good sensor angles, stable on the body. But it was heavy, conspicuous, and made people feel more disabled, not less. That wasn't acceptable.</p>
              <p>The fanny pack was the answer. Worn on the chest, it gave the sensors the right field of view without restricting movement. It was familiar, lightweight, and — critically — something a person might choose to wear anyway. It didn't announce that you needed help.</p>
              <p>That decision shaped how I think about assistive technology. The best tools disappear into the life of the person using them. Dignity is a design requirement.</p>
            </div>
          </div>

          <figure className="flex flex-col gap-3">
            <Placeholder label="Wearable — fanny pack worn on chest with ultrasonic sensor placement labeled, alongside VISN Android app UI" aspect="16/9" />
            <figcaption className="text-[10px] font-light text-[var(--midtone)] tracking-wide">The wearable setup — sensors, Arduino, and compass inside a fanny pack worn on the chest; the Android app handled navigation and obstacle alerts</figcaption>
          </figure>
        </section>

        {/* ── What We Shipped ── */}
        <section className="py-16 flex flex-col gap-10 border-b border-[var(--border)]">
          <div className="flex flex-col gap-5 md:grid md:grid-cols-[1fr_2fr] md:gap-16">
            <div className="flex flex-col gap-2">
              <p className={`${LABEL} text-[var(--midtone)]`}>03</p>
              <h2 className="font-light" style={SECTION_HEADING}>What we shipped — and what we didn't</h2>
            </div>
            <div className={`${PROSE}`} style={{ color: "#3A3530" }}>
              <p>We shipped a working system. The app delivered real walking directions. The hardware detected stationary objects in front of the user and updated proximity as they moved. Bluetooth connected reliably. The fanny pack held everything together.</p>
              <p>But we were honest about the gaps. The magnetometer wasn't fully integrated in time — so directional object alerts (left/right, not just "ahead") didn't make the demo. Indoor GPS was unreliable. Moving obstacles were outside scope. We documented all of it in the poster, because we believed the foundation was strong enough that the gaps were roadmap, not failure.</p>
              <p>For a four-person team with four months and a hardware budget, we built something that worked outdoors, in real conditions, for a real user need.</p>
            </div>
          </div>
        </section>

        {/* ── Outcome ── */}
        <section className="py-16 flex flex-col gap-10 border-b border-[var(--border)]">
          <div className="flex flex-col gap-5 md:grid md:grid-cols-[1fr_2fr] md:gap-16">
            <div className="flex flex-col gap-2">
              <p className={`${LABEL} text-[var(--accent)]`}>Outcome</p>
              <h2 className="font-light" style={SECTION_HEADING}>First place. 60 teams.</h2>
            </div>
            <div className={`${PROSE}`} style={{ color: "#3A3530" }}>
              <p>VISN won the Rutgers senior capstone competition among 60 engineering teams.</p>
              <p>The judges weren't just evaluating whether the technology worked. They were evaluating whether the idea was worth building in the first place — whether the team understood the problem, made thoughtful decisions, and built something with a real future. We did.</p>
              <p>Winning validated something I'd been carrying for a while: that my instinct for which problems to chase, and my ability to pull a team toward a working answer, was real. That combination — technical background, product thinking, design instinct — isn't common. I've been building on it ever since.</p>
            </div>
          </div>
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
