import { NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db/client";
import { practitioners } from "@/lib/db/schema";

const Body = z.object({
  username: z.string().min(3).max(40),
  password: z.string().min(8).max(200),
  email: z.string().email().optional().or(z.literal("")),
});

export async function POST(req: Request) {
  const existing = await db.select({ id: practitioners.id }).from(practitioners).limit(1);
  if (existing.length) return NextResponse.json({ error: "Owner already exists. Go to /owner/login." }, { status: 409 });

  const body = await req.json().catch(() => null);
  const parsed = Body.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid input." }, { status: 400 });

  const hash = await bcrypt.hash(parsed.data.password, 12);
  await db.insert(practitioners).values({
    username: parsed.data.username.trim(),
    passwordHash: hash,
    email: parsed.data.email || null,
  });
  return NextResponse.json({ ok: true });
}