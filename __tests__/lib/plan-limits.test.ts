import { describe, it, expect } from 'vitest'
import { canAddTool, canAddStaff, getFrameworks } from '@/lib/plan-limits'

describe('canAddTool', () => {
  it('starter: allows up to 5 tools', () => {
    expect(canAddTool('starter', 4)).toBe(true)
    expect(canAddTool('starter', 5)).toBe(false)
  })
  it('growth: unlimited tools', () => {
    expect(canAddTool('growth', 999)).toBe(true)
  })
})

describe('canAddStaff', () => {
  it('starter: allows up to 5 staff', () => {
    expect(canAddStaff('starter', 4)).toBe(true)
    expect(canAddStaff('starter', 5)).toBe(false)
  })
})

describe('getFrameworks', () => {
  it('starter: returns only first framework', () => {
    expect(getFrameworks('starter')).toEqual(['EU AI Act'])
  })
  it('growth: returns all frameworks', () => {
    expect(getFrameworks('growth')).toHaveLength(5)
  })
})
