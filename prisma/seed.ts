import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import * as dotenv from 'dotenv'
dotenv.config()

function getDirectUrl(): string {
  const url = process.env.DATABASE_URL ?? ''
  if (url.startsWith('prisma+postgres://')) {
    try {
      const apiKey = url.split('api_key=')[1]
      const decoded = JSON.parse(Buffer.from(apiKey, 'base64').toString())
      return decoded.databaseUrl ?? url
    } catch {
      // fall through
    }
  }
  return url
}

const adapter = new PrismaPg({ connectionString: getDirectUrl() })
const db = new PrismaClient({ adapter })

const MODULES = [
  {
    title: 'What is the EU AI Act and why it applies to you',
    description: 'An overview of the EU AI Act, its scope, and what it means for your organisation.',
    estimatedMins: 5,
    order: 1,
    content: {
      slides: [
        { id: 's1', heading: 'The EU AI Act', body: 'The EU AI Act (Regulation 2024/1689) is the world\'s first comprehensive AI law. It applies to any organisation that uses, develops, or deploys AI systems that affect people in the EU — regardless of where you are based.' },
        { id: 's2', heading: 'Key deadlines', body: 'Article 4 (AI literacy) has been in force since 2 February 2025. The main obligations — including high-risk AI requirements and penalties — apply from 2 August 2026.' },
        { id: 's3', heading: 'Penalties', body: 'Fines reach up to €35 million or 7% of global annual turnover for the most serious violations. Even for lower-tier infringements, fines can reach €15 million or 3% of turnover.' },
        { id: 's4', heading: 'What does this mean for you?', body: 'Every employee at your organisation who uses, develops, or oversees AI tools needs to understand the basics of AI and the relevant legal requirements. That\'s what this training is for.' },
      ],
      quiz: [
        { id: 'q1', question: 'When did Article 4 (AI literacy) of the EU AI Act come into force?', options: ['2 August 2026', '2 February 2025', '1 January 2024'], correct: '2 February 2025' },
        { id: 'q2', question: 'What is the maximum fine for the most serious EU AI Act violations?', options: ['€10 million', '€35 million or 7% of global turnover', '€5 million'], correct: '€35 million or 7% of global turnover' },
        { id: 'q3', question: 'Does the EU AI Act apply to non-EU companies?', options: ['No, only EU-based companies', 'Yes, if the AI affects people in the EU', 'Only if the company has EU offices'], correct: 'Yes, if the AI affects people in the EU' },
      ],
    },
  },
  {
    title: 'How to identify AI systems in your workplace',
    description: 'Learn what counts as an AI system under the EU AI Act and how to spot them.',
    estimatedMins: 5,
    order: 2,
    content: {
      slides: [
        { id: 's1', heading: 'What counts as an AI system?', body: 'The EU AI Act defines an AI system as a machine-based system that infers outputs — such as predictions, recommendations, or decisions — from inputs, and influences real or virtual environments.' },
        { id: 's2', heading: 'Common examples', body: 'AI systems in most workplaces include: CV screening tools, chatbots, email classification, fraud detection, content generation tools (like ChatGPT), performance management tools, and scheduling optimisers.' },
        { id: 's3', heading: 'Shadow AI', body: 'Many employees use AI tools without their organisation knowing. This creates compliance risk. If you use an AI tool not on the approved list, report it to your compliance team.' },
        { id: 's4', heading: 'Your responsibility', body: 'If you use an AI tool at work, you should know: what it does, what data it processes, and whether it has been approved by your compliance team.' },
      ],
      quiz: [
        { id: 'q1', question: 'Which of these is an example of an AI system under the EU AI Act?', options: ['A spreadsheet formula', 'A CV screening tool that ranks candidates', 'A static FAQ page'], correct: 'A CV screening tool that ranks candidates' },
        { id: 'q2', question: 'What should you do if you use an AI tool not on your company\'s approved list?', options: ['Continue using it quietly', 'Report it to your compliance team', 'Delete it immediately'], correct: 'Report it to your compliance team' },
        { id: 'q3', question: 'What does "shadow AI" mean?', options: ['AI that operates in dark mode', 'AI tools used by employees without organisational knowledge or approval', 'AI used for cybersecurity'], correct: 'AI tools used by employees without organisational knowledge or approval' },
      ],
    },
  },
  {
    title: 'Understanding AI risk classifications',
    description: 'The EU AI Act\'s four-tier risk framework and what each level means.',
    estimatedMins: 5,
    order: 3,
    content: {
      slides: [
        { id: 's1', heading: 'Four risk tiers', body: 'The EU AI Act classifies AI systems into four risk tiers: Prohibited, High-risk, Limited risk, and Minimal risk. Your obligations depend on which tier your AI systems fall into.' },
        { id: 's2', heading: 'Prohibited AI', body: 'Certain AI uses are banned outright — including real-time biometric surveillance in public spaces, social scoring systems, and subliminal manipulation of behaviour.' },
        { id: 's3', heading: 'High-risk AI (Annex III)', body: 'High-risk systems include those used in employment (CV screening, performance management), education, credit decisions, healthcare, and law enforcement. These have the strictest obligations.' },
        { id: 's4', heading: 'Limited and minimal risk', body: 'Customer-facing chatbots are limited risk — they must disclose they are AI. Most other tools (content generators for internal use, spelling checkers) are minimal risk.' },
      ],
      quiz: [
        { id: 'q1', question: 'A CV screening tool used to rank job applicants is:', options: ['Minimal risk', 'Limited risk', 'High risk'], correct: 'High risk' },
        { id: 'q2', question: 'Real-time biometric surveillance in public spaces is:', options: ['High risk', 'Limited risk', 'Prohibited'], correct: 'Prohibited' },
        { id: 'q3', question: 'A chatbot that helps customers on a website is:', options: ['Prohibited', 'Limited risk', 'High risk'], correct: 'Limited risk' },
      ],
    },
  },
  {
    title: 'Your rights and obligations when using AI tools',
    description: 'What you must do — and what protections you have — when AI makes decisions about you or others.',
    estimatedMins: 5,
    order: 4,
    content: {
      slides: [
        { id: 's1', heading: 'Transparency', body: 'When an AI system is used to make or assist in a decision about you — such as a hiring decision or a credit assessment — you have the right to be told that AI was involved.' },
        { id: 's2', heading: 'Human oversight', body: 'For high-risk AI systems, a human must be able to review, override, or stop the system. You should never feel that an AI decision is final and unchallengeable.' },
        { id: 's3', heading: 'Your obligations as a user', body: 'When you use an AI tool at work: use it only for approved purposes, do not input sensitive personal data unless explicitly permitted, and report unexpected or concerning outputs.' },
        { id: 's4', heading: 'Data protection', body: 'The EU AI Act works alongside GDPR. AI systems that process personal data must comply with both. Do not use AI tools to process personal data without a lawful basis.' },
      ],
      quiz: [
        { id: 'q1', question: 'If an AI system makes a decision about you, do you have the right to know?', options: ['No', 'Yes, for high-risk AI systems', 'Only if you ask'], correct: 'Yes, for high-risk AI systems' },
        { id: 'q2', question: 'What should you do if an AI tool produces an unexpected or concerning output?', options: ['Ignore it', 'Report it to your compliance team', 'Use a different AI tool'], correct: 'Report it to your compliance team' },
        { id: 'q3', question: 'Can you input sensitive personal data into any AI tool approved by your company?', options: ['Yes, if it\'s approved', 'No, only if explicitly permitted for that purpose', 'Only external AI tools'], correct: 'No, only if explicitly permitted for that purpose' },
      ],
    },
  },
  {
    title: 'How to raise an AI concern',
    description: 'The process for reporting AI-related issues, risks, and non-compliance.',
    estimatedMins: 5,
    order: 5,
    content: {
      slides: [
        { id: 's1', heading: 'When to raise a concern', body: 'Raise a concern if you: notice an AI tool behaving unexpectedly, are asked to use AI in a way that seems to contradict policy, see potential bias or discrimination in AI outputs, or discover an AI tool being used without approval.' },
        { id: 's2', heading: 'How to raise it', body: 'Contact your designated compliance lead or use your organisation\'s compliance reporting channel. All reports are taken seriously.' },
        { id: 's3', heading: 'No retaliation', body: 'Raising an AI concern in good faith is protected. You will not face any negative consequences for reporting a genuine concern about AI use in your organisation.' },
        { id: 's4', heading: 'The bigger picture', body: 'The EU AI Act requires organisations to have processes in place for exactly this. Your reports help the organisation stay compliant and protect everyone — customers, colleagues, and the company.' },
      ],
      quiz: [
        { id: 'q1', question: 'What should you do if you notice an AI tool producing biased outputs?', options: ['Ignore it — AI is never wrong', 'Report it to your compliance team', 'Stop using AI tools entirely'], correct: 'Report it to your compliance team' },
        { id: 'q2', question: 'Will you face consequences for raising an AI concern in good faith?', options: ['Yes, it could affect your performance review', 'No, good faith reports are protected', 'It depends on the outcome'], correct: 'No, good faith reports are protected' },
        { id: 'q3', question: 'Who should you contact if you have an AI-related concern?', options: ['Your direct manager only', 'Your designated compliance lead or via the compliance reporting channel', 'The AI vendor directly'], correct: 'Your designated compliance lead or via the compliance reporting channel' },
      ],
    },
  },
]

async function main() {
  for (const module of MODULES) {
    await db.trainingModule.upsert({
      where: { title: module.title },
      update: {},
      create: module,
    })
  }
  console.log('Seeded 5 training modules')
}

main().catch(console.error).finally(() => db.$disconnect())
