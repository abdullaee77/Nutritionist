import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db/client";
import { clientBalance } from "@/lib/db/schema";
import { redirect } from "next/navigation";
import BalanceTab from "./BalanceTab";

export const instant = false;

export default async function BalancePage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) redirect("/owner/login");

  const { id } = await params;
  const [row] = await db.select().from(clientBalance).where(eq(clientBalance.clientId, id)).limit(1);

  return <BalanceTab initialData={row || {}} />;
}