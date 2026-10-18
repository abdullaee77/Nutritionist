"use client";
import { useState } from "react";
import { useParams } from "next/navigation";

export default function FulfillTab({ initialData }: { initialData: any }) {
  const { id } = useParams();
  const [data, setData] = useState(initialData);
  const [saving, setSaving] = useState(false);

  async function save() {
    setSaving(true);
    await fetch(`/api/owner/clients/${id}`, {
      method: "PATCH", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ section: "fulfill", data }),
    });
    setSaving(false);
  }

  const set = (k: string) => (e: any) => setData({ ...data, [k]: e.target.value });

  return (
    <div style={{ display: "grid", gap: 20 }}>
      <h2 style={{ fontSize: "1.5rem" }}>Fulfill: Purpose & Spirit</h2>

      <label className="form">Why does caring for your body matter? <textarea rows={3} value={data.whyBodyMatters || ""} onChange={set("whyBodyMatters")} /></label>
      <label className="form">What do you feel you are here to do? <textarea rows={3} value={data.purposeHereToDo || ""} onChange={set("purposeHereToDo")} /></label>
      
      <h3 style={{ fontSize: "1.2rem", marginTop: 10, borderBottom: "1px solid var(--cream-2)" }}>Intention</h3>
      <label className="form">Intention for this program (one sentence) <input value={data.intention || ""} onChange={set("intention")} /></label>
      <label className="form">At 90 days, what do you hope to notice? <textarea rows={2} value={data.at90Days || ""} onChange={set("at90Days")} /></label>

      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
        <button className="btn btn-primary" onClick={save} disabled={saving}>{saving ? "Saving..." : "Save Fulfill"}</button>
      </div>
    </div>
  );
}