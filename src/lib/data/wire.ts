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
  auditSku: {
    id: "48h-cryptographic-agent-security-governance-audit",
    name: "Vespertin 48-Hour Cryptographic Agent Security & Governance Audit",
    turnaround: "48 hours (100% offline, zero network egress)",
    cliCommand:
      "ves-scan audit-pack --session <session.jsonl> --out <dir> --site <site> --at <RFC 3339 time> [--key <scan.key>] [--reviewer <name>]",
    keyCeremony:
      "Customer-owned Ed25519 key ceremony (marrow keygen --name scan / scan.key 0600 + scan.pub 0644); private key never leaves customer custody.",
    mappingVersion: "2026-11-06.v1",
    legalReviewGate:
      "Requires named human legal reviewer sign-off (--reviewer) on the 13-framework clause mapping table before commercial SKU release (default: pending-human-review).",
    deliverables: [
      {
        artifact: "bundle.dsse.json",
        format: "application/vnd.vespertin.scan.bundle.v1+json",
        summary:
          "Ed25519-signed DSSE envelope over session transcripts with cryptographically bound provenance grade (replayed < observed < enforced < attested).",
      },
      {
        artifact: "crosswalk.json",
        format: "vespertin.compliance.crosswalk.v1",
        summary:
          "Type-level verified 13-framework control crosswalk emitting evidence-grade-meets-requirement, gap-upgrade-to-enforced, or gap-upgrade-to-attested (never legal compliance claims).",
      },
      {
        artifact: "insurer-brief.json / insurer-brief.md",
        format: "vespertin.audit.insurer-brief.v1 (EST-1386)",
        summary:
          "Insurer Underwriting & 3-Way Reconciliation Brief covering rogue-agent containment, Tier::Never treasury spend custody, and claim.v1 <-> marrow <-> statement readiness.",
      },
    ],
    frameworks: [
      { id: "iso42001", clause: "ISO42001-A.6.2.6", requiredGrade: "enforced" },
      { id: "eu-ai-act", clause: "EU-AI-ACT-Art.12-Art.14", requiredGrade: "attested" },
      { id: "nist-ai-rmf", clause: "NIST-AI-RMF-GOVERN-1.2", requiredGrade: "enforced" },
      { id: "nist-csf-2", clause: "NIST-CSF-2.0-PR.AA-05", requiredGrade: "enforced" },
      { id: "soc2", clause: "SOC2-CC6.1-CC7.2", requiredGrade: "enforced" },
      { id: "dora", clause: "DORA-Art.9-Art.17", requiredGrade: "attested" },
      { id: "hipaa", clause: "HIPAA-164.312(b)-(e)(1)", requiredGrade: "attested" },
      { id: "pci-dss", clause: "PCI-DSS-v4.0.1-Req.3.4-Req.10.2", requiredGrade: "attested" },
      { id: "gdpr", clause: "GDPR-Art.22-Art.32", requiredGrade: "attested" },
      { id: "reg-e-ucc4a", clause: "REG-E-1005-UCC-4A-202", requiredGrade: "attested" },
      { id: "finra-3110", clause: "FINRA-3110-4511", requiredGrade: "enforced" },
      { id: "fedramp", clause: "FEDRAMP-R5-AC-3-AU-2", requiredGrade: "attested" },
      { id: "ccpa-cpra", clause: "CCPA-CPRA-1798.185(a)(15)", requiredGrade: "enforced" },
    ],
  },
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
