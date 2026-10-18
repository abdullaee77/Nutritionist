import { describe, it, expect } from "vitest";
import { bmi, bmiCategory, bmrMifflin, tee, waistFlag, whrFlag, weightChangeFlag, proteinRange, fluidRange, scoffPositive, foodInsecurityPositive, caloriePhases, followupDelta, distanceToGoal } from "../lib/formulas";

describe("Naflar formulas", () => {
  it("BMI 57kg / 160cm = 22.3 healthy", () => {
    expect(bmi(57, 160)).toBe(22.3);
    expect(bmiCategory(22.3)).toBe("Healthy range");
  });
  it("Mifflin female 22y 57kg 160cm = 1299", () => {
    expect(bmrMifflin({ sex: "Female", weight_kg: 57, height_cm: 160, age: 22 })).toBe(1299);
  });
  it("TEE sedentary = 1559", () => {
    expect(tee(1299, 1.2)).toBe(1559);
  });
  it("waist 82cm F = OK (below 88)", () => {
    expect(waistFlag("Female", 82)).toBe("OK");
  });
  it("WHI 82/94 F = above 0.85", () => {
    expect(whrFlag("Female", 82, 94)).toBe("Above threshold (Female 0.85, Male 0.90)");
  });
  it("5% in 3 months flagged", () => {
    expect(weightChangeFlag(57, 60, 3)).toBe("Clinically significant (5%+ in 3 months)");
  });
  it("protein 0.8-1.2 g/kg for 57kg", () => {
    expect(proteinRange(57)).toBe("46 - 68 g");
  });
  it("fluid 30-35mL/kg for 57kg", () => {
    expect(fluidRange(57)).toBe("1.7 - 2.0 L");
  });
  it("SCOFF 2/5 = positive", () => {
    expect(scoffPositive([true, false, true, false, false])).toBe(true);
    expect(scoffPositive([true, false, false, false, false])).toBe(false);
  });
  it("food insecurity sometimes = positive", () => {
    expect(foodInsecurityPositive("Sometimes true", "")).toBe(true);
    expect(foodInsecurityPositive("Never true", "")).toBe(false);
  });
  it("calorie phases match 57kg example", () => {
    const r = caloriePhases({ weight_kg: 57, carbPct: 0.5, proteinPct: 0.2, fatPct: 0.3, floorKcal: 1500, phaseKcals: [1750, 1650, 1575] });
    expect(r.macroCheck).toBe(1);
    expect(r.phases[0]).toEqual({ kcal: 1750, carbs_g: 219, protein_g: 88, fat_g: 58, protein_g_per_kg: 1.54, aboveFloor: true });
    expect(r.phases[1]).toEqual({ kcal: 1650, carbs_g: 206, protein_g: 83, fat_g: 55, protein_g_per_kg: 1.46, aboveFloor: true });
    expect(r.phases[2]).toEqual({ kcal: 1575, carbs_g: 197, protein_g: 79, fat_g: 53, protein_g_per_kg: 1.39, aboveFloor: true });
  });
  it("follow-up delta 58 → 56.5 = -1.5", () => {
    expect(followupDelta(56.5, 58)).toBe(-1.5);
  });
  it("distance to goal 56.5 → 54 = 2.5", () => {
    expect(distanceToGoal(56.5, 54)).toBe(2.5);
  });
});