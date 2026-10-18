"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import LiveStats from "@/components/owner/LiveStats";

export default function FeedTab({ initialData, intakeData }: { initialData: any, intakeData: any }) {
  const { id } = useParams();
  const [data, setData] = useState(initialData);
  const [saving, setSaving] = useState(false);

  async function save() {
    setSaving(true);
    await fetch(`/api/owner/clients/${id}`, {
      method: "PATCH", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ section: "feed", data }),
    });
    setSaving(false);
  }

  const set = (k: string) => (e: any) => setData({ ...data, [k]: e.target.value });

  return (
    <div style={{ display: "grid", gap: 20 }}>
      <h2 style={{ fontSize: "1.5rem" }}>Feed: Physical Assessment</h2>

      {/* Live Formula Calculator */}
   
<LiveStats feed={data} intake={intakeData} />
      {/* Anthropometrics */}
      <h3 style={{ fontSize: "1.2rem", borderBottom: "1px solid var(--cream-2)" }}>Anthropometrics</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        <label className="form">Height (cm) <input type="number" value={data.heightCm || ""} onChange={set("heightCm")} /></label>
        <label className="form">Weight (kg) <input type="number" value={data.currentWeight || ""} onChange={set("currentWeight")} /></label>
        <label className="form">Goal Weight (kg) <input type="number" value={data.goalWeight || ""} onChange={set("goalWeight")} /></label>
        <label className="form">Waist (cm) <input type="number" value={data.waistCm || ""} onChange={set("waistCm")} /></label>
        <label className="form">Hip (cm) <input type="number" value={data.hipCm || ""} onChange={set("hipCm")} /></label>
        <label className="form">Body Comp <input value={data.bodyComp || ""} onChange={set("bodyComp")} /></label>
      </div>

      {/* Medical History */}
      <h3 style={{ fontSize: "1.2rem", marginTop: 10, borderBottom: "1px solid var(--cream-2)" }}>Medical History & Meds</h3>
      <label className="form">Allergies / Intolerances <textarea rows={2} value={data.allergies || ""} onChange={set("allergies")} /></label>
      <label className="form">Other conditions, surgeries <textarea rows={2} value={data.otherConditions || ""} onChange={set("otherConditions")} /></label>

      {/* Food History */}
      <h3 style={{ fontSize: "1.2rem", marginTop: 10, borderBottom: "1px solid var(--cream-2)" }}>Food History</h3>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <label className="form">Meals / Day <input value={data.mealsPerDay || ""} onChange={set("mealsPerDay")} /></label>
        <label className="form">Water (litres) <input type="number" step="0.1" value={data.waterLiters || ""} onChange={set("waterLiters")} /></label>
        <label className="form">Breakfast <input value={data.breakfast || ""} onChange={set("breakfast")} /></label>
        <label className="form">Usual meal times <input value={data.usualMealTimes || ""} onChange={set("usualMealTimes")} /></label>
      </div>

      <label className="form">Clinician observations (nutrient adequacy, gaps) <textarea rows={3} value={data.clinicianNotes || ""} onChange={set("clinicianNotes")} /></label>

      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
        <button className="btn btn-primary" onClick={save} disabled={saving}>
          {saving ? "Saving..." : "Save Feed"}
        </button>
      </div>
    </div>
  );
}