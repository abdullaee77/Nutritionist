import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db/client";
import { clientFollowups } from "@/lib/db/schema";
import { redirect } from "next/navigation";
import FollowUpsTab from "./FollowUpsTab";

export const instant = false;

export default async function FollowUpsPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) redirect("/owner/login");

  const { id } = await params;
  const rows = await db.select().from(clientFollowups).where(eq(clientFollowups.clientId, id));
  
  return <FollowUpsTab clientId={id} initialData={rows || []} />;
}