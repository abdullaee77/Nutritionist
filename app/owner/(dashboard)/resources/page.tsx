import Link from "next/link";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db/client";
import { resources } from "@/lib/db/schema";
import { redirect } from "next/navigation";
import { desc } from "drizzle-orm";

export const instant = false;

export default async function ResourcesPage() {
  const session = await auth();
  if (!session) redirect("/owner/login");

  const list = await db.select().from(resources).orderBy(desc(resources.category));

  return (
    <div style={{ display: "grid", gap: 24, width: "100%" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ fontSize: "2.2rem" }}>Resources & Handouts</h1>
          <p style={{ color: "var(--date)" }}>Edit and export the educational materials.</p>
        </div>
      </header>

      {list.length === 0 ? (
        <div className="ow-card" style={{ textAlign: "center", padding: 60 }}>
          <h3 style={{ fontSize: "1.4rem", marginBottom: 10 }}>No resources found</h3>
          <p style={{ color: "var(--date)", marginBottom: 20 }}>
            Your database is empty. Run <code>npm run db:seed</code> in your terminal to load the default handouts.
          </p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
          {list.map((r) => (
            <div key={r.key} className="ow-card" style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ marginBottom: 12 }}>
                <span className="tag" style={{ background: "var(--cream-2)", padding: "4px 10px", borderRadius: 99 }}>
                  {r.category}
                </span>
              </div>
              <h3 style={{ fontSize: "1.2rem", flex: 1, marginBottom: 20, fontWeight: 600, color: "var(--ink)" }}>
                {r.title}
              </h3>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <Link href={`/owner/resources/${r.key}`} className="btn btn-ghost" style={{ flex: 1, padding: "8px 0", minWidth: 100 }}>
                  Edit
                </Link>
                <Link href={`/api/owner/resources/${r.key}/export`} className="btn btn-primary" style={{ flex: 1, padding: "8px 0", minWidth: 100 }}>
                  Export PDF
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}