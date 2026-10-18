import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db/client";
import { clientFulfill } from "@/lib/db/schema";
import { redirect } from "next/navigation";
import FulfillTab from "./FulfillTab";

export const instant = false;

export default async function FulfillPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) redirect("/owner/login");

  const { id } = await params;
  const [row] = await db.select().from(clientFulfill).where(eq(clientFulfill.clientId, id)).limit(1);

  return <FulfillTab initialData={row || {}} />;
}