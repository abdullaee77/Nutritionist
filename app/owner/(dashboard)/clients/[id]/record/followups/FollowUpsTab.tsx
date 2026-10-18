"use client";
import { useState } from "react";

export default function FollowUpsTab({ clientId, initialData }: { clientId: string, initialData: any[] }) {
  const [visits, setVisits] = useState(initialData);
  const [saving, setSaving] = useState(false);

  // Note: Multi-row saving will be handled via a dedicated API in the next update. 
  // For now, this renders the UI.

  function addVisit() {
    setVisits([...visits, { 
      id: Date.now().toString(), 
      visitNo: visits.length + 1, 
      visitDate: "", 
      programWeek: "", 
      weightKg: "", 
      waistCm: "",
      wantsToTalk: "" 
    }]);
  }

  return (
    <div style={{ display: "grid", gap: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={{ fontSize: "1.5rem" }}>Follow-Up Visits</h2>
        <button className="btn btn-ghost" onClick={addVisit}>+ Add Visit</button>
      </div>

      {visits.length === 0 && (
        <p style={{ color: "var(--date)" }}>No follow-ups recorded yet.</p>
      )}

      {visits.map((v, i) => (
        <div key={v.id} className="ow-card" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          <label className="form">Visit # <input readOnly value={v.visitNo} /></label>
          <label className="form">Date <input type="date" defaultValue={v.visitDate || ""} /></label>
          <label className="form">Weight (kg) <input type="number" step="0.1" defaultValue={v.weightKg || ""} /></label>
          <label className="form">Waist (cm) <input type="number" step="0.1" defaultValue={v.waistCm || ""} /></label>
          <label className="form" style={{ gridColumn: "span 4" }}>What does the client want to talk about today? <textarea rows={2} defaultValue={v.wantsToTalk || ""} /></label>
        </div>
      ))}

      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
        <button className="btn btn-primary" disabled={saving}>Save Follow-Ups</button>
      </div>
    </div>
  );
}