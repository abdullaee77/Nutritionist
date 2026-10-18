"use client";
import { useState } from "react";
import { caloriePhases } from "@/lib/formulas";

export default function CalculatorPage() {
  const [weight, setWeight] = useState<number | "">(57);
  const [carb, setCarb] = useState<number | "">(0.5);
  const [protein, setProtein] = useState<number | "">(0.2);
  const [fat, setFat] = useState<number | "">(0.3);
  const [floor, setFloor] = useState<number | "">(1500);

  const result = (weight && carb && protein && fat && floor) ? caloriePhases({
    weight_kg: Number(weight), carbPct: Number(carb), proteinPct: Number(protein), fatPct: Number(fat),
    floorKcal: Number(floor), phaseKcals: [1750, 1650, 1575]
  }) : null;

  return (
    <div style={{ maxWidth: 900, display: "grid", gap: 24, width: "100%" }}>
      <header>
        <h1 style={{ fontSize: "2.2rem" }}>Clinical Calculator</h1>
        <p style={{ color: "var(--date)" }}>Prediabetes Gradual Calorie Reduction Plan.</p>
      </header>

      {/* Inputs: auto-fit stacks them automatically on mobile */}
      <div className="ow-card" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 16 }}>
        <label className="form">Weight (kg) <input type="number" value={weight} onChange={e => setWeight(Number(e.target.value))} /></label>
        <label className="form">Carb % <input type="number" step="0.05" value={carb} onChange={e => setCarb(Number(e.target.value))} /></label>
        <label className="form">Protein % <input type="number" step="0.05" value={protein} onChange={e => setProtein(Number(e.target.value))} /></label>
        <label className="form">Fat % <input type="number" step="0.05" value={fat} onChange={e => setFat(Number(e.target.value))} /></label>
        <label className="form">Floor (kcal) <input type="number" value={floor} onChange={e => setFloor(Number(e.target.value))} /></label>
      </div>

      {result && result.macroCheck !== 1 && (
        <div className="ow-flag-red">
          Warning: Your percentages do not add up to 100% (Current: {result.macroCheck * 100}%).
        </div>
      )}

      {result && (
        <div className="ow-card" style={{ padding: 0, overflowX: "auto" }}>
          <table style={{ width: "100%", minWidth: 600, borderCollapse: "collapse" }}>
            <thead style={{ background: "var(--cream-2)", textAlign: "left" }}>
              <tr>
                <th style={{ padding: 16 }}>Phase</th>
                <th style={{ padding: 16 }}>Energy (kcal)</th>
                <th style={{ padding: 16 }}>Carbs (g)</th>
                <th style={{ padding: 16 }}>Protein (g)</th>
                <th style={{ padding: 16 }}>Fat (g)</th>
                <th style={{ padding: 16 }}>Protein (g/kg)</th>
              </tr>
            </thead>
            <tbody>
              {result.phases.map((p, i) => (
                <tr key={i} style={{ borderTop: "1px solid var(--cream-2)" }}>
                  <td style={{ padding: 16, fontWeight: "bold" }}>Phase {i + 1}</td>
                  <td style={{ padding: 16 }}>{p.kcal} {!p.aboveFloor && <span style={{ color: "red", fontSize: ".8rem" }}>(Below Floor)</span>}</td>
                  <td style={{ padding: 16 }}>{p.carbs_g}g</td>
                  <td style={{ padding: 16 }}>{p.protein_g}g</td>
                  <td style={{ padding: 16 }}>{p.fat_g}g</td>
                  <td style={{ padding: 16, fontWeight: "bold" }}>{p.protein_g_per_kg}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}