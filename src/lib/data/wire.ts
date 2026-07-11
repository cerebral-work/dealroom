// Dealroom template — populated by `bun run scaffold` from a research directory.
// See README.md for the schema reference. Replace all placeholder values with your own data.
// Example: see wire.example.ts for a fully populated dealbook.

export const wire = {
  name: "",
  tagline: "",
  taglineSecondary: "",
  domain: "",
  stage: "",
  raise: "",
  anchor: "",
  status: "",
  statusNote: "",
};

export const market = {
  tam: "",
  tamBreakdown: "",
  sam: "",
  som3yr: "",
  gartnerSignal: "",
  aiScaling: "",
  genAIGrowth: "",
  sizing: [
    // { layer: "TAM", value: "", basis: "" },
    // { layer: "SAM", value: "", basis: "" },
    // { layer: "SOM (3-yr)", value: "", basis: "" },
  ],
  segments: [
    // { id: 1, name: "", motion: "", arpu: "", priority: 1 },
  ],
  timingSignals: [
    // { signal: "", evidence: "" },
  ],
};

export const competition = {
  categories: [
    // { name: "", who: "", disadvantage: "" },
  ],
  direct: [
    // { name: "", category: "", relation: "", note: "" },
  ],
  moats: [
    // { name: "", detail: "" },
  ],
};

export const compliance = {
  blockers: [
    // { accreditation: "", need: "", cost: "", timeline: "", blocks: "" },
  ],
  architectureMapping: [
    // { feature: "", mapsTo: "" },
  ],
  penalties: [
    // { regulation: "", maxPenalty: "", severity: 1 },
  ],
  jurisdictions: [
    // { region: "", key: "" },
  ],
  marketRanking: [
    // { rank: 1, market: "", enterpriseSW: "" },
  ],
  gaps: [],
};

export const economics = {
  pricing: [
    // { tier: "", price: "", credits: "", motion: "" },
  ],
  creditCosts: [
    // { action: "", credits: 1 },
  ],
  buildVsBuy: [
    // { item: "", annual: "" },
  ],
  cac: [
    // { segment: "", motion: "", cac: "", ltv: "", payback: "" },
  ],
  discountPolicy: [
    // { scenario: "", discount: "", approval: "" },
  ],
  riskNote: "",
  gtmBudget: {
    total: "",
    breakdown: [
      // { category: "", amount: "" },
    ],
  },
};

export const pipeline = [
  // {
  //   org: "",
  //   segment: "",
  //   stage: "",
  //   motion: "",
  //   whyWire: "",
  //   blocker: "",
  //   targetClose: "",
  //   dealSize: "",
  //   note: "",
  // },
];

export const product = {
  tools: [
    // { name: "", function: "", cost: "" },
  ],
  sixProperties: [
    // { name: "", description: "" },
  ],
  shipped: [],
  inFlight: [],
  planned: [],
  activationMetric: "",
};

export const gtm = {
  dualMotion: [
    // { dimension: "", bottomsUp: "", topDown: "" },
  ],
  salesOrg: [
    // { phase: "", arr: "", team: "", hire: "", acv: "", cycle: "" },
  ],
  dontHire: "",
  pqlRule: "",
};

export const brand = {
  positioning: {
    for: "",
    who: "",
    wireIs: "",
    that: "",
    unlike: "",
    wire: "",
  },
  principles: [
    // { name: "", detail: "" },
  ],
  problems: [
    // { id: 1, name: "", oneLiner: "", target: "", severity: "" },
  ],
  tone: [
    // { quality: "", detail: "" },
  ],
  neverSay: [],
};

export const socialProof = [
  // { metric: "", label: "", note: "" },
];

export const objections = [
  // { q: "", a: "" },
];

export const glossary = [
  // { term: "", definition: "" },
];

export const integrations = [
  // { name: "", type: "", status: "" },
];

export const useCases = [
  // { title: "", description: "", segment: "" },
];

export const roadmap = [
  // {
  //   phase: "",
  //   status: "",
  //   items: [],
  //   northstar: "",
  // },
];

export const risks = [
  // { risk: "", impact: "", severity: "", mitigation: "" },
];

export const researchFiles = [
  // { path: "", domain: "", title: "", size: "", description: "" },
];

export const gtmRoadmap = {
  northstar: "",
  runway: "",
  budget: "",
  criticalPath: "",
  streams: [
    // {
    //   id: "",
    //   name: "",
    //   northstar: "",
    //   color: "",
    //   milestones: [
    //     { month: 1, item: "", budget: "" },
    //   ],
    // },
  ],
  budgetAllocation: [
    // { bucket: "", amount: "", months: "" },
  ],
  openDecisions: [
    // { id: 1, decision: "", resolution: "", status: "" },
  ],
};
