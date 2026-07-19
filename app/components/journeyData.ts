export type NodeType = "career" | "project" | "horizon";

export interface JourneyNode {
  id: string;
  period: string;
  role?: string;
  title?: string;
  brief: string;
  pills?: string[];
  href?: string;
  comingSoon?: boolean;
  type: NodeType;
  image?: { src: string; alt: string; fit?: "cover" | "contain"; position?: string; scale?: number };
}

export const journeyNodes: JourneyNode[] = [
  {
    id: "visn",
    period: "2019",
    role: "Engineering Student",
    title: "VISN",
    brief: "How can we help someone navigate a world they can't see?",
    pills: ["Undergrad", "Hardware"],
    href: "/case-study/visn",
    type: "project",
    image: { src: "/visn/Intro-pic.webp", alt: "VISN: wearable navigation system for visually impaired people", position: "38% top" },
  },
  {
    id: "asc-swe",
    period: "2019–20",
    role: "Associate, Software Engineer",
    brief: "My first end-to-end build, and my first real taste of what it means to ship something people actually touch.",
    pills: ["Capital One"],
    type: "career",
  },
  {
    id: "sr-swe",
    period: "2020–22",
    role: "Senior Associate, Software Engineer",
    brief: "I built data pipelines for credit card decisioning at scale, but kept asking the same question: who's actually on the other end of this?",
    pills: ["Capital One"],
    type: "career",
  },
  {
    id: "sa-xd",
    period: "2022–23",
    role: "Sr. Associate, Experience Design",
    title: "360 Feedback",
    brief: "How do you design feedback that people trust enough to act on?",
    pills: ["Capital One", "Research"],
    href: "/case-study/sa-xd",
    type: "project",
    image: { src: "/case-study/sa-xd/sa-xd-09.webp", alt: "360 feedback: many raters giving feedback on one person" },
  },
  {
    id: "path-360",
    period: "2024–25",
    role: "Principal Associate, Experience Design",
    title: "Calibrations Ecosystem",
    brief: "How do you give people leaders the clarity they need to have real talent conversations?",
    pills: ["Capital One", "Visual UI"],
    href: "/case-study/path-360",
    type: "project",
    image: { src: "/case-study/pa-xd/hero1.webp", alt: "PATH calibrations ecosystem interface" },
  },
  {
    id: "people-leader-redesign",
    period: "Nov 2025 – Feb 2026",
    role: "Manager, Experience Design",
    title: "People Leader Redesign",
    brief: "How do you align the experience with how leaders actually assess their people?",
    pills: ["Capital One", "Visual UI"],
    href: "/case-study/people-leader-redesign",
    type: "project",
    image: { src: "/case-study/pl-redesign/hero.webp", alt: "People Leader Redesign: aligning the experience with how leaders assess their people" },
  },
  {
    id: "path-people",
    period: "Jan 2026 – Present",
    role: "Manager, Experience Design",
    title: "Discover Integration Experience",
    brief: "How do you turn a cashback debit customer into a full-time banking customer?",
    pills: ["Capital One", "Visual UI"],
    href: "/case-study/discover-integration",
    type: "project",
    image: { src: "/case-study/manager/hero2.webp", alt: "Discover Integration: the welcome flow, account summary, and new Capital One home screen", position: "center" },
  },
  {
    id: "bloom",
    period: "2026",
    role: "Builder",
    title: "Bloom",
    brief: "How do you make talking about your differences feel less personal?",
    pills: ["Vibe Coded", "Claude"],
    href: "/case-study/bloom",
    image: { src: "/case-study/bloom/hero-new.webp", alt: "Bloom: every relationship has a nature, shown on a desktop in a plant-filled workspace" },
    type: "horizon",
  },
  {
    id: "time-tracker",
    period: "2026",
    role: "Builder",
    title: "Time Tracking Dashboard",
    brief: "How can we help people see where their time is actually going?",
    pills: ["Vibe Coded", "Claude"],
    href: "/case-study/time-tracker",
    type: "horizon",
    image: { src: "/case-study/time-track/hero2.webp", alt: "Time Tracking Dashboard: the balance read and the weekly breakdown of hours across four life pillars", position: "center top" },
  },
];

export const SVG_W = 520;
export const SVG_H = 2620;

export const WAVE_ANCHORS: { x: number; y: number; side: "left" | "right" }[] = [
  { x: 88,  y: 260,  side: "left"  }, // VISN
  { x: 408, y: 450,  side: "right" }, // asc-swe
  { x: 88,  y: 635,  side: "left"  }, // sr-swe
  { x: 455, y: 880,  side: "right" }, // sa-xd
  { x: 65,  y: 1180, side: "left"  }, // path-360
  { x: 424, y: 1460, side: "right" }, // people-leader-redesign
  { x: 112, y: 1760, side: "left"  }, // Discover Integration (Manager, Experience Design)
  { x: 436, y: 2040, side: "right" }, // bloom
  { x: 85,  y: 2340, side: "left"  }, // time-tracker
];

type WavePoint = { x: number; y: number };

const formatPoint = (value: number) => Number(value.toFixed(1));

function splinePath(points: WavePoint[], tension = 0.62) {
  if (points.length < 2) return "";

  const commands = [`M ${points[0].x},${points[0].y}`];
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;
    const handle = tension / 6;

    const c1x = formatPoint(p1.x + (p2.x - p0.x) * handle);
    const c1y = formatPoint(p1.y + (p2.y - p0.y) * handle);
    const c2x = formatPoint(p2.x - (p3.x - p1.x) * handle);
    const c2y = formatPoint(p2.y - (p3.y - p1.y) * handle);

    commands.push(`C ${c1x},${c1y} ${c2x},${c2y} ${p2.x},${p2.y}`);
  }

  return commands.join(" ");
}

// The wave is generated from smooth waypoints so every join has a continuous
// tangent. The curve keeps moving downward in SVG Y so scroll progress and
// surfer position stay aligned, while the added interior waypoints create the
// loopy, wavy character between the anchored cards.
const WAVE_WAYPOINTS: WavePoint[] = [
  WAVE_ANCHORS[0],
  WAVE_ANCHORS[1],
  WAVE_ANCHORS[2],
  { x: 160, y: 710 },
  { x: 330, y: 770 },
  { x: 292, y: 830 },
  WAVE_ANCHORS[3],
  WAVE_ANCHORS[4],
  WAVE_ANCHORS[5],
  WAVE_ANCHORS[6],
  { x: 176, y: 1836 },
  { x: 336, y: 1900 },
  { x: 292, y: 1972 },
  WAVE_ANCHORS[7],
  WAVE_ANCHORS[8],
  { x: 260, y: 2445 },
];

export const WAVE_PATH_D = splinePath(WAVE_WAYPOINTS);
