import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db/client";
import { clientPlan } from "@/lib/db/schema";
import { redirect } from "next/navigation";
import PlanTab from "./PlanTab";

export const instant = false;

export default async function PlanPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) redirect("/owner/login");

  const { id } = await params;
  const [row] = await db.select().from(clientPlan).where(eq(clientPlan.clientId, id)).limit(1);

  return <PlanTab initialData={row || {}} />;
}