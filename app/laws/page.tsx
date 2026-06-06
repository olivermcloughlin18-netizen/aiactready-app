import Link from "next/link";

interface Law {
  id: string;
  article: string;
  title: string;
  chapter: string;
  riskLevel: "unacceptable" | "high" | "limited" | "minimal" | "general";
  summary: string;
  effectiveDate: string;
  keyRequirements: string[];
  sourceUrl: string;
  sourceLabel: string;
}

const laws: Law[] = [
  {
    id: "art-5",
    article: "Article 5",
    title: "Prohibited AI Practices",
    chapter: "Chapter II",
    riskLevel: "unacceptable",
    summary:
      "Bans AI systems that pose unacceptable risks, including social scoring by governments, real-time biometric identification in public spaces (with limited exceptions), manipulation of vulnerable groups, and untargeted scraping for facial recognition databases.",
    effectiveDate: "2 February 2025",
    keyRequirements: [
      "No social scoring systems by public authorities",
      "No real-time remote biometric identification in public spaces for law enforcement (limited exceptions)",
      "No AI exploiting vulnerabilities of specific groups",
      "No emotion recognition in workplace and education (with exceptions)",
      "No untargeted scraping of facial images from internet or CCTV",
      "No AI-based predictive policing based solely on profiling",
    ],
    sourceUrl: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689#art_5",
    sourceLabel: "EUR-Lex Art. 5",
  },
  {
    id: "art-6",
    article: "Article 6",
    title: "Classification Rules for High-Risk AI Systems",
    chapter: "Chapter III",
    riskLevel: "high",
    summary:
      "Defines criteria for classifying AI systems as high-risk. Covers AI used as safety components of products under EU harmonisation legislation and standalone AI systems in critical areas listed in Annex III.",
    effectiveDate: "2 August 2026",
    keyRequirements: [
      "AI safety components of products covered by EU legislation in Annex I",
      "AI systems in Annex III areas requiring third-party assessment",
      "Providers must assess if system poses significant risk of harm",
      "Exception for systems that do not materially influence decision-making",
    ],
    sourceUrl: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689#art_6",
    sourceLabel: "EUR-Lex Art. 6",
  },
  {
    id: "art-9",
    article: "Article 9",
    title: "Risk Management System",
    chapter: "Chapter III, Section 2",
    riskLevel: "high",
    summary:
      "Requires providers of high-risk AI systems to establish, implement, document and maintain a continuous risk management system throughout the AI system's lifecycle.",
    effectiveDate: "2 August 2026",
    keyRequirements: [
      "Identify and analyse known and reasonably foreseeable risks",
      "Estimate and evaluate risks from intended use and misuse",
      "Adopt appropriate risk management measures",
      "Test system to identify most appropriate measures",
      "Ensure residual risk is acceptable",
    ],
    sourceUrl: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689#art_9",
    sourceLabel: "EUR-Lex Art. 9",
  },
  {
    id: "art-10",
    article: "Article 10",
    title: "Data and Data Governance",
    chapter: "Chapter III, Section 2",
    riskLevel: "high",
    summary:
      "Sets requirements for training, validation, and testing data used in high-risk AI systems, including data governance practices and bias examination.",
    effectiveDate: "2 August 2026",
    keyRequirements: [
      "Training data must be relevant, representative, and free of errors",
      "Appropriate data governance and management practices",
      "Examination for possible biases in datasets",
      "Identification of data gaps or shortcomings",
      "Appropriate statistical properties per intended use",
    ],
    sourceUrl: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689#art_10",
    sourceLabel: "EUR-Lex Art. 10",
  },
  {
    id: "art-11",
    article: "Article 11",
    title: "Technical Documentation",
    chapter: "Chapter III, Section 2",
    riskLevel: "high",
    summary:
      "Requires providers to draw up technical documentation before a high-risk AI system is placed on the market, demonstrating compliance with requirements.",
    effectiveDate: "2 August 2026",
    keyRequirements: [
      "General description of the AI system",
      "Detailed information on monitoring, functioning, and control",
      "Description of risk management system",
      "Description of data governance measures",
      "Documentation kept up-to-date throughout lifecycle",
    ],
    sourceUrl: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689#art_11",
    sourceLabel: "EUR-Lex Art. 11",
  },
  {
    id: "art-13",
    article: "Article 13",
    title: "Transparency and Provision of Information to Deployers",
    chapter: "Chapter III, Section 2",
    riskLevel: "high",
    summary:
      "High-risk AI systems must be designed to be sufficiently transparent for deployers to interpret outputs and use them appropriately.",
    effectiveDate: "2 August 2026",
    keyRequirements: [
      "Clear instructions for use provided to deployers",
      "Information on system capabilities and limitations",
      "Expected level of accuracy, robustness and cybersecurity",
      "Known or foreseeable circumstances leading to risks",
      "Human oversight measures specified",
    ],
    sourceUrl: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689#art_13",
    sourceLabel: "EUR-Lex Art. 13",
  },
  {
    id: "art-14",
    article: "Article 14",
    title: "Human Oversight",
    chapter: "Chapter III, Section 2",
    riskLevel: "high",
    summary:
      "High-risk AI systems must be designed to allow effective human oversight during use, including the ability to understand, monitor, and override the system.",
    effectiveDate: "2 August 2026",
    keyRequirements: [
      "Humans can understand system capacities and limitations",
      "Humans can monitor operation and detect anomalies",
      "Ability to interpret AI system output",
      "Ability to decide not to use or override output",
      "Ability to intervene or stop the system",
    ],
    sourceUrl: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689#art_14",
    sourceLabel: "EUR-Lex Art. 14",
  },
  {
    id: "art-15",
    article: "Article 15",
    title: "Accuracy, Robustness and Cybersecurity",
    chapter: "Chapter III, Section 2",
    riskLevel: "high",
    summary:
      "High-risk AI systems must achieve appropriate levels of accuracy, robustness and cybersecurity, and perform consistently throughout their lifecycle.",
    effectiveDate: "2 August 2026",
    keyRequirements: [
      "Appropriate levels of accuracy declared and documented",
      "Resilient against errors, faults, and inconsistencies",
      "Robust against attempts at manipulation by third parties",
      "Technical redundancy solutions where appropriate",
      "Cybersecurity measures against vulnerabilities",
    ],
    sourceUrl: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689#art_15",
    sourceLabel: "EUR-Lex Art. 15",
  },
  {
    id: "art-50",
    article: "Article 50",
    title: "Transparency Obligations for Certain AI Systems",
    chapter: "Chapter IV",
    riskLevel: "limited",
    summary:
      "AI systems interacting with people must disclose they are AI. Deepfakes and AI-generated content must be labelled. Emotion recognition and biometric categorisation systems must inform subjects.",
    effectiveDate: "2 August 2026",
    keyRequirements: [
      "Chatbots must inform users they are interacting with AI",
      "AI-generated or manipulated content must be labelled",
      "Deepfakes must be clearly disclosed",
      "Emotion recognition systems must inform subjects",
      "Machine-readable marking for AI-generated content",
    ],
    sourceUrl: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689#art_50",
    sourceLabel: "EUR-Lex Art. 50",
  },
  {
    id: "art-51",
    article: "Article 51",
    title: "Classification of General-Purpose AI Models",
    chapter: "Chapter V",
    riskLevel: "general",
    summary:
      "Establishes classification criteria for general-purpose AI models (GPAI), including thresholds for systemic risk based on compute used for training.",
    effectiveDate: "2 August 2025",
    keyRequirements: [
      "GPAI models classified based on capabilities",
      "Systemic risk threshold at 10^25 FLOPs of training compute",
      "Commission may update thresholds via delegated acts",
      "Models with systemic risk face additional obligations",
    ],
    sourceUrl: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689#art_51",
    sourceLabel: "EUR-Lex Art. 51",
  },
  {
    id: "art-53",
    article: "Article 53",
    title: "Obligations for Providers of GPAI Models",
    chapter: "Chapter V",
    riskLevel: "general",
    summary:
      "Providers of general-purpose AI models must maintain technical documentation, provide information to downstream providers, comply with copyright law, and publish a training data summary.",
    effectiveDate: "2 August 2025",
    keyRequirements: [
      "Draw up and maintain technical documentation",
      "Provide information and documentation to downstream providers",
      "Establish policy to comply with EU copyright law",
      "Publish sufficiently detailed summary of training data",
    ],
    sourceUrl: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689#art_53",
    sourceLabel: "EUR-Lex Art. 53",
  },
  {
    id: "art-55",
    article: "Article 55",
    title: "Obligations for Providers of GPAI Models with Systemic Risk",
    chapter: "Chapter V",
    riskLevel: "general",
    summary:
      "Additional obligations for GPAI models classified as having systemic risk, including model evaluations, adversarial testing, incident tracking, and cybersecurity protections.",
    effectiveDate: "2 August 2025",
    keyRequirements: [
      "Perform model evaluations including adversarial testing",
      "Assess and mitigate systemic risks",
      "Track, document, and report serious incidents",
      "Ensure adequate cybersecurity protections",
      "Report to the AI Office without undue delay",
    ],
    sourceUrl: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689#art_55",
    sourceLabel: "EUR-Lex Art. 55",
  },
  {
    id: "art-71",
    article: "Article 71",
    title: "AI Literacy",
    chapter: "Chapter III, Section 4",
    riskLevel: "minimal",
    summary:
      "Providers and deployers must ensure staff dealing with AI systems have sufficient AI literacy, taking into account their technical knowledge, experience, and context of use.",
    effectiveDate: "2 February 2025",
    keyRequirements: [
      "Staff must have sufficient AI literacy for their role",
      "Consider technical knowledge and experience of personnel",
      "Consider context and persons affected by AI system",
      "Training proportionate to role and responsibility",
    ],
    sourceUrl: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689#art_71",
    sourceLabel: "EUR-Lex Art. 71",
  },
  {
    id: "art-72",
    article: "Article 72",
    title: "Penalties",
    chapter: "Chapter XII",
    riskLevel: "unacceptable",
    summary:
      "Sets maximum administrative fines for non-compliance: up to €35M or 7% of global turnover for prohibited practices, €15M or 3% for other violations, and €7.5M or 1% for incorrect information.",
    effectiveDate: "2 August 2025",
    keyRequirements: [
      "Up to €35M or 7% global turnover for prohibited AI practices",
      "Up to €15M or 3% global turnover for other infringements",
      "Up to €7.5M or 1% global turnover for supplying incorrect information",
      "SME and startup-proportionate penalties",
      "Member States set rules for penalties by national authorities",
    ],
    sourceUrl: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689#art_72",
    sourceLabel: "EUR-Lex Art. 72",
  },
];

