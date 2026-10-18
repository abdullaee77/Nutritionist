"use client";
import { useState } from "react";
import { useParams } from "next/navigation";

export default function BalanceTab({ initialData }: { initialData: any }) {
  const { id } = useParams();
  const [data, setData] = useState(initialData);
  const [saving, setSaving] = useState(false);

  async function save() {
    setSaving(true);
    await fetch(`/api/owner/clients/${id}`, {
      method: "PATCH", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ section: "balance", data }),
    });
    setSaving(false);
  }

  const set = (k: string) => (e: any) => setData({ ...data, [k]: e.target.value });

  return (
    <div style={{ display: "grid", gap: 20 }}>
      <h2 style={{ fontSize: "1.5rem" }}>Balance: Mind & Lifestyle</h2>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <label className="form">Bedtime <input type="time" value={data.bedtime || ""} onChange={set("bedtime")} /></label>
        <label className="form">Wake time <input type="time" value={data.wakeTime || ""} onChange={set("wakeTime")} /></label>
        <label className="form">Avg Sleep (hours) <input type="number" step="0.5" value={data.avgSleepHours || ""} onChange={set("avgSleepHours")} /></label>
        <label className="form">Sleep Quality (1-10) <input type="number" min="1" max="10" value={data.sleepQuality || ""} onChange={set("sleepQuality")} /></label>
      </div>

      <h3 style={{ fontSize: "1.2rem", marginTop: 10, borderBottom: "1px solid var(--cream-2)" }}>Stress & Eating</h3>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <label className="form">Perceived Stress (1-10) <input type="number" min="1" max="10" value={data.perceivedStress_1_10 || ""} onChange={set("perceivedStress_1_10")} /></label>
        <label className="form">Emotional Eating (1-10) <input type="number" min="1" max="10" value={data.allOrNothing_1_10 || ""} onChange={set("allOrNothing_1_10")} /></label>
      </div>
      <label className="form">Fasting practice & experience <textarea rows={2} value={data.fastingExperience || ""} onChange={set("fastingExperience")} /></label>
      <label className="form">Support people / community <textarea rows={2} value={data.supportPeople || ""} onChange={set("supportPeople")} /></label>

      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
        <button className="btn btn-primary" onClick={save} disabled={saving}>{saving ? "Saving..." : "Save Balance"}</button>
      </div>
    </div>
  );
}