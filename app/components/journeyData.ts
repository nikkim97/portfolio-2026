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
    image: { src: "/visn/Intro-pic.png", alt: "VISN: wearable navigation system for visually impaired people", position: "38% top" },
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
    image: { src: "/case-study/sa-xd/sa-xd-09.png", alt: "360 feedback: many raters giving feedback on one person" },
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
    image: { src: "/case-study/pa-xd/hero-new.png", alt: "Calibrations Ecosystem: PATH rating distribution view shown on a laptop", position: "left center" },
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
    image: { src: "/case-study/manager/hero2.png", alt: "Discover Integration: the welcome flow, account summary, and new Capital One home screen", position: "center" },
  },
  {
    id: "bloom",
    period: "2026",
    role: "Builder",
    title: "Bloom",
    brief: "How may we build something real while learning a new tool?",
    pills: ["Vibe Coded", "Claude"],
    href: "/case-study/bloom",
    image: { src: "/case-study/bloom/hero-new.png", alt: "Bloom: every relationship has a nature, shown on a desktop in a plant-filled workspace" },
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
    image: { src: "/case-study/time-track/hero2.png", alt: "Time Tracking Dashboard: the balance read and the weekly breakdown of hours across four life pillars", position: "center top" },
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
  "C 490,532 80,642 80,682",
  // LOOP 1: sr-swe → sa-xd (engineer → designer pivot)
  "C 80,763 170,843 230,855",
  "C 290,866 400,857 420,805",
  "C 440,753 320,728 250,774",
  "C 180,820 180,918 260,941",
  "C 340,964 550,1004 550,1039",
  // sa-xd → path-360 (direct)
  "C 550,1119 50,1188 50,1223",
  // path-360 → PIX / Manager (direct)
  "C 50,1330 490,1430 490,1550",
  // LOOP 2: PIX → bloom (project → vibe coding)
  "C 490,1630 430,1699 370,1711",
  "C 310,1722 200,1716 180,1665",
  "C 160,1613 280,1590 350,1636",
  "C 420,1682 420,1768 340,1791",
  "C 260,1814 75,1849 75,1883",
  // bloom → time-tracker (direct)
  "C 75,1950 530,2000 530,2060",
  // tail
  "C 530,2110 300,2145 300,2170",
].join(" ");

export const SVG_W = 600;
export const SVG_H = 2350;

export const WAVE_ANCHORS: { x: number; y: number; side: "left" | "right" }[] = [
  { x: 80,  y: 290,  side: "left"  }, // VISN
  { x: 490, y: 463,  side: "right" }, // asc-swe
  { x: 80,  y: 682,  side: "left"  }, // sr-swe
  { x: 550, y: 1039, side: "right" }, // sa-xd
  { x: 50,  y: 1223, side: "left"  }, // path-360
  { x: 490, y: 1550, side: "right" }, // PIX Project (Manager, Experience Design)
  { x: 75,  y: 1883, side: "left"  }, // bloom
  { x: 530, y: 2060, side: "right" }, // time-tracker
];
