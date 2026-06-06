import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? 'sk_placeholder', {
  apiVersion: '2026-05-27.dahlia',
})

export const PRICE_IDS = {
  starter: process.env.STRIPE_STARTER_PRICE_ID!,
  growth: process.env.STRIPE_GROWTH_PRICE_ID!,
  pro: process.env.STRIPE_PRO_PRICE_ID!,
}

export function planFromPriceId(priceId: string): string {
  const entry = Object.entries(PRICE_IDS).find(([, id]) => id === priceId)
  return entry?.[0] ?? 'starter'
}
