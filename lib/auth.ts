import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { db } from "./db/client";
import { practitioners } from "./db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { authConfig } from "./auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        username: { label: "Username" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (creds) => {
        if (!creds?.username || !creds?.password) return null;
        const [u] = await db
          .select()
          .from(practitioners)
          .where(eq(practitioners.username, String(creds.username)))
          .limit(1);
        if (!u) return null;
        const ok = await bcrypt.compare(String(creds.password), u.passwordHash);
        if (!ok) return null;
        return { id: u.id, name: u.fullName ?? u.username, email: u.email ?? undefined };
      },
    }),
  ],
});

declare module "next-auth" {
  interface Session {
    user: { id?: string; name?: string | null; email?: string | null };
  }
}