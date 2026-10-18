"use client";
import { bmi, bmiCategory, bmrMifflin, waistFlag, proteinRange, fluidRange } from "@/lib/formulas";

export default function LiveStats({ feed, intake }: { feed: any, intake: any }) {
  const weight = Number(feed?.currentWeight) || 0;
  const height = Number(feed?.heightCm) || 0;
  const waist = Number(feed?.waistCm) || 0;
  const age = intake?.dateOfAssessment && intake?.clientDob ? new Date().getFullYear() - new Date(intake.clientDob).getFullYear() : 25; // Fallback age
  
  const bmiVal = bmi(weight, height);
  const bmrVal = bmrMifflin({ sex: intake?.sex || "Female", weight_kg: weight, height_cm: height, age: age });

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, background: "var(--cream-2)", padding: 16, borderRadius: 16, marginBottom: 24 }}>
      <div>
        <small style={{ color: "var(--date)", fontWeight: "bold" }}>BMI</small>
        <div style={{ fontSize: "1.2rem", fontWeight: "bold" }}>{bmiVal || "--"} <span style={{ fontSize: ".8rem", fontWeight: "normal", color: "var(--pom)" }}>{bmiCategory(bmiVal)}</span></div>
      </div>
      <div>
        <small style={{ color: "var(--date)", fontWeight: "bold" }}>BMR (kcal)</small>
        <div style={{ fontSize: "1.2rem", fontWeight: "bold" }}>{bmrVal || "--"}</div>
      </div>
      <div>
        <small style={{ color: "var(--date)", fontWeight: "bold" }}>Protein Range</small>
        <div style={{ fontSize: "1.2rem", fontWeight: "bold" }}>{proteinRange(weight) || "--"}</div>
      </div>
      <div>
        <small style={{ color: "var(--date)", fontWeight: "bold" }}>Waist Flag</small>
        <div style={{ fontSize: "1rem", fontWeight: "bold", color: waist >= 88 ? "red" : "green" }}>{waistFlag(intake?.sex, waist) || "--"}</div>
      </div>
    </div>
  );
}