const riskColors: Record<Law["riskLevel"], { bg: string; text: string; border: string }> = {
  unacceptable: { bg: "bg-red-50", text: "text-red-700", border: "border-red-200" },
  high: { bg: "bg-orange-50", text: "text-orange-700", border: "border-orange-200" },
  limited: { bg: "bg-yellow-50", text: "text-yellow-700", border: "border-yellow-200" },
  minimal: { bg: "bg-green-50", text: "text-green-700", border: "border-green-200" },
  general: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
};

const riskLabels: Record<Law["riskLevel"], string> = {
  unacceptable: "Unacceptable Risk",
  high: "High Risk",
  limited: "Limited Risk",
  minimal: "Minimal Risk",
  general: "General-Purpose AI",
};

const sources = [
  {
    label: "Regulation (EU) 2024/1689 — Full Text",
    url: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689",
    description: "Official Journal of the European Union",
  },
  {
    label: "EU AI Act — Corrigendum (Official Corrections)",
    url: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689R(01)",
    description: "Published corrections to the original regulation text",
  },
  {
    label: "European Commission — AI Act Overview",
    url: "https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai",
    description: "Policy summary and implementation timeline",
  },
  {
    label: "EU AI Office",
    url: "https://digital-strategy.ec.europa.eu/en/policies/ai-office",
    description: "Central body for AI governance, GPAI model oversight, and codes of practice",
  },
  {
    label: "EU AI Act Explorer — Future of Life Institute",
    url: "https://artificialintelligenceact.eu/",
    description: "Searchable, annotated version of the full regulation",
  },
];

