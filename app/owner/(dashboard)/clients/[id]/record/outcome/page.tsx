import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db/client";
import { clientOutcome } from "@/lib/db/schema";
import { redirect } from "next/navigation";
import OutcomeTab from "./OutcomeTab";

export const instant = false;

export default async function OutcomePage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) redirect("/owner/login");

  const { id } = await params;
  const [row] = await db.select().from(clientOutcome).where(eq(clientOutcome.clientId, id)).limit(1);
  
  return <OutcomeTab initialData={row || {}} />;
}