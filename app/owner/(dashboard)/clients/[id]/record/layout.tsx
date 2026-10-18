"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const tabs = [
  { slug: "intake", label: "Intake" },
  { slug: "feed", label: "Feed" },
  { slug: "balance", label: "Balance" },
  { slug: "fulfill", label: "Fulfill" },
  { slug: "diagnosis", label: "Diagnosis" },
  { slug: "plan", label: "Plan" },
  { slug: "followups", label: "FollowUps" },
  { slug: "outcome", label: "Outcome" },
];

export default function RecordLayout({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const [clientName, setClientName] = useState("Client Record");
  
  // Extract ID from URL: /owner/clients/[id]/record/[tab]
  const pathParts = path.split("/");
  const id = pathParts[3];

  // Fetch client name for the header
  useEffect(() => {
    async function fetchName() {
      if (!id) return;
      const res = await fetch(`/api/owner/clients/${id}`);
      if (res.ok) {
        const data = await res.json();
        setClientName(data.fullName);
      }
    }
    fetchName();
  }, [id]);

  return (
    <div style={{ display: "grid", gap: 20 }}>
      
      {/* Header Bar with Back Button */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
        <Link 
          href={`/owner/clients/${id}`} 
          className="btn btn-ghost" 
          style={{ padding: "8px 16px", borderRadius: 999, display: "inline-flex", alignItems: "center", gap: 8 }}
        >
          ← Back
        </Link>
        <h2 style={{ fontSize: "1.3rem", margin: 0 }}>{clientName}</h2>
      </div>

      {/* Tabs Navigation (Swipeable on Mobile) */}
      <div style={{ 
        display: "flex", 
        gap: 4, 
        overflowX: "auto", 
        borderBottom: "2px solid var(--cream-2)", 
        paddingBottom: 10,
        WebkitOverflowScrolling: "touch",
        scrollbarWidth: "none", // Firefox
        msOverflowStyle: "none" // IE/Edge
      }}>
        {tabs.map((t) => {
          const isActive = path.endsWith(`/record/${t.slug}`);
          return (
            <Link
              key={t.slug}
              href={`/owner/clients/${id}/record/${t.slug}`}
              style={{
                padding: "8px 16px", 
                borderRadius: 8, 
                fontFamily: "var(--font-head)", 
                fontWeight: 700,
                fontSize: "0.95rem",
                background: isActive ? "var(--pom)" : "transparent",
                color: isActive ? "var(--cream)" : "var(--ink)",
                whiteSpace: "nowrap", 
                transition: "background 0.2s, color 0.2s"
              }}
            >
              {t.label}
            </Link>
          );
        })}
      </div>
      
      {/* Page Content */}
      <div className="ow-card" style={{ padding: "24px 20px" }}>
        {children}
      </div>
    </div>
  );
}