import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db/client";
import { clientIntake } from "@/lib/db/schema";
import { redirect } from "next/navigation";
import IntakeTab from "./IntakeTab";

export const instant = false;

export default async function IntakePage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) redirect("/owner/login");

  const { id } = await params;
  const [intake] = await db.select().from(clientIntake).where(eq(clientIntake.clientId, id)).limit(1);

  return <IntakeTab initialData={intake || {}} />;
}