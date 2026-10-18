import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db/client";
import { resources } from "@/lib/db/schema";

export async function PATCH(req: Request, { params }: { params: Promise<{ key: string }> }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { key } = await params;
  const body = await req.json();

  try {
    await db.update(resources)
      .set({ sections: body.sections, updatedAt: new Date() })
      .where(eq(resources.key, key));
      
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}