export default function LawsPage() {
  return (
    <main className="min-h-screen px-6 py-12 max-w-5xl mx-auto">
      <div className="mb-12">
        <Link
          href="/"
          className="text-[#6b7280] text-sm hover:text-[#111] transition-colors mb-6 inline-block"
        >
          &larr; Back to home
        </Link>
        <h1 className="text-3xl font-bold tracking-tight mb-3 text-[#111]">
          EU AI Act — Key Articles
        </h1>
        <p className="text-[#6b7280] text-base max-w-2xl">
          The EU AI Act (Regulation 2024/1689) is the world&#39;s first comprehensive
          AI law. It classifies AI systems by risk level and applies obligations
          accordingly. Below are the key articles your organisation needs to know.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-10">
        {(Object.keys(riskLabels) as Law["riskLevel"][]).map((level) => {
          const colors = riskColors[level];
          return (
            <span
              key={level}
              className={`px-3 py-1 text-xs font-medium rounded-full border ${colors.bg} ${colors.text} ${colors.border}`}
            >
              {riskLabels[level]}
            </span>
          );
        })}
      </div>

      <div className="space-y-4">
        {laws.map((law) => {
          const colors = riskColors[law.riskLevel];
          return (
            <article
              key={law.id}
              className="bg-[#fafafa] border border-[#e5e7eb] rounded-xl p-6 hover:border-[#d1d5db] transition-colors"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h2 className="text-lg font-semibold text-[#111]">
                      {law.article}: {law.title}
                    </h2>
                    <span
                      className={`px-2 py-0.5 text-xs font-medium rounded-full border shrink-0 ${colors.bg} ${colors.text} ${colors.border}`}
                    >
                      {riskLabels[law.riskLevel]}
                    </span>
                  </div>
                  <p className="text-[#9ca3af] text-xs">
                    {law.chapter} · Effective {law.effectiveDate}
                  </p>
                </div>
              </div>

              <p className="text-[#4b5563] text-sm leading-relaxed mb-4">
                {law.summary}
              </p>

              <div className="mb-3">
                <h3 className="text-xs font-medium text-[#9ca3af] uppercase tracking-wider mb-2">
                  Key Requirements
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1.5">
                  {law.keyRequirements.map((req, i) => (
                    <li
                      key={i}
                      className="text-sm text-[#4b5563] flex items-start gap-2"
                    >
                      <span className="text-[#6366f1] mt-1 shrink-0">•</span>
                      {req}
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href={law.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#6366f1] hover:text-[#4f46e5] transition-colors"
              >
                {law.sourceLabel} &rarr;
              </a>
            </article>
          );
        })}
      </div>

      <div className="mt-12 p-6 bg-[#fafafa] border border-[#e5e7eb] rounded-xl">
        <h2 className="text-lg font-semibold mb-2 text-[#111]">Key Compliance Dates</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-[#6366f1] font-medium">2 February 2025</p>
            <p className="text-[#6b7280]">
              Prohibited practices ban & AI literacy obligations take effect
            </p>
          </div>
          <div>
            <p className="text-[#6366f1] font-medium">2 August 2025</p>
            <p className="text-[#6b7280]">
              GPAI model obligations & penalty framework apply
            </p>
          </div>
          <div>
            <p className="text-[#6366f1] font-medium">2 August 2026</p>
            <p className="text-[#6b7280]">
              High-risk AI system requirements fully enforceable
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 p-6 bg-[#fafafa] border border-[#e5e7eb] rounded-xl">
        <h2 className="text-lg font-semibold mb-4 text-[#111]">Sources</h2>
        <ul className="space-y-3">
          {sources.map((source) => (
            <li key={source.url}>
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-[#6366f1] hover:text-[#4f46e5] transition-colors"
              >
                {source.label} &rarr;
              </a>
              <p className="text-xs text-[#9ca3af] mt-0.5">{source.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
