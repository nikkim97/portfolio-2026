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
    period: "2019",
    role: "Associate, Software Engineer",
    brief: "Email-to-pay. Learning the full stack.",
    pill: "Capital One",
    type: "career",
  },
  {
    id: "sr-swe",
    period: "2020",
    role: "Senior Associate, Software Engineer",
    brief: "Batch pipelines. Real-time APIs. Started asking why.",
    pill: "Capital One",
    type: "career",
  },
  {
    id: "sa-xd",
    period: "2022",
    role: "SA, Experience Design",
    brief: "Pivoted. HR tools for better talent decisions.",
    pill: "Capital One",
    type: "career",
  },
  {
    id: "path-360",
    period: "2023–25",
    role: "Principal Associate, Experience Design",
    title: "PATH: 360 Feedback",
    brief: "How do you make peer feedback fair at enterprise scale?",
    pill: "Capital One",
    type: "project",
  },
  {
    id: "path-people",
    period: "2025–",
    role: "Manager, Experience Design",
    title: "PATH: People Leader",
    brief: "How do you give managers the clarity to actually develop their teams?",
    pill: "Capital One",
    type: "project",
  },
  {
    id: "bloom",
    period: "2024",
    title: "Bloom",
    brief: "What if relationship patterns showed up in how you care for plants?",
    pill: "Personal Project",
    type: "horizon",
  },
  {
    id: "time-tracker",
    period: "2025 →",
    title: "Time Tracking Dashboard",
    brief: "How do you help people see where their time is actually going?",
    pill: "Personal Project",
    comingSoon: true,
    type: "horizon",
  },
];

export const WAVE_PATH_D = [
  "M300,30",
  "C300,110 400,130 400,200",
  "C400,280 200,300 200,380",
  "C200,460 400,480 400,560",
  "C400,700 140,810 140,950",
  "C140,1150 460,1300 460,1500",
  "C460,1700 140,1800 140,2000",
  "C140,2180 460,2270 460,2450",
].join(" ");

export const SVG_W = 600;
export const SVG_H = 2650;

export const WAVE_ANCHORS: { x: number; y: number; side: "left" | "right" }[] = [
  { x: 400, y: 200,  side: "right" },
  { x: 200, y: 380,  side: "left"  },
  { x: 400, y: 560,  side: "right" },
  { x: 140, y: 950,  side: "left"  },
  { x: 460, y: 1500, side: "right" },
  { x: 140, y: 2000, side: "left"  },
  { x: 460, y: 2450, side: "right" },
];
