import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db/client";
import { clients } from "@/lib/db/schema";
import { desc, ilike, or } from "drizzle-orm";

export const instant = false;

export default async function ClientsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const session = await auth();
  if (!session) redirect("/owner/login");

  const { q } = await searchParams;
  const where = q
    ? or(ilike(clients.fullName, `%${q}%`), ilike(clients.phone ?? "", `%${q}%`))
    : undefined;
  const list = await db.select().from(clients).where(where).orderBy(desc(clients.updatedAt));

  return (
    <div style={{ display: "grid", gap: 24, width: "100%" }}>
      
      {/* SCOPED RESPONSIVE CSS */}
      <style>{`
        .view-desktop { display: block !important; }
        .view-mobile { display: none !important; }
        @media (max-width: 768px) {
          .view-desktop { display: none !important; }
          .view-mobile { display: grid !important; }
        }
        .hover-row:hover { background-color: var(--cream) !important; }
      `}</style>

      {/* Header */}
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16 }}>
        <div>
          <h1 style={{ fontSize: "2.2rem" }}>Clients</h1>
          <p style={{ color: "var(--date)" }}>Manage your client records and follow-ups.</p>
        </div>
        <Link 
          href="/owner/clients/new" 
          className="btn btn-primary" 
          style={{ padding: "12px 24px", whiteSpace: "nowrap" }}
        >
          + New Client
        </Link>
      </header>

      {/* Search Bar */}
      <form className="form" style={{ width: "100%", maxWidth: 400 }}>
        <label style={{ position: "relative", display: "block" }}>
          <span style={{ position: "absolute", left: 16, top: 16, color: "var(--date)", opacity: 0.6 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </span>
          <input 
            name="q" 
            defaultValue={q ?? ""} 
            placeholder="Search by name or phone..." 
            style={{ paddingLeft: 44, borderRadius: 999 }} 
          />
        </label>
      </form>

      {/* EMPTY STATE */}
      {list.length === 0 && (
        <div className="ow-card" style={{ padding: 40, textAlign: "center", color: "var(--date)" }}>
          No clients found. Click <b>+ New Client</b> to get started.
        </div>
      )}

      {/* DESKTOP TABLE VIEW */}
      <div className="ow-card view-desktop" style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 600 }}>
            <thead style={{ background: "var(--cream-2)", textAlign: "left", borderBottom: "1px solid rgba(168,71,90,0.1)" }}>
              <tr>
                <th style={{ padding: "16px 24px", fontFamily: "var(--font-head)", fontWeight: 700, color: "var(--date)", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Client Name</th>
                <th style={{ padding: "16px 24px", fontFamily: "var(--font-head)", fontWeight: 700, color: "var(--date)", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Program</th>
                <th style={{ padding: "16px 24px", fontFamily: "var(--font-head)", fontWeight: 700, color: "var(--date)", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Status</th>
                <th style={{ padding: "16px 24px", fontFamily: "var(--font-head)", fontWeight: 700, color: "var(--date)", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Last Updated</th>
                <th style={{ padding: "16px 24px" }}></th>
              </tr>
            </thead>
            <tbody>
              {list.map((c) => (
                <tr key={c.id} style={{ borderTop: "1px solid var(--cream-2)" }} className="hover-row">
                  <td style={{ padding: "16px 24px" }}>
                    <Link href={`/owner/clients/${c.id}`} style={{ fontWeight: 600, color: "var(--pom)", fontSize: "1.05rem" }}>{c.fullName}</Link>
                  </td>
                  <td style={{ padding: "16px 24px", color: "var(--ink)" }}>{c.program ?? "—"}</td>
                  <td style={{ padding: "16px 24px" }}>
                    <span style={{ background: c.status === "active" ? "#eef5ec" : "var(--cream-2)", color: c.status === "active" ? "#5f7d5a" : "var(--date)", padding: "4px 12px", borderRadius: 999, fontSize: "0.8rem", fontWeight: 700, textTransform: "capitalize" }}>
                      {c.status}
                    </span>
                  </td>
                  <td style={{ padding: "16px 24px", color: "var(--date)", fontSize: "0.9rem" }}>
                    {new Date(c.updatedAt).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
                  </td>
                  <td style={{ padding: "16px 24px", textAlign: "right" }}>
                    <Link href={`/owner/clients/${c.id}`} className="btn btn-ghost" style={{ padding: "6px 16px", fontSize: "0.85rem", borderRadius: 999 }}>Open Record →</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MOBILE CARD VIEW */}
      <div className="view-mobile" style={{ gap: 16 }}>
        {list.map((c) => (
          <div key={c.id} className="ow-card" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
              <div>
                <div style={{ fontWeight: 700, color: "var(--pom)", fontSize: "1.2rem", fontFamily: "var(--font-head)" }}>{c.fullName}</div>
                <div style={{ color: "var(--date)", fontSize: "0.9rem", marginTop: 4 }}>{c.program ?? "No program"}</div>
              </div>
              <Link 
                href={`/owner/clients/${c.id}`} 
                className="btn btn-primary" 
                style={{ padding: "8px 12px", fontSize: "0.8rem", borderRadius: 999, whiteSpace: "nowrap" }}
              >
                Open →
              </Link>
            </div>
            
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--cream-2)", paddingTop: 12, fontSize: "0.85rem", color: "var(--date)" }}>
              <span style={{ background: c.status === "active" ? "#eef5ec" : "var(--cream-2)", color: c.status === "active" ? "#5f7d5a" : "var(--date)", padding: "4px 10px", borderRadius: 999, fontSize: "0.75rem", fontWeight: 700, textTransform: "capitalize" }}>
                {c.status}
              </span>
              <span>Updated: {new Date(c.updatedAt).toLocaleDateString()}</span>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}