const LIMITS = {
  starter: { tools: 5, staff: 5, frameworks: 1 },
  growth: { tools: Infinity, staff: 25, frameworks: Infinity },
  pro: { tools: Infinity, staff: 100, frameworks: Infinity },
}

const ALL_FRAMEWORKS = ['EU AI Act', 'Texas TRAIGA', 'NYC LL 144', 'Colorado SB 26-189', 'ISO 42001']

export function canAddTool(plan: string, currentCount: number): boolean {
  return currentCount < (LIMITS[plan as keyof typeof LIMITS]?.tools ?? 5)
}

export function canAddStaff(plan: string, currentCount: number): boolean {
  return currentCount < (LIMITS[plan as keyof typeof LIMITS]?.staff ?? 5)
}

export function getFrameworks(plan: string): string[] {
  const limit = LIMITS[plan as keyof typeof LIMITS]?.frameworks ?? 1
  return limit === Infinity ? ALL_FRAMEWORKS : ALL_FRAMEWORKS.slice(0, limit)
}
