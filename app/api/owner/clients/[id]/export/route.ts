import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { renderToStream } from "@react-pdf/renderer";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db/client";
import { 
  clients, 
  clientIntake, 
  clientFeed, 
  clientBalance, 
  clientFulfill, 
  clientPlan,
  clientExports
} from "@/lib/db/schema";
import ClientRecordPDF from "@/components/owner/ClientRecordPDF";
import { NutritionAssessmentPDF, NutritionCarePlanPDF } from "@/components/owner/TemplatePDFs";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const url = new URL(req.url);
  const exportType = url.searchParams.get("type") || "full";

  try {
    const [client] = await db.select().from(clients).where(eq(clients.id, id)).limit(1);
    if (!client) return NextResponse.json({ error: "Client not found" }, { status: 404 });

    const [intake] = await db.select().from(clientIntake).where(eq(clientIntake.clientId, id)).limit(1);
    const [feed] = await db.select().from(clientFeed).where(eq(clientFeed.clientId, id)).limit(1);
    const [balance] = await db.select().from(clientBalance).where(eq(clientBalance.clientId, id)).limit(1);
    const [fulfill] = await db.select().from(clientFulfill).where(eq(clientFulfill.clientId, id)).limit(1);
    const [plan] = await db.select().from(clientPlan).where(eq(clientPlan.clientId, id)).limit(1);

    // Log to history
    await db.insert(clientExports).values({
      clientId: id,
      kind: exportType,
      exportedAt: new Date(),
    });

    // Select the PDF Component based on the dropdown
    let pdfComponent;
    
    if (exportType === "assessment") {
      pdfComponent = NutritionAssessmentPDF({ client, intake, feed, balance, fulfill });
    } 
    else if (exportType === "care-plan") {
      pdfComponent = NutritionCarePlanPDF({ client, intake, feed, balance, fulfill, plan });
    } 
    else {
      // Fallback to the general Full Record
      pdfComponent = ClientRecordPDF({ client, intake, feed, balance, fulfill, plan });
    }

    // Generate PDF stream
    const stream = await renderToStream(pdfComponent);

    // Sanitize filenames for HTTP headers
    const safeName = client.fullName.replace(/[^\x00-\x7F]/g, "").replace(/\s+/g, '_');
    const safeType = exportType.replace(/[^\x00-\x7F]/g, "").replace(/\s+/g, '_');

    return new NextResponse(stream as any, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="Naflar_${safeName}_${safeType}.pdf"`,
      },
    });

  } catch (error) {
    console.error("PDF Export Error:", error);
    return NextResponse.json({ error: "Failed to generate PDF" }, { status: 500 });
  }
}