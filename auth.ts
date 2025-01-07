import NextAuth from "next-auth"
import authConfig from "./auth.config"

import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "./lib/db"


export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
  callbacks: {
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }

      return session;
    },

    async jwt({ token, session }) {
      return token;
    }
  }
})