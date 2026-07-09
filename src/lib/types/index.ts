// Wire PWA — shared types

export interface Slide {
  id: string;
  kind: "title" | "problem" | "threat" | "category" | "product" | "moat" | "market" | "competition" | "traction" | "gtm" | "roadmap" | "ask" | "contact";
  label: string;
  heading: string;
  subheading?: string;
  body?: string;
  bullets?: string[];
  table?: { headers: string[]; rows: string[][] };
  stats?: { value: string; label: string }[];
  callout?: { text: string; tone: "danger" | "accent" | "neutral" };
}

export interface NavItem {
  href: string;
  label: string;
  icon: string;
  description: string;
}
