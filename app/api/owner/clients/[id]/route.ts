import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db/client";
import { 
  clients, 
  clientIntake, 
  clientFeed, 
  clientBalance, 
  clientFulfill, 
  clientPlan,
  clientOutcome,
  clientFollowups
} from "@/lib/db/schema";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await req.json();
  const { section, data } = body;

  const cleanData = { ...data };
  delete cleanData.updatedAt;
  delete cleanData.createdAt;
  delete cleanData.clientId; 

  try {
    if (section === "main") {
      await db.update(clients).set(cleanData).where(eq(clients.id, id));
    } 
    else if (section === "intake") {
      await db.update(clientIntake).set(cleanData).where(eq(clientIntake.clientId, id));
    } 
    else if (section === "feed") {
      await db.update(clientFeed).set(cleanData).where(eq(clientFeed.clientId, id));
    } 
    else if (section === "balance") {
      await db.update(clientBalance).set(cleanData).where(eq(clientBalance.clientId, id));
    } 
    else if (section === "fulfill") {
      await db.update(clientFulfill).set(cleanData).where(eq(clientFulfill.clientId, id));
    } 
    else if (section === "plan") {
      await db.update(clientPlan).set(cleanData).where(eq(clientPlan.clientId, id));
    }
    else if (section === "outcome") {
      const existing = await db.select().from(clientOutcome).where(eq(clientOutcome.clientId, id)).limit(1);
      if (existing.length === 0) {
        await db.insert(clientOutcome).values({ ...cleanData, clientId: id });
      } else {
        await db.update(clientOutcome).set(cleanData).where(eq(clientOutcome.clientId, id));
      }
    }
    else if (section === "followups") {
      await db.delete(clientFollowups).where(eq(clientFollowups.clientId, id));
      if (Array.isArray(data) && data.length > 0) {
        const rowsToInsert = data.map((v: any, i: number) => ({
          clientId: id,
          visitNo: i + 1,
          visitDate: v.visitDate || null,
          programWeek: v.programWeek ? Number(v.programWeek) : null,
          format: v.format || null,
          wantsToTalk: v.wantsToTalk || null,
          weightKg: v.weightKg ? String(v.weightKg) : null,
          waistCm: v.waistCm ? String(v.waistCm) : null,
          bp: v.bp || null,
          newLabs: v.newLabs || null,
          safety: v.safety || {},
          feed: v.feed || {},
          balance: v.balance || {},
          fulfill: v.fulfill || {},
          reassess: v.reassess || {},
        }));
        await db.insert(clientFollowups).values(rowsToInsert);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Save Error:", error);
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const [client] = await db.select().from(clients).where(eq(clients.id, id)).limit(1);
  
  if (!client) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(client);
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;

  try {
    await db.delete(clients).where(eq(clients.id, id));
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to delete client:", error);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}