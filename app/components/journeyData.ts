export type NodeType = "career" | "project" | "horizon";

export interface JourneyNode {
  id: string;
  period: string;
  role?: string;
  title?: string;
  brief: string;
  pill?: string;
  href?: string;
  comingSoon?: boolean;
  type: NodeType;
}

export const journeyNodes: JourneyNode[] = [
  {
    id: "asc-swe",
    period: "2019–20",
    role: "Associate, Software Engineer",
    brief: "My first end-to-end build — and my first real taste of what it means to ship something people actually touch.",
    pill: "Capital One",
    type: "career",
  },
  {
    id: "sr-swe",
    period: "2020–22",
    role: "Senior Associate, Software Engineer",
    brief: "I built data pipelines for credit card decisioning at scale, but kept asking the same question: who's actually on the other end of this?",
    pill: "Capital One",
    type: "career",
  },
  {
    id: "sa-xd",
    period: "2022–23",
    role: "Senior Associate, Experience Design",
    title: "Performance Platform",
    brief: "I moved to design deliberately, joining HR tech to rethink how employees receive feedback so it could finally be fair, consistent, and useful.",
    pill: "Capital One",
    href: "/case-study/sa-xd",
    type: "project",
  },
  {
    id: "path-360",
    period: "2023–25",
    role: "Principal Associate, Experience Design",
    title: "Calibrations Ecosystem",
    brief: "I helped launch PATH — Capital One's first enterprise performance platform — scaling from an 800-person pilot to 70,000+ employees.",
    pill: "Capital One",
    href: "/case-study/path-360",
    type: "project",
  },
  {
    id: "path-people",
    period: "Jun 2025–",
    role: "Manager, Experience Design",
    title: "Discover Migration",
    brief: "I now lead design for the Discover-to-Capital One migration, designing the onboarding experience for millions of customers with one chance to get it right.",
    pill: "Capital One",
    type: "career",
  },
  {
    id: "bloom",
    period: "2026",
    title: "Bloom",
    brief: "I build with code to close the gap between what I design and what I can ship — Bloom came first, with more on the way.",
    pill: "Personal Project",
    href: "/case-study/bloom",
    type: "horizon",
  },
  {
    id: "time-tracker",
    period: "2026",
    title: "Time Tracking Dashboard",
    brief: "How do you help people see where their time is actually going?",
    pill: "Personal Project",
    comingSoon: true,
    type: "horizon",
  },
];

export const WAVE_PATH_D = [
  "M 300,20",
  // Career nodes — tight, quick zigzag (varied x endpoints)
  "C 380,55 490,90 490,130",    // → node 1 right (x=490)
  "C 490,190 80,220 80,260",    // → node 2 left  (x=80)
  "C 80,310 550,340 550,370",   // → node 3 right (x=550)
  // Loop / teardrop between SA XD and PA XD
  "C 550,440 460,490 400,500",  // ease down-left
  "C 300,510 220,500 200,455",  // swing left and up
  "C 180,410 320,390 390,430",  // curve back right (going backward — loop starts)
  "C 460,470 460,540 380,560",  // cross back down — loop closes
  "C 300,590 160,625 50,630",   // sweep left → node 4 (x=50)
  // Condensed curve: PA XD → Manager
  "C 50,710 490,780 490,840",   // → node 5 right (x=490)
  // Curves: Manager → Bloom → Time Tracking
  "C 490,930 200,980 75,1010",   // → node 6 left  (x=75)
  "C 75,1080 530,1110 530,1160", // → node 7 right (x=530)
  // Tail — surfer rides to "still riding"
  "C 530,1200 300,1240 300,1260",
].join(" ");

export const SVG_W = 600;
export const SVG_H = 1260;

export const WAVE_ANCHORS: { x: number; y: number; side: "left" | "right" }[] = [
  { x: 490, y: 130,  side: "right" },
  { x: 80,  y: 260,  side: "left"  },
  { x: 550, y: 370,  side: "right" },
  { x: 50,  y: 630,  side: "left"  },
  { x: 490, y: 840,  side: "right" },
  { x: 75,  y: 1010, side: "left"  },
  { x: 530, y: 1160, side: "right" },
];
