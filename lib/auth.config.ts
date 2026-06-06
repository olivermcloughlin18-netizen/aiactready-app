import type { NextAuthConfig } from 'next-auth'

// Edge-compatible auth config — no DB imports
export const authConfig: NextAuthConfig = {
  session: { strategy: 'jwt' },
  providers: [],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isPublic = nextUrl.pathname === '/' || nextUrl.pathname.startsWith('/auth')
      if (isPublic) return true
      return isLoggedIn
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role
        token.orgId = (user as any).orgId
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role
        ;(session.user as any).orgId = token.orgId
        ;(session.user as any).id = token.sub
      }
      return session
    },
  },
  pages: {
    signIn: '/auth/signin',
    newUser: '/dashboard',
  },
}
