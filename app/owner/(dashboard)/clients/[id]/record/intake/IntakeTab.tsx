"use client";
import { useState } from "react";
import { useParams } from "next/navigation";

export default function IntakeTab({ initialData }: { initialData: any }) {
  const { id } = useParams();
  const [data, setData] = useState(initialData);
  const [saving, setSaving] = useState(false);

  async function save() {
    setSaving(true);
    await fetch(`/api/owner/clients/${id}`, {
      method: "PATCH", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ section: "intake", data }),
    });
    setSaving(false);
  }

  const set = (k: string) => (e: any) => setData({ ...data, [k]: e.target.value });

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <h2 style={{ fontSize: "1.5rem" }}>Intake & Safety Screen</h2>
      
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <label className="form">Occupation <input value={data.occupation || ""} onChange={set("occupation")} /></label>
        <label className="form">Preferred Language <input value={data.preferredLanguage || ""} onChange={set("preferredLanguage")} /></label>
        <label className="form">Referral Source <input value={data.referralSource || ""} onChange={set("referralSource")} /></label>
      </div>

      <h3 style={{ marginTop: 10, fontSize: "1.2rem" }}>Reason for visit</h3>
      <label className="form">Main concern (own words) <textarea rows={3} value={data.mainConcern || ""} onChange={set("mainConcern")} /></label>
      <label className="form">What do you most want? <textarea rows={2} value={data.whatTheyWant || ""} onChange={set("whatTheyWant")} /></label>
      <label className="form">Why now? <textarea rows={2} value={data.whyNow || ""} onChange={set("whyNow")} /></label>

      <h3 style={{ marginTop: 10, fontSize: "1.2rem" }}>Readiness (1-10)</h3>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <label className="form">Importance <input type="number" min="1" max="10" value={data.importance_1_10 || ""} onChange={set("importance_1_10")} /></label>
        <label className="form">Confidence <input type="number" min="1" max="10" value={data.confidence_1_10 || ""} onChange={set("confidence_1_10")} /></label>
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
        <button className="btn btn-primary" onClick={save} disabled={saving}>
          {saving ? "Saving..." : "Save Intake"}
        </button>
      </div>
    </div>
  );
}