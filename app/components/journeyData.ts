export type NodeType = "career" | "project" | "horizon";

export interface JourneyNode {
  id: string;
  period: string;
  role?: string;
  title?: string;
  brief: string;
  pill?: string;
  pillColor?: string;
  href?: string;
  comingSoon?: boolean;
  type: NodeType;
  cardBg?: string;
  cardBorder?: string;
}

export const journeyNodes: JourneyNode[] = [
  {
    id: "visn",
    period: "2019",
    role: "PM & Designer",
    title: "VISN",
    brief: "A wearable navigation system for visually impaired people — hardware and software, end to end. Won the capstone among 60 engineering teams.",
    pill: "CE Capstone",
    pillColor: "rgba(100,140,115,1)",
    href: "/case-study/visn",
    type: "project",
  },
  {
    id: "asc-swe",
    period: "2019–20",
    role: "Associate, Software Engineer",
    brief: "My first end-to-end build — and my first real taste of what it means to ship something people actually touch.",
    pill: "Capital One",
    pillColor: "rgba(80,105,140,1)",
    type: "career",
  },
  {
    id: "sr-swe",
    period: "2020–22",
    role: "Senior Associate, Software Engineer",
    brief: "I built data pipelines for credit card decisioning at scale, but kept asking the same question: who's actually on the other end of this?",
    pill: "Capital One",
    pillColor: "rgba(80,105,140,1)",
    type: "career",
  },
  {
    id: "sa-xd",
    period: "2022–23",
    role: "Senior Associate, Experience Design",
    title: "Performance Platform",
    brief: "I moved to design deliberately, joining HR tech to rethink how employees receive feedback so it could finally be fair, consistent, and useful.",
    pill: "Capital One",
    pillColor: "rgba(80,105,140,1)",
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
    pillColor: "rgba(80,105,140,1)",
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
    pillColor: "rgba(80,105,140,1)",
    type: "career",
  },
  {
    id: "bloom",
    period: "2026",
    title: "Bloom",
    brief: "I build with code to close the gap between what I design and what I can ship — Bloom came first, with more on the way.",
    pill: "Vibe Coded",
    pillColor: "rgba(228,210,80,1)",
    href: "/case-study/bloom",
    type: "horizon",
  },
  {
    id: "time-tracker",
    period: "2026",
    title: "Time Tracking Dashboard",
    brief: "How do you help people see where their time is actually going?",
    pill: "Vibe Coded",
    pillColor: "rgba(228,210,80,1)",
    comingSoon: true,
    type: "horizon",
  },
];

export const WAVE_PATH_D = [
  "M 80,130",
  // VISN — path starts here
  // Career nodes — tight, quick zigzag
  "C 80,190 490,240 490,280",   // → node 2 right (x=490)
  "C 490,340 80,375 80,410",    // → node 3 left  (x=80)
  "C 80,460 550,490 550,520",   // → node 4 right (x=550)
  // Loop / teardrop between SA XD and PATH
  "C 550,590 460,640 400,650",  // ease down-left
  "C 300,660 220,650 200,605",  // swing left and up
  "C 180,560 320,540 390,580",  // curve back right (loop starts)
  "C 460,620 460,690 380,710",  // cross back down — loop closes
  "C 300,740 160,775 50,780",   // sweep left → node 5 (x=50)
  // Condensed curve: PA XD → Manager
  "C 50,860 490,930 490,990",   // → node 6 right (x=490)
  // Curves: Manager → Bloom → Time Tracking
  "C 490,1080 200,1130 75,1160",  // → node 7 left  (x=75)
  "C 75,1230 530,1260 530,1310", // → node 8 right (x=530)
  // Tail — surfer rides to "still riding"
  "C 530,1350 300,1390 300,1410",
].join(" ");

export const SVG_W = 600;
export const SVG_H = 1410;

export const WAVE_ANCHORS: { x: number; y: number; side: "left" | "right" }[] = [
  { x: 80,  y: 130,  side: "left"  }, // VISN
  { x: 490, y: 280,  side: "right" }, // asc-swe
  { x: 80,  y: 410,  side: "left"  }, // sr-swe
  { x: 550, y: 520,  side: "right" }, // sa-xd
  { x: 50,  y: 780,  side: "left"  }, // path-360
  { x: 490, y: 990,  side: "right" }, // path-people
  { x: 75,  y: 1160, side: "left"  }, // bloom
  { x: 530, y: 1310, side: "right" }, // time-tracker
];
