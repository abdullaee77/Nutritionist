import Link from "next/link";
import { eq, desc } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db/client";
import { clientExports, clients } from "@/lib/db/schema";
import { redirect, notFound } from "next/navigation";

export const instant = false;

export default async function HistoryPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) redirect("/owner/login");

  const { id } = await params;
  const [client] = await db.select().from(clients).where(eq(clients.id, id)).limit(1);
  if (!client) notFound();

  const exports = await db
    .select()
    .from(clientExports)
    .where(eq(clientExports.clientId, id))
    .orderBy(desc(clientExports.exportedAt));

  return (
    <div style={{ display: "grid", gap: 20, maxWidth: 800 }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <small style={{ color: "var(--date)" }}>Export History</small>
          <h1 style={{ fontSize: "2.2rem" }}>{client.fullName}</h1>
        </div>
        <Link href={`/owner/clients/${id}`} className="btn btn-ghost">Back to Client</Link>
      </header>

      <div className="ow-card" style={{ padding: 0, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead style={{ background: "var(--cream-2)", textAlign: "left" }}>
            <tr>
              <th style={{ padding: 12 }}>Document Type</th>
              <th style={{ padding: 12 }}>Date Exported</th>
              <th style={{ padding: 12 }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {exports.length === 0 && (
              <tr><td colSpan={3} style={{ padding: 20, color: "var(--date)" }}>No exports yet.</td></tr>
            )}
            {exports.map((e) => (
              <tr key={e.id} style={{ borderTop: "1px solid var(--cream-2)" }}>
                <td style={{ padding: 12, textTransform: "capitalize" }}>{e.kind.replace(/-/g, " ")}</td>
                <td style={{ padding: 12 }}>{new Date(e.exportedAt).toLocaleString()}</td>
                <td style={{ padding: 12 }}>
                  <Link className="link" href={`/api/owner/clients/${id}/export?type=${e.kind}`}>Re-download</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}