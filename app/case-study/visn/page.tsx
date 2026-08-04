import CaseStudyShell from "../../components/CaseStudyShell";
import {
  ArticleHero,
  ArticleMeta,
  Figure,
  Prose,
  SectionHeader,
} from "../../components/caseStudyUI";
import { caseStudyMetadata } from "../../lib/siteMetadata";
import { SystemDiagram } from "./_components/AppMockup";

export const metadata = caseStudyMetadata({
  title: "VISN",
  description:
    "A wearable that combines obstacle detection and audio route guidance, making navigation without sight a solvable design problem.",
  slug: "visn",
});

export default function VisnCaseStudy() {
  return (
    <CaseStudyShell context="Rutgers University · Jan – May 2019" currentHref="/case-study/visn">
      <ArticleHero
        eyebrow="PM & Engineer"
        title={
          <>
            Navigation without sight is a design problem. I designed a wearable tool that combined obstacle
            detection & route guidance through audio<span style={{ color: "var(--accent)" }}>.</span>
          </>
        }
        meta={
          <ArticleMeta
            role="PM & Engineer"
            timeline="Rutgers University · Jan – May 2019"
            platform="Wearable hardware + software"
            results={[
              { value: "2nd", label: "of 60 teams · capstone competition" },
              { value: "5m", label: "obstacle-detection range" },
            ]}
          />
        }
      />

      <Figure
        variant="wide"
        src="/visn/hero-image.webp"
        alt="VISN hero image"
        aspect="1818/794"
        fit="contain"
        priority
        caption="VISN combined wearable sensing with phone-based route guidance for hands-free navigation support."
      />

      <SectionHeader index="01" label="The problem" heading="Navigation without sight is a design problem" />
      <Prose>
        <p>
          Visually impaired people navigate the world with a combination of memory, muscle memory, and whatever
          technology they can afford: canes, guide dogs, and a handful of smart devices that each solve part of
          the problem but none of it completely.
        </p>
        <p>
          Existing solutions like SUNU (a sonar wristband) or Google Lookout didn&apos;t exist back in 2019. No
          single system combined real-time object proximity, directional awareness, and turn-by-turn navigation
          in one wearable, accessible package.
        </p>
        <p>
          We wanted to build that. A system that could tell you: where you&apos;re going, what&apos;s in your way, and
          which direction you&apos;re facing, all through your ears, hands-free.
        </p>
      </Prose>
      <Figure
        variant="wide"
        src="/visn/visn-poster.webp"
        alt="VISN project poster presentation"
        aspect="16/9"
        fit="cover"
        caption="Original capstone poster summarizing the problem, prototype architecture, and test results."
      />

      <SectionHeader index="02" label="The approach" heading="One system, two layers" />
      <Prose>
        <p>
          VISN was a hardware-software system designed to work as one. The hardware lived on the body; the
          software ran on the user&apos;s phone; they communicated over Bluetooth in near real-time.
        </p>
        <p>
          <strong>Hardware.</strong>{" "}An Arduino Nano, four Maxbotix ultrasonic sensors, a magnetometer
          (compass), and an HC-06 Bluetooth module, all wired into a breadboard circuit and enclosed in a fanny
          pack worn on the chest. The sensors measured the distance and angle to objects in the user&apos;s path.
          The compass tracked the direction they were facing. All of it streamed to the app.
        </p>
        <p>
          <strong>Software.</strong>{" "}An Android app built in Android Studio. It pulled Google Maps data for
          turn-by-turn directions and layered in the live hardware stream, so as the user walked, they heard both
          their route and real-time obstacle alerts: &ldquo;Object 3 feet ahead. Please move.&rdquo;
        </p>
      </Prose>
      <Figure
        variant="wide"
        src="/visn/visn-circuit.webp"
        alt="VISN circuit diagram with Arduino Nano and sensors"
        aspect="951/436"
        fit="contain"
        background="var(--card)"
        caption="Circuit diagram: Arduino Nano, four ultrasonic sensors, magnetometer, HC-06 Bluetooth module."
      />

      <SectionHeader index="03" label="The design" heading="The decision that mattered the most" />
      <Prose>
        <p>
          We tried a harness first. It held the hardware well: good sensor angles, stable on the body. But it was
          heavy, conspicuous, and made people feel more disabled, not less. That wasn&apos;t acceptable.
        </p>
        <p>
          The fanny pack was the answer. Worn on the chest, it gave the sensors the right field of view without
          restricting movement. It was familiar, lightweight, and, critically, something a person might choose to
          wear anyway. It didn&apos;t announce that you needed help.
        </p>
        <p>
          That decision shaped how I think about assistive technology. The best tools disappear into the life of
          the person using them. Dignity is a design requirement.
        </p>
      </Prose>
      <Figure
        variant="wide"
        src="/visn/visn2.webp"
        alt="VISN wearable: red fanny pack on a mannequin, labeled with multi-element ultrasonic sensors, Arduino Nano processing unit, 9-axis gyroscope/IMU, internal Li-ion battery, and power-status LEDs"
        aspect="1024/741"
        fit="contain"
        caption="The wearable setup: sensors, Arduino, and compass inside a fanny pack worn on the chest; the Android app handled navigation and obstacle alerts."
      />
      <figure className="col-wide media-inset">
        <div
          className="rounded-xl px-5 py-8"
          style={{ background: "#D5CFC0" }}
        >
          <SystemDiagram />
        </div>
        <figcaption className="figure-caption">
          Current VISN architecture: wearable sensing, phone intelligence, and non-visual guidance working as
          one loop.
        </figcaption>
      </figure>

      <SectionHeader index="04" label="The outcome" heading="We won our capstone." />
      <Prose>
        <p>
          We shipped a working end-to-end system: real route guidance from the app, live obstacle detection from
          the wearable, and a reliable Bluetooth link between the two. In outdoor tests, the experience held
          together in real walking conditions.
        </p>
        <p>
          We were also explicit about what was incomplete. Directional left/right guidance from the magnetometer
          was not production-ready by demo day, indoor positioning remained unreliable, and moving-obstacle
          handling was out of scope for the capstone timeline.
        </p>
        <p>
          The outcome was clear: the project direction worked. For four people in four months, it was proof that
          the core system was valuable, feasible, and worth taking further.
        </p>
      </Prose>

      <SectionHeader index="05" label="The reflection" heading="If I built VISN today" />
      <Prose>
        <p>
          I didn&apos;t know product design existed as a discipline yet. I was the project manager and engineer, so
          most of the product calls came from instinct: make it wearable, audio-first, and dignified. If I built
          VISN now, I&apos;d start with the lived experience first: shadow how blind travelers move through familiar
          routes, then design for the moments where the unfamiliar breaks down.
        </p>
      </Prose>
      <Figure
        variant="wide"
        src="/visn/visn-hero1.webp"
        alt="Later VISN concept direction"
        aspect="1272/640"
        fit="contain"
        background="var(--card)"
        caption="Later VISN concept direction: smaller hardware, clearer onboarding, and a more productized wearable experience."
      />
    </CaseStudyShell>
  );
}
