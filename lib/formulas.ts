export type Sex = "Female" | "Male" | null | undefined;

export const bmi = (kg: number, cm: number) =>
  kg > 0 && cm > 0 ? Math.round((kg / Math.pow(cm / 100, 2)) * 10) / 10 : null;

export const bmiCategory = (b: number | null) =>
  b == null ? "" : b < 18.5 ? "Underweight" : b < 25 ? "Healthy range" : b < 30 ? "Overweight" : "Obesity";

export const healthyWeightRange = (cm: number) => {
  if (!cm) return "";
  const m = cm / 100;
  return `${Math.round(m * m * 18.5)} - ${Math.round(m * m * 24.9)} kg`;
};

export const bmrMifflin = (o: { sex: Sex; weight_kg: number; height_cm: number; age: number }) => {
  if (!o.weight_kg || !o.height_cm || !o.age || !o.sex) return null;
  const base = 10 * o.weight_kg + 6.25 * o.height_cm - 5 * o.age;
  return Math.round(base + (o.sex === "Male" ? 5 : -161));
};

export const tee = (bmr: number | null, factor: number) =>
  bmr == null || !factor ? null : Math.round(bmr * factor);

export const waistFlag = (sex: Sex, waist_cm: number | null) => {
  if (waist_cm == null || !sex) return "";
  return (sex === "Female" && waist_cm >= 88) || (sex === "Male" && waist_cm >= 102)
    ? "Raised risk (Female 88+, Male 102+)" : "OK";
};

export const whrFlag = (sex: Sex, waist: number | null, hip: number | null) => {
  if (!waist || !hip || !sex) return "";
  const r = waist / hip;
  return (sex === "Female" && r > 0.85) || (sex === "Male" && r > 0.9)
    ? "Above threshold (Female 0.85, Male 0.90)" : "OK";
};

export const weightChangeFlag = (current: number | null, past: number | null, months: 3 | 6) => {
  if (!current || !past) return "";
  const delta = Math.abs((current - past) / past);
  const threshold = months === 3 ? 0.05 : 0.1;
  return delta >= threshold
    ? `Clinically significant (${months === 3 ? "5%" : "10%"}+ in ${months} months)` : "OK";
};

export const proteinRange = (kg: number) => (kg > 0 ? `${Math.round(kg * 0.8)} - ${Math.round(kg * 1.2)} g` : "");
export const fluidRange = (kg: number) => (kg > 0 ? `${(kg * 0.03).toFixed(1)} - ${(kg * 0.035).toFixed(1)} L` : "");

export const scoffPositive = (a: boolean[]) => a.filter(Boolean).length >= 2;

export const foodInsecurityPositive = (a: string, b: string) =>
  [a, b].some((v) => v === "Often true" || v === "Sometimes true");

export const caloriePhases = (o: { weight_kg: number; carbPct: number; proteinPct: number; fatPct: number; floorKcal: number; phaseKcals: number[] }) => {
  const macroCheck = Math.round((o.carbPct + o.proteinPct + o.fatPct) * 100) / 100;
  const phases = o.phaseKcals.map((kcal) => {
    const carbs = Math.round((kcal * o.carbPct) / 4);
    const protein = Math.round((kcal * o.proteinPct) / 4);
    const fat = Math.round((kcal * o.fatPct) / 9);
    return {
      kcal,
      carbs_g: carbs,
      protein_g: protein,
      fat_g: fat,
      protein_g_per_kg: o.weight_kg ? Math.round((protein / o.weight_kg) * 100) / 100 : null,
      aboveFloor: kcal >= o.floorKcal,
    };
  });
  return { macroCheck, phases };
};

export const followupDelta = (current: number | null, previous: number | null) =>
  current != null && previous != null ? Math.round((current - previous) * 10) / 10 : null;

export const distanceToGoal = (current: number | null, goal: number | null) =>
  current != null && goal != null ? Math.round(Math.abs(current - goal) * 10) / 10 : null;