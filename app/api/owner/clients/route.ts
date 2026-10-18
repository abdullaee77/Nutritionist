import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db/client";
import { clients } from "@/lib/db/schema";

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;

  try {
    // Because of `onDelete: "cascade"` in the schema, 
    // this deletes the client AND all their intake, feed, plan, exports, etc.
    await db.delete(clients).where(eq(clients.id, id));
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to delete client:", error);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}