import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import "dotenv/config";
import { db } from "../lib/db/client";
import { lists, resources } from "../lib/db/schema";

const activity = [
  ["Sedentary (desk job, little exercise)", "1.2"],
  ["Lightly active (1-3 days/wk)", "1.375"],
  ["Moderately active (3-5 days/wk)", "1.55"],
  ["Very active (6-7 days/wk)", "1.725"],
  ["Extra active (physical job + training)", "1.9"],
];

const fasting = [
  ["Yes, regularly", "regular"],
  ["Sometimes", "sometimes"],
  ["No", "no"],
  ["Ramadan only", "ramadan"],
  ["Ramadan + voluntary (Mon/Thu, white days)", "ramadan_voluntary"],
  ["Intermittent fasting (non-religious)", "if"],
];

const programs = [
  ["Single consultation", "single"],
  ["Feed Reset (2 wk)", "feed_reset"],
  ["The Naflar Method (6 wk)", "naflar_method"],
  ["Deep Transformation (12 wk)", "deep_transformation"],
];

const domains = ["Intake", "Clinical", "Anthropometric", "Biochemical", "Behavioral", "Environmental"];

const resourceSeed = [
  { key: "method-guide", category: "Guides", title: "The Naflar Method — Feed · Balance · Fulfill" },
  { key: "welcome-pack", category: "Guides", title: "Welcome to Naflar" },
  { key: "trackers", category: "Trackers", title: "My Trackers — Daily Food & Mood Journal, Habits, Weekly Reflection" },
  { key: "7-day-challenge", category: "Programs", title: "The 7-Day Reset" },
  { key: "everyday-guides", category: "Guides", title: "Everyday Nutrition Guides — Plate, Meals, Grocery, Labels, Eating Out" },
  { key: "workbook", category: "Client workbook", title: "Client Workbook — Starting Point, Pillars, Habit Plan, Weekly Check-in" },
  { key: "prediabetes-log-plain", category: "Condition handouts", title: "Pre-Diabetes Log Book (Plain)" },
  { key: "prediabetes-log-naflar", category: "Condition handouts", title: "Pre-Diabetes Log Book (Naflar)" },
];

async function main() {
  // lists
  const rows: { kind: string; label: string; value: string; sort: number }[] = [];
  activity.forEach(([l, v], i) => rows.push({ kind: "activity", label: l, value: v, sort: i }));
  fasting.forEach(([l, v], i) => rows.push({ kind: "fasting", label: l, value: v, sort: i }));
  programs.forEach(([l, v], i) => rows.push({ kind: "program", label: l, value: v, sort: i }));
  domains.forEach((l, i) => rows.push({ kind: "diagnosis_domain", label: l, value: l, sort: i }));
  await db.insert(lists).values(rows).onConflictDoNothing();

  // resources (sections filled in Phase 4; here we seed the shell)
  await db.insert(resources).values(resourceSeed.map((r) => ({
    key: r.key, category: r.category, title: r.title, sections: [],
  }))).onConflictDoNothing();

  console.log("Seed complete. Visit /owner/setup to create your account.");
  process.exit(0);
}

main().catch((e) => { console.error(e); process.exit(1); });