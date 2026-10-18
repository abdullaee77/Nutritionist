import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { renderToStream } from "@react-pdf/renderer";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db/client";
import { resources } from "@/lib/db/schema";
import ResourcePDF from "@/components/owner/ResourcePDF";

export async function GET(req: Request, { params }: { params: Promise<{ key: string }> }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { key } = await params;
  const [resource] = await db.select().from(resources).where(eq(resources.key, key)).limit(1);

  if (!resource) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const stream = await renderToStream(
    ResourcePDF({ resource })
  );

  // Sanitize the title to remove any non-ASCII characters (like em-dashes or smart quotes)
  const safeTitle = resource.title.replace(/[^\x00-\x7F]/g, "").replace(/\s+/g, '_');

  return new NextResponse(stream as any, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="Naflar_${safeTitle}.pdf"`,
    },
  });
}