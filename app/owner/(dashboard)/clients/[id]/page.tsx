import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db/client";
import { clients } from "@/lib/db/schema";
import DeleteClientButton from "@/components/owner/DeleteClientButton";

export const instant = false;

export default async function ClientOverview({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session) redirect("/owner/login");

  const { id } = await params;
  const [c] = await db.select().from(clients).where(eq(clients.id, id)).limit(1);
  if (!c) notFound();

  return (
    <div style={{ display: "grid", gap: 20 }}>
      
      {/* Matched Back Button UI */}
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <Link 
          href="/owner/clients" 
          className="btn btn-ghost" 
          style={{ padding: "8px 16px", borderRadius: 999, display: "inline-flex", alignItems: "center", gap: 8 }}
        >
          ← Back
        </Link>
        <h2 style={{ fontSize: "1.5rem", margin: 0 }}>Client Overview</h2>
      </div>

      <header>
        <small style={{ color: "var(--date)" }}>Client</small>
        <h1 style={{ fontSize: "2.2rem" }}>{c.fullName}</h1>
        <p style={{ color: "var(--date)" }}>
          {c.program ?? "—"} · {c.phone ?? "—"} · {c.status}
        </p>
      </header>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
        <Link href={`/owner/clients/${c.id}/record/intake`} className="btn btn-primary">Open Record</Link>
        <Link href={`/owner/clients/${c.id}/export`} className="btn btn-ghost">Export PDF</Link>
        <Link href={`/owner/clients/${c.id}/history`} className="btn btn-ghost">Export history</Link>
        
        {/* Delete Button pushed to the far right */}
        <div style={{ marginLeft: "auto" }}>
          <DeleteClientButton clientId={c.id} clientName={c.fullName} />
        </div>
      </div>

      <div className="ow-card">
        <p style={{ color: "var(--date)" }}>
          Click "Open Record" to access the 8 tabs (Intake, Feed, Balance, Fulfill, Diagnosis, Plan, FollowUps, Outcome).
        </p>
      </div>
    </div>
  );
}