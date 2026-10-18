"use client";
import { useState } from "react";
import { useParams } from "next/navigation";

export default function PlanTab({ initialData }: { initialData: any }) {
  const { id } = useParams();
  const [data, setData] = useState(initialData?.prescription || {});
  const [saving, setSaving] = useState(false);

  async function save() {
    setSaving(true);
    await fetch(`/api/owner/clients/${id}`, {
      method: "PATCH", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ section: "plan", data: { prescription: data } }),
    });
    setSaving(false);
  }

  const set = (k: string) => (e: any) => setData({ ...data, [k]: e.target.value });

  return (
    <div style={{ display: "grid", gap: 20 }}>
      <h2 style={{ fontSize: "1.5rem" }}>Plan: Intervention & Prescription</h2>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        <label className="form">Energy (kcal/day) <input type="number" value={data.energy_kcal || ""} onChange={set("energy_kcal")} /></label>
        <label className="form">Protein (g/day) <input type="number" value={data.protein || ""} onChange={set("protein")} /></label>
        <label className="form">Carbs <input value={data.carbs || ""} onChange={set("carbs")} /></label>
        <label className="form">Fat <input value={data.fat || ""} onChange={set("fat")} /></label>
        <label className="form">Fiber <input value={data.fiber || ""} onChange={set("fiber")} /></label>
        <label className="form">Fluid <input value={data.fluid || ""} onChange={set("fluid")} /></label>
      </div>

      <label className="form">Eating Pattern / Timing <textarea rows={3} value={data.eating_pattern || ""} onChange={set("eating_pattern")} /></label>
      <label className="form">Basis for prescription (guideline, reasoning) <textarea rows={2} value={data.basis || ""} onChange={set("basis")} /></label>

      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
        <button className="btn btn-primary" onClick={save} disabled={saving}>{saving ? "Saving..." : "Save Plan"}</button>
      </div>
    </div>
  );
}