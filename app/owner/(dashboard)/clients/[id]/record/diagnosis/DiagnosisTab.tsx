"use client";
import { useState } from "react";
import { useParams } from "next/navigation";

export default function DiagnosisTab({ initialData }: { initialData: any[] }) {
  const { id } = useParams();
  const [list, setList] = useState(initialData || []);
  const [saving, setSaving] = useState(false);

  async function save() {
    setSaving(true);
    // Phase 3 will handle multi-row saving properly
    console.log("Saving diagnosis", list);
    setTimeout(() => setSaving(false), 500);
  }

  return (
    <div style={{ display: "grid", gap: 20 }}>
      <h2 style={{ fontSize: "1.5rem" }}>Diagnosis (PES Statements)</h2>
      <p style={{ color: "var(--date)" }}>Problem related to Etiology as evidenced by Signs/Symptoms.</p>
      
      {list.map((item: any, i: number) => (
        <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, background: "var(--cream-2)", padding: 12, borderRadius: 8 }}>
          <label className="form">Problem (P) <input value={item.problem || ""} onChange={e => {
            const nl = [...list]; nl[i].problem = e.target.value; setList(nl);
          }} /></label>
          <label className="form">Etiology (E) <input value={item.etiology || ""} onChange={e => {
            const nl = [...list]; nl[i].etiology = e.target.value; setList(nl);
          }} /></label>
          <label className="form">Signs/Symptoms (S) <input value={item.signs || ""} onChange={e => {
            const nl = [...list]; nl[i].signs = e.target.value; setList(nl);
          }} /></label>
        </div>
      ))}
      <button className="btn btn-ghost" onClick={() => setList([...list, { problem: "", etiology: "", signs: "" }])}>+ Add PES Statement</button>

      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
        <button className="btn btn-primary" onClick={save} disabled={saving}>{saving ? "Saving..." : "Save Diagnosis"}</button>
      </div>
    </div>
  );
}