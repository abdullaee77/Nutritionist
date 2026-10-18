import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db/client";
import { clientFeed, clientIntake } from "@/lib/db/schema";
import { redirect } from "next/navigation";
import FeedTab from "./FeedTab";

export const instant = false;

export default async function FeedPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) redirect("/owner/login");

  const { id } = await params;
  
  const [feed] = await db.select().from(clientFeed).where(eq(clientFeed.clientId, id)).limit(1);
  const [intake] = await db.select().from(clientIntake).where(eq(clientIntake.clientId, id)).limit(1);

  return <FeedTab initialData={feed || {}} intakeData={intake || {}} />;
}