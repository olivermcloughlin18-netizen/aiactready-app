import type { GeneratedDocument } from './fria'

type Tool = {
  name: string; vendor: string | null; department: string | null
  riskClass: string | null; wizardCompleted: boolean; purpose: string | null
}

export function generateInventoryRegister(input: { orgName: string; tools: Tool[] }): GeneratedDocument {
  const { orgName, tools } = input
  const rows = tools.map(t =>
    `${t.name} | ${t.vendor ?? '—'} | ${t.department ?? '—'} | ${t.riskClass ?? 'Not assessed'} | ${t.wizardCompleted ? 'Yes' : 'No'}`
  ).join('\n')

  return {
    title: `AI Inventory Register — ${orgName}`,
    sections: [
      {
        id: 'intro',
        heading: '1. Overview',
        content: `This AI Inventory Register has been prepared by ${orgName} in accordance with Article 11 and Annex IV of Regulation (EU) 2024/1689 (the EU AI Act).\n\nDate prepared: ${new Date().toLocaleDateString('en-GB')}\nTotal AI systems documented: ${tools.length}`,
      },
      {
        id: 'register',
        heading: '2. AI Systems Register',
        content: `Tool | Vendor | Department | Risk Class | Assessed\n${'-'.repeat(60)}\n${rows || 'No tools added yet.'}`,
      },
      {
        id: 'notes',
        heading: '3. Notes',
        content: 'This register should be updated whenever a new AI system is adopted, modified, or decommissioned. Review frequency: quarterly minimum.\n\nNote: This document requires review and sign-off by a qualified legal or compliance professional before use in regulatory submissions.',
      },
    ],
  }
}
