import CaseStudyShell from "../../components/CaseStudyShell";
import {
  ArticleHero,
  ArticleMeta,
  Prose,
  Screenshot,
  SectionHeader,
} from "../../components/caseStudyUI";
import { caseStudyMetadata } from "../../lib/siteMetadata";

export const metadata = caseStudyMetadata({
  title: "Bloom",
  description:
    "A plant-compatibility quiz for couples. Same space, different needs: Bloom turns how two people live together into a playful compatibility read.",
  slug: "bloom",
});

function BloomScreenshot(props: Parameters<typeof Screenshot>[0]) {
  return <Screenshot expandable={false} {...props} />;
}

export default function BloomCaseStudy() {
  return (
    <CaseStudyShell context="Personal Project · 2026" currentHref="/case-study/bloom">
      <ArticleHero
        eyebrow="Product Design · Vibe Coding"
        live={{ href: "https://plantmatch-six.vercel.app/", label: "Live prototype" }}
        title={
          <>
            Moving in with my partner, I realized we share the same space, but have completely different needs.
            Bloom is a quiz for couples figuring out how to live together
            <span style={{ color: "var(--accent)" }}>.</span>
          </>
        }
        meta={
          <ArticleMeta
            role="Builder: concept, trait framework, question design, and copy tone"
            timeline="Personal March 2026"
            platform="Web mobile"
            results={[{ value: "1 day", label: "idea to working app" }]}
          />
        }
      />

      <div className="col-wide media-inset">
        <BloomScreenshot
          src="/case-study/bloom/hero-new.webp"
          aspect="1060/992"
          priority
          label="Hero, Bloom V1 homepage: 'Every relationship has a nature'"
        />
      </div>

      <SectionHeader index="01" label="The concept" heading="A way to talk about our differences without taking them personally" />
      <Prose>
        <p>
          Bloom came out of a hard conversation after my partner and I moved in together: why our days ran on
          different rhythms, and why the way he recharged was not the way I did. The pothos-and-snake-plant line
          made the conversation easier. His needs were valid, so were mine, and the work was finding the overlap
          without taking the gaps personally.
        </p>
        <p>
          That&apos;s the idea Bloom runs on. A Monstera needs full sun and constant water; a cactus thrives on
          neglect. People have versions of those needs too, but most compatibility tools ask what you value
          instead of how you actually live. So I mapped plant-care needs to human ones: watering became quality
          time, light became social energy, and root space became the solitude you need before you can show up
          for someone else.
        </p>
        <p>
          The goal was to make the metaphor emotionally useful, not just cute.
        </p>
      </Prose>
      <div className="col-wide media-inset grid grid-cols-1 gap-4">
        <BloomScreenshot src="/case-study/bloom/design-qs.webp" aspect="1728/1308" label="Trait map: plant care needs mapped to human personality equivalents" caption="The trait framework: plant care needs mapped to human personality" />
      </div>
      <div className="col-wide media-inset grid grid-cols-1 gap-4">
        <BloomScreenshot src="/case-study/bloom/quiz1.webp" aspect="1472/1216" label="A live Bloom quiz question, 'After an argument, what helps you feel okay again,' with four answer choices" caption="The real quiz: thirteen questions, written to feel like a conversation, not an intake form" />
        <BloomScreenshot src="/case-study/bloom/quiz2.webp" aspect="1594/1280" label="Individual result: 'You are Monstera, The Expansive One,' with a short character description" caption="Your result before your partner's: the plant you are, in plain language" />
      </div>

      <SectionHeader index="02" label="The build" heading="I'm the product partner. Claude Code is the developer." />
      <Prose>
        <p>
          I set the terms early: I&apos;d own the concept, trait framework, questions, and voice; Claude would build.
          That line held the whole way through.
        </p>
        <p>
          The product took shape in a live chat. I brought the plant analogy; Claude helped map it to human
          behavior, asked sharper questions, and surfaced relationship friction points I had not named yet:
          after-work energy, shared calendars, conflict recovery.
        </p>
        <p>
          Then Claude built the app in one pass: quiz data, scoring logic, plant profiles, suggestion cards,
          quiz flow, results page, and homepage.
        </p>
      </Prose>
      <div className="col-wide media-inset grid grid-cols-1 gap-4">
        <BloomScreenshot src="/case-study/bloom/scoring-logic.webp" aspect="1786/982" label="Product dialogue: Claude mapping scoring logic and offering to draft the questions or defer to my calls" caption="The collaboration in action: Claude proposes the approach, I make the product calls" />
      </div>

      <SectionHeader index="03" label="The first version" heading="It worked, but the cards felt like data, not people." />
      <Prose>
        <p>
          The first version worked. The homepage landed exactly where I wanted it: clean and editorial, opening
          on <em>&ldquo;Every relationship has a nature.&rdquo;</em> The quiz flowed straight through to a results page
          that set your trait charts beside your partner&apos;s.
        </p>
        <p>
          It was fun to experiment and feel my creativity move while using Claude. For the first time, I could
          combine my engineering foundation with my design instincts and maximize both: shaping the logic,
          testing the flow, and still caring deeply about whether the experience felt valuable. The best part was
          taking the quiz with my partner when he came home that same day.
        </p>
      </Prose>
      <div className="col-wide media-inset grid grid-cols-1 gap-4">
        <BloomScreenshot src="/case-study/bloom/hero2.2.webp" aspect="1732/1390" label="V1 results page: Monstera meets Chinese Elephant Ear, two partner cards side by side" caption="V1 results page: correct, but more data display than emotional resonance" />
        <BloomScreenshot src="/case-study/bloom/02.b.webp" aspect="1536/1372" label="V1 cards flipped to reveal short descriptions and trait bars, accurate but surface-level" caption="Cards flipped to reveal the writing: the trait bars were right, but it read like data, not a mirror" />
      </div>

      <SectionHeader index="04" label="The evolution" heading="Three days later, I came back and closed the gap." />
      <Prose>
        <p>
          After testing with friends and coworkers, I had fun playing with the formatting, but the bigger
          opportunity was the voice. The quiz could not frame one partner as the easy plant and another as the
          difficult one: a cactus is not worse than a monstera; it just needs different care.
        </p>
        <p>
          That language mattered. Everyone is unique, and god knows there are enough differences in the world; I
          wanted Bloom to help people feel understood instead of categorized. So the descriptions became more
          affirming, careful, and specific, written to make each person feel acceptable as they are.
        </p>
      </Prose>
      <div className="col-wide media-inset">
        <BloomScreenshot src="/case-study/bloom/quiz3.webp" aspect="1604/1356" label="Evolved results: Monstera meets Pothos, both cards rewritten as character portraits with trait bars" caption="The evolved pairing, Monstera meets Pothos: cards that read like portraits, not profiles" />
      </div>
      <Prose>
        <p>
          I also added a similar/different section so couples could better understand who they were to each
          other: where their care needs aligned, where they diverged, and how to talk about those differences
          without making either person the problem.
        </p>
      </Prose>
      <div className="col-wide media-inset grid grid-cols-1 gap-4">
        <BloomScreenshot src="/case-study/bloom/quiz4.webp" aspect="1594/1276" label="'Where you align': shared strengths explained in plain language with practical advice" caption="'Where you align': what you share, interpreted, not just matched" />
        <BloomScreenshot src="/case-study/bloom/quiz5.webp" aspect="1600/1218" label="'Where you're different': differences framed as things worth knowing, with a concrete suggestion" caption="'Where you're different': the gaps, reframed as things worth knowing about" />
      </div>

      <SectionHeader index="05" label="The reflection" heading="I'm an ideas person. I finally got to work like one." />
      <Prose>
        <p>
          Bloom let me work at the speed of my own judgment: try a flow, feel it, scrap it, and make the next
          call in real time. Once the tool barrier dropped, the work became less about permission and more about
          taste: deciding what felt useful, honest, and worth keeping.
        </p>
        <p>
          Bloom came straight out of my own life, and that&apos;s the part that&apos;s stuck. Nearly every couple I show
          it to asks me to buy the domain and send it to them, not as a gag, but because they genuinely want it
          for their own relationship. The thing my partner and I were navigating, it turns out, is something a
          lot of people are quietly working out too.
        </p>
      </Prose>
    </CaseStudyShell>
  );
}
