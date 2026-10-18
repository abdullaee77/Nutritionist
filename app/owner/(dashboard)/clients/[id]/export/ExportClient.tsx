"use client";
import { useState } from "react";
import Link from "next/link";

const EXPORT_TYPES = [
  { id: "full", label: "Full Client Record (All Tabs)" },
  { id: "intake", label: "Client Record - Intake" },
  { id: "feed", label: "Client Record - Feed" },
  { id: "balance", label: "Client Record - Balance" },
  { id: "fulfill", label: "Client Record - Fulfill" },
  { id: "diagnosis", label: "Client Record - Diagnosis" },
  { id: "plan", label: "Client Record - Plan" },
  { id: "followups", label: "Client Record - FollowUps" },
  { id: "outcome", label: "Client Record - Outcome" },
  { id: "assessment", label: "Nutrition Assessment Form" },
  { id: "care-plan", label: "Nutrition Care Plan" },
  { id: "meal-plan", label: "Meal Plan" },
  { id: "prediabetes", label: "Prediabetes Plan" },
  { id: "outcome-report", label: "Outcome Report" },
];

export default function ExportClient({ clientId }: { clientId: string }) {
  const [selectedExport, setSelectedExport] = useState("full");
  const [loading, setLoading] = useState(false);

  async function handleExport() {
    setLoading(true);
    
    const res = await fetch(`/api/owner/clients/${clientId}/export?type=${selectedExport}`);
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Naflar_Export_${selectedExport}.pdf`;
    a.click();
    
    setLoading(false);
  }

  return (
    <div style={{ maxWidth: 500, margin: "40px auto" }}>
      <Link href={`/owner/clients/${clientId}`} className="btn btn-ghost" style={{ padding: "8px 16px", marginBottom: 20, display: "inline-flex", alignItems: "center", gap: 8 }}>
        ← Back to Client
      </Link>

      <div className="ow-card">
        <h1 style={{ fontSize: "1.8rem", marginBottom: 10 }}>Export Client Record</h1>
        <p style={{ color: "var(--date)", marginBottom: 24 }}>
          Select the document you want to generate and download as a PDF.
        </p>

        <div style={{ display: "grid", gap: 16 }}>
          <label className="form">
            Select Export Type
            <select value={selectedExport} onChange={(e) => setSelectedExport(e.target.value)}>
              {EXPORT_TYPES.map((t) => (
                <option key={t.id} value={t.id}>{t.label}</option>
              ))}
            </select>
          </label>

          <button 
            className="btn btn-primary" 
            onClick={handleExport} 
            disabled={loading}
            style={{ width: "100%", marginTop: 10 }}
          >
            {loading ? "Generating PDF..." : "Download PDF"}
          </button>
        </div>
      </div>
    </div>
  );
}