"use client";
import { useState } from "react";
import { useParams } from "next/navigation";

export default function OutcomeTab({ initialData }: { initialData: any }) {
  const { id } = useParams();
  const [data, setData] = useState(initialData);
  const [saving, setSaving] = useState(false);

  const set = (k: string) => (e: any) => setData({ ...data, [k]: e.target.value });

  return (
    <div style={{ display: "grid", gap: 20 }}>
      <h2 style={{ fontSize: "1.5rem" }}>Outcome & Monitoring</h2>

      <h3 style={{ fontSize: "1.2rem", marginTop: 10, borderBottom: "1px solid var(--cream-2)" }}>Final Lab Results</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
        <label className="form">Fasting Glucose <input type="number" value={data.latestGlucose || ""} onChange={set("latestGlucose")} /></label>
        <label className="form">HbA1c (%) <input type="number" step="0.1" value={data.latestHba1c || ""} onChange={set("latestHba1c")} /></label>
        <label className="form">Vitamin D <input type="number" value={data.latestVitD || ""} onChange={set("latestVitD")} /></label>
        <label className="form">Ferritin <input type="number" value={data.latestFerritin || ""} onChange={set("latestFerritin")} /></label>
      </div>

      <h3 style={{ fontSize: "1.2rem", marginTop: 10, borderBottom: "1px solid var(--cream-2)" }}>Client's Words</h3>
      <label className="form">Testimonial (with permission) <textarea rows={4} value={data.testimonialWords || ""} onChange={set("testimonialWords")} /></label>

      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
        <button className="btn btn-primary" onClick={async () => {
          setSaving(true);
          await fetch(`/api/owner/clients/${id}`, {
            method: "PATCH", headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ section: "outcome", data }),
          });
          setSaving(false);
        }} disabled={saving}>{saving ? "Saving..." : "Save Outcome"}</button>
      </div>
    </div>
  );
}