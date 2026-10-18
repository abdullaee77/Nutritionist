import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db/client";
import { clients, clientIntake, clientFeed, clientBalance, clientFulfill, clientPlan } from "@/lib/db/schema";

const Body = z.object({
  fullName: z.string().min(1),
  dob: z.string().optional().or(z.literal("")),
  sex: z.string().optional().or(z.literal("")),
  phone: z.string().optional().or(z.literal("")),
  email: z.string().email().optional().or(z.literal("")),
  program: z.string().optional().or(z.literal("")),
});

export async function POST(req: Request) {
  const session = await auth();
  const ownerId = (session?.user as { id?: string } | undefined)?.id;
  if (!ownerId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const parsed = Body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Invalid input" }, { status: 400 });

  const [row] = await db.insert(clients).values({
    ownerId,
    fullName: parsed.data.fullName.trim(),
    dob: parsed.data.dob || null,
    sex: parsed.data.sex || null,
    phone: parsed.data.phone || null,
    email: parsed.data.email || null,
    program: parsed.data.program || null,
  }).returning({ id: clients.id });

  // pre-create empty 1:1 rows so the editor always has something to update
  await Promise.all([
    db.insert(clientIntake).values({ clientId: row.id }).onConflictDoNothing(),
    db.insert(clientFeed).values({ clientId: row.id }).onConflictDoNothing(),
    db.insert(clientBalance).values({ clientId: row.id }).onConflictDoNothing(),
    db.insert(clientFulfill).values({ clientId: row.id }).onConflictDoNothing(),
    db.insert(clientPlan).values({ clientId: row.id }).onConflictDoNothing(),
  ]);

  return NextResponse.json({ id: row.id });
}