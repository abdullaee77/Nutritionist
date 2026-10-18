import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  session: { strategy: "jwt" },
  pages: { signIn: "/owner/login" },
  providers: [], // populated in lib/auth.ts
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) token.uid = (user as { id: string }).id;
      return token;
    },
    session: ({ session, token }) => {
      if (token.uid) (session.user as { id?: string }).id = token.uid as string;
      return session;
    },
  },
} satisfies NextAuthConfig;