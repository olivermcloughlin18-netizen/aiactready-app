import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import Credentials from 'next-auth/providers/credentials'
import { db } from '@/lib/db'
import bcrypt from 'bcryptjs'
import { authConfig } from '@/lib/auth.config'

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(db),
  providers: [
    Credentials({
      credentials: {
        email: { type: 'email' },
        password: { type: 'password' },
      },
      async authorize({ email, password }) {
        if (!email || !password) return null
        const user = await db.user.findUnique({ where: { email: String(email) } })
        if (!user?.hashedPassword) return null
        const valid = await bcrypt.compare(String(password), user.hashedPassword)
        if (!valid) return null
        return user
      },
    }),
  ],
})
