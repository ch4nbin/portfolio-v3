/**
 * Copy sourced from Chanbin_Updated_Resume (2).pdf (May 10 2026).
 * Spacing normalized where PDF extraction merged words (“inPython” → “in Python”).
 */

export type Job = {
  org: string;
  dateRange: string;
  role: string;
  location: string;
  bullets: string[];
  note?: string;
};

export const experience: Job[] = [
  {
    org: "T-Mobile",
    dateRange: "May 2026 – Aug 2026",
    role: "Software Engineer Intern",
    location: "Frisco, TX",
    note: "(incoming)",
    bullets: [
      "Building agentic AI systems for IntentCX customer experience platforms using LLM orchestration and backend services.",
    ],
  },
  {
    org: "Princeton Center for Digital Humanities",
    dateRange: "Feb 2026 – Apr 2026",
    role: "Software Engineer Intern",
    location: "Princeton, NJ",
    bullets: [
      "Built a text–image alignment pipeline in Python (RapidFuzz) for 1.5M+ pages in the Princeton Prosody Archive.",
      "Executed pipelines on Princeton’s Della HPC cluster using Linux/Bash processing 100GB+ of ZIP and TIFF data.",
      "Developed streaming validation over JSONL ensuring full-corpus checks on ordering, gaps, duplicates, and empty OCR.",
    ],
  },
  {
    org: "Princeton Stigma and Social Perception Lab",
    dateRange: "Jan 2026 – Present",
    role: "Machine Learning Research Intern",
    location: "Princeton, NJ",
    bullets: [
      "Applied TensorFlow ML/NLP embeddings to analyze 30K+ conversational text segments and quantify social patterns.",
      "Built Python pipelines (pandas, NumPy) to process 50K+ embeddings reducing preprocessing time by 40%.",
      "Used scikit-learn to evaluate embedding quality through clustering and cosine similarity analysis of conversational text.",
    ],
  },
  {
    org: "WIT Sports",
    dateRange: "August 2025 – Dec 2025",
    role: "Software Engineer Intern",
    location: "New York City, NY",
    bullets: [
      "Engineered a “Guess the Player” web app using JavaScript with React deployed in production for 200+ partners.",
      "Designed a backend API with Express and MongoDB achieving ∼45 ms leaderboard fetch latency at 10K+ records.",
      "Added read-through Redis caching to leaderboard endpoints to reduce database load and stabilize response latency.",
    ],
  },
  {
    org: "Cambridge University Digital Humanities",
    dateRange: "June 2025 – August 2025",
    role: "Software Engineer Intern",
    location: "Remote",
    bullets: [
      "Built a Python NLP pipeline to convert 85+ research papers into structured summaries reducing review time by 50%.",
      "Implemented a TypeScript and React web application for exploration of 1K+ entities with dynamic filtering.",
      "Indexed extracted PDF text using SQLite FTS5 to enable fast keyword search across 750+ research documents.",
    ],
  },
];

export type Project = {
  title: string;
  stackLine: string;
  bullets: string[];
};

export const projects: Project[] = [
  {
    title: "Atlas (HackPrinceton Spring ’26)",
    stackLine: "Next.js, TypeScript, Express.js, Three.js, Google Gemini",
    bullets: [
      "Built an AI-powered 3D learning platform that uses Gaussian splatting to turn prompts into explorable worlds.",
      "Engineered Node.js/Express APIs for a PhotonAI iMessage world recommendation agent with 100ms latency.",
      "Used Google Gemini and World Labs for contextual tutoring and world generation, increasing engagement by 65%+.",
      "Won Best AI-Powered App sponsored by Orchids at HackPrinceton Spring 2026 among 410+ participants.",
    ],
  },
  {
    title: "Lumenta (SB Hacks XII)",
    stackLine: "Next.js, TypeScript, Node.js, MongoDB, YOLOv8",
    bullets: [
      "Built an AI video surveillance platform that analyzes live security footage and triggers automated MCP actions.",
      "Combined on-device YOLOv8 detection with a blob-tracking motion algorithm achieving 85% stable object tracking.",
      "Built an event-driven pipeline storing 5K+ timestamped detections in MongoDB Atlas for real-time querying.",
      "Won Grand Prize (Second Place) at Santa Barbara Hacks XII among 340+ participants and 100+ teams.",
    ],
  },
];

export const contactChannels = [
  { label: "email", href: "mailto:cp5721@princeton.edu", display: "cp5721@princeton.edu" },
  { label: "phone", href: "tel:+16268078660", display: "626-807-8660" },
  {
    label: "linkedin",
    href: "https://linkedin.com/in/chanbinp",
    display: "linkedin.com/in/chanbinp",
  },
  { label: "github", href: "https://github.com/ch4nbin", display: "github.com/ch4nbin" },
  { label: "site", href: "https://cpark.vercel.app", display: "cpark.vercel.app" },
] as const;
