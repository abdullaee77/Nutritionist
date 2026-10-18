import ExportClient from "./ExportClient";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export const instant = false;

export default async function ExportPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) redirect("/owner/login");

  const { id } = await params;
  return <ExportClient clientId={id} />;
}