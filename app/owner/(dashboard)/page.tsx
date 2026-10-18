import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db/client";
import { clients, clientExports } from "@/lib/db/schema";
import { desc } from "drizzle-orm";

export const instant = false;

export default async function Dashboard() {
  const session = await auth();
  if (!session) redirect("/owner/login");

  const recent = await db.select().from(clients).orderBy(desc(clients.updatedAt)).limit(5);
  const exports = await db.select().from(clientExports).orderBy(desc(clientExports.exportedAt)).limit(5);
  
  // Optional: You can fetch these stats dynamically if you want
  const totalClients = await db.select().from(clients); 
  const activeClients = totalClients.filter(c => c.status === "active").length;

  return (
    <div style={{ display: "grid", gap: 32, width: "100%" }}>
      
      {/* Header */}
      <header>
        <h1 style={{ fontSize: "2.6rem", marginBottom: 8 }}>Welcome back 👋</h1>
        <p style={{ color: "var(--date)", fontSize: "1.1rem" }}>Here's an overview of your clinical practice today.</p>
      </header>

      {/* Stats Row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20 }}>
        <div className="ow-card" style={{ padding: 24, borderLeft: "4px solid var(--pom)" }}>
          <div style={{ color: "var(--date)", fontWeight: 600, fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Total Clients</div>
          <div style={{ fontSize: "2.5rem", fontFamily: "var(--font-display)", color: "var(--ink)", lineHeight: 1.1, marginTop: 8 }}>{totalClients.length}</div>
        </div>
        <div className="ow-card" style={{ padding: 24, borderLeft: "4px solid var(--sage)" }}>
          <div style={{ color: "var(--date)", fontWeight: 600, fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Active Programs</div>
          <div style={{ fontSize: "2.5rem", fontFamily: "var(--font-display)", color: "var(--ink)", lineHeight: 1.1, marginTop: 8 }}>{activeClients}</div>
        </div>
        <div className="ow-card" style={{ padding: 24, borderLeft: "4px solid var(--honey)" }}>
          <div style={{ color: "var(--date)", fontWeight: 600, fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>PDF Exports</div>
          <div style={{ fontSize: "2.5rem", fontFamily: "var(--font-display)", color: "var(--ink)", lineHeight: 1.1, marginTop: 8 }}>{exports.length}</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        <Link href="/owner/clients/new" className="btn btn-primary" style={{ padding: "16px 32px", fontSize: "1.05rem" }}>
          + Create New Client Record
        </Link>
        <Link href="/owner/studio" className="btn btn-ghost" style={{ padding: "16px 32px", fontSize: "1.05rem" }}>
          Open Instagram Studio
        </Link>
      </div>

      {/* Lower Panels */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: 24 }}>
        
        {/* Recent Clients */}
        <div className="ow-card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h2 style={{ fontSize: "1.4rem", margin: 0 }}>Recently Viewed Clients</h2>
            <Link href="/owner/clients" style={{ color: "var(--pom)", fontSize: "0.85rem", fontWeight: 700 }}>View All</Link>
          </div>
          <div style={{ display: "grid", gap: 12 }}>
            {recent.length === 0 && <p style={{ color: "var(--date)" }}>No clients yet.</p>}
            {recent.map((c) => (
              <Link key={c.id} href={`/owner/clients/${c.id}`} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", background: "var(--cream)", borderRadius: 12, transition: "background 0.2s" }}>
                <div>
                  <div style={{ fontWeight: 600, color: "var(--ink)" }}>{c.fullName}</div>
                  <div style={{ fontSize: "0.8rem", color: "var(--date)" }}>{c.program ?? "No program"}</div>
                </div>
                <div style={{ color: "var(--pom)" }}>→</div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Exports */}
        <div className="ow-card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h2 style={{ fontSize: "1.4rem", margin: 0 }}>Recent Exports</h2>
          </div>
          <div style={{ display: "grid", gap: 12 }}>
            {exports.length === 0 && <p style={{ color: "var(--date)" }}>No recent exports.</p>}
            {exports.map((e) => (
              <div key={e.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", background: "var(--cream)", borderRadius: 12 }}>
                <div>
                  <div style={{ fontWeight: 600, color: "var(--ink)", textTransform: "capitalize" }}>{e.kind.replace("-", " ")}</div>
                  <div style={{ fontSize: "0.8rem", color: "var(--date)" }}>{new Date(e.exportedAt).toLocaleDateString()}</div>
                </div>
                {e.fileUrl && <a href={e.fileUrl} target="_blank" rel="noreferrer" style={{ color: "var(--pom)", fontSize: "0.85rem", fontWeight: 700 }}>Download</a>}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}