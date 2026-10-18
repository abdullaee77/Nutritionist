import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db/client";
import { clientDiagnosis } from "@/lib/db/schema";
import { redirect } from "next/navigation";
import DiagnosisTab from "./DiagnosisTab";

export const instant = false;

export default async function DiagnosisPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) redirect("/owner/login");

  const { id } = await params;
  const rows = await db.select().from(clientDiagnosis).where(eq(clientDiagnosis.clientId, id));

  return <DiagnosisTab initialData={rows || []} />;
}