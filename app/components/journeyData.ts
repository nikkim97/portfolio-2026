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
  image?: { src: string; alt: string };
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
    image: { src: "/visn/Intro-pic.png", alt: "VISN intro" },
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
  },
  {
    id: "path-people",
    period: "Jun 2025–",
    role: "Manager, Experience Design",
    title: "Discover Migration",
    brief: "I now lead design for the Discover-to-Capital One migration, designing the onboarding experience for millions of customers with one chance to get it right.",
    pills: ["Capital One"],
    type: "career",
  },
  {
    id: "bloom",
    period: "2026",
    role: "Student",
    title: "Bloom",
    brief: "How may we build something real while learning a new tool?",
    pills: ["Vibe Coded", "Claude"],
    href: "/case-study/bloom",
    type: "horizon",
  },
  {
    id: "time-tracker",
    period: "2026",
    role: "Student",
    title: "Time Tracking Dashboard",
    brief: "How can we help people see where their time is actually going?",
    pills: ["Vibe Coded", "Claude"],
    comingSoon: true,
    type: "horizon",
  },
];

export const WAVE_PATH_D = [
  "M 80,130",
  // Career zigzag: VISN → asc-swe → sr-swe
  "C 80,190 490,240 490,280",
  "C 490,340 80,375 80,410",
  // LOOP 1: sr-swe → sa-xd (engineer → designer pivot, mirrored from loop 2)
  "C 80,480 170,550 230,560",
  "C 290,570 400,562 420,517",
  "C 440,472 320,450 250,490",
  "C 180,530 180,615 260,635",
  "C 340,655 550,690 550,720",
  // sa-xd → path-360 (direct)
  "C 550,790 50,850 50,880",
  // path-360 → path-people (direct)
  "C 50,960 490,1010 490,1080",
  // LOOP 2: path-people → bloom (manager → vibe coding)
  "C 490,1150 430,1210 370,1220",
  "C 310,1230 200,1225 180,1180",
  "C 160,1135 280,1115 350,1155",
  "C 420,1195 420,1270 340,1290",
  "C 260,1310 75,1340 75,1370",
  // bloom → time-tracker (direct)
  "C 75,1430 530,1450 530,1490",
  // tail
  "C 530,1530 300,1560 300,1580",
].join(" ");

export const SVG_W = 600;
export const SVG_H = 1580;

export const WAVE_ANCHORS: { x: number; y: number; side: "left" | "right" }[] = [
  { x: 80,  y: 130,  side: "left"  }, // VISN
  { x: 490, y: 280,  side: "right" }, // asc-swe
  { x: 80,  y: 410,  side: "left"  }, // sr-swe
  { x: 550, y: 720,  side: "right" }, // sa-xd
  { x: 50,  y: 880,  side: "left"  }, // path-360
  { x: 490, y: 1080, side: "right" }, // path-people
  { x: 75,  y: 1370, side: "left"  }, // bloom
  { x: 530, y: 1490, side: "right" }, // time-tracker
];
