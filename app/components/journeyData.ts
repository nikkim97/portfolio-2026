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
  image?: { src: string; alt: string; fit?: "cover" | "contain"; position?: string };
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
    image: { src: "/visn/Intro-pic.png", alt: "VISN — wearable navigation system for visually impaired people", position: "38% top" },
  },
  {
    id: "asc-swe",
    period: "2019–20",
    role: "Associate, Software Engineer",
    brief: "My first end-to-end build — and my first real taste of what it means to ship something people actually touch.",
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
    image: { src: "/case-study/sa-xd/sa-xd-09.png", alt: "360 feedback — many raters giving feedback on one person" },
  },
  {
    id: "path-360",
    period: "2023–25",
    role: "Principal Associate, Experience Design",
    title: "Calibrations Ecosystem",
    brief: "How do you give people leaders the clarity they need to have real talent conversations?",
    pills: ["Capital One", "Visual UI"],
    href: "/case-study/path-360",
    type: "project",
    image: { src: "/case-study/pa-xd/gemini.png", alt: "Calibrations Ecosystem — live calibration session with rating distribution", position: "10% center" },
  },
  {
    id: "path-people",
    period: "Jan 2025 – Present",
    role: "Manager, Experience Design",
    title: "Discover Integration Experience",
    brief: "How do you turn a cashback debit customer into a full-time banking customer?",
    pills: ["Capital One", "Visual UI"],
    href: "/case-study/discover-integration",
    type: "project",
  },
  {
    id: "bloom",
    period: "2026",
    role: "Builder",
    title: "Bloom",
    brief: "How may we build something real while learning a new tool?",
    pills: ["Vibe Coded", "Claude"],
    href: "/case-study/bloom",
    image: { src: "/case-study/bloom/option3.png", alt: "Bloom — every relationship has a nature" },
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
  },
];

// The wave is hand-tuned. Spacing accommodates the expanded (~455px) project/horizon
// cards: each anchor sits exactly on the path so the surfer tracks it, with enough
// vertical room between same-side cards that they never collide. SVG_H leaves top and
// bottom breathing room for the first and last cards.
export const WAVE_PATH_D = [
  "M 80,290",
  // Career zigzag: VISN → asc-swe → sr-swe
  "C 80,359 490,417 490,463",
  "C 490,532 80,572 80,612",
  // LOOP 1: sr-swe → sa-xd (engineer → designer pivot)
  "C 80,693 170,773 230,785",
  "C 290,796 400,787 420,735",
  "C 440,683 320,658 250,704",
  "C 180,750 180,848 260,871",
  "C 340,894 550,934 550,969",
  // sa-xd → path-360 (direct)
  "C 550,1049 50,1118 50,1153",
  // path-360 → PIX / Manager (direct)
  "C 50,1260 490,1360 490,1480",
  // LOOP 2: PIX → bloom (project → vibe coding)
  "C 490,1560 430,1629 370,1641",
  "C 310,1652 200,1646 180,1595",
  "C 160,1543 280,1520 350,1566",
  "C 420,1612 420,1698 340,1721",
  "C 260,1744 75,1779 75,1813",
  // bloom → time-tracker (direct)
  "C 75,1880 530,1930 530,1990",
  // tail
  "C 530,2040 300,2075 300,2100",
].join(" ");

export const SVG_W = 600;
export const SVG_H = 2280;

export const WAVE_ANCHORS: { x: number; y: number; side: "left" | "right" }[] = [
  { x: 80,  y: 290,  side: "left"  }, // VISN
  { x: 490, y: 463,  side: "right" }, // asc-swe
  { x: 80,  y: 612,  side: "left"  }, // sr-swe
  { x: 550, y: 969,  side: "right" }, // sa-xd
  { x: 50,  y: 1153, side: "left"  }, // path-360
  { x: 490, y: 1480, side: "right" }, // PIX Project (Manager, Experience Design)
  { x: 75,  y: 1813, side: "left"  }, // bloom
  { x: 530, y: 1990, side: "right" }, // time-tracker
];
