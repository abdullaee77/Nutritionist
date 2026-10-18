import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { db } from "../lib/db/client";
import { resources } from "../lib/db/schema";
import { eq } from "drizzle-orm";

const data = [
  {
    key: "nutrition-assessment",
    category: "Clinical Forms",
    title: "Nutrition Assessment Form (NCP)",
    sections: [
      { heading: "Client Information", body: "Name:\nFile no:\nAge / Sex:\nDate of assessment:\nContact:\nOccupation:\nReferred by:\nAssessor:" },
      { heading: "1. A. FEED · Body (physical, clinical nutrition)", body: "Anthropometric data:\nHeight:\nWeight:\nBMI:\nWaist / Hip:\nUsual weight:\nGoal weight:\nWeight change (6 months):\nBody fat / other:\n\nBiochemical / medical tests:\nTest | Result | Date\n\nClinical history and physical findings:\nMedical history:\nMedications / supplements:\nAllergies / intolerances:\nFamily history:\nBlood pressure / pulse:\nDigestion (bowels, bloating, reflux):\nHormonal / menstrual (if relevant):\nPhysical signs (skin, hair, nails, energy):" },
      { heading: "Food and Nutrition History", body: "Time / meal | Food and drink | Amount | Notes\nWake-up:\nBreakfast:\nMid-morning:\nLunch:\nEvening snack:\nDinner:\nNight:\n\nFluids / caffeine per day:\nEating out / takeaway:\nWho cooks / shops:\nCultural or religious food practices (e.g. fasting):\nAppetite, cravings, food dislikes:" },
      { heading: "B. BALANCE · Mind and Lifestyle", body: "Sleep (hours, quality):\nStress level (1-10):\nPhysical activity:\nWork / family schedule:\nMeal timing routine:\nSupport at home:\nMood and food (emotional eating, guilt, restriction):\nDaily routine challenges:" },
      { heading: "C. FULFILL · Purpose and Spirit", body: "What does a healthy life mean to you?\nWhat is your deeper reason for change?\nFaith or routines that support you:\n\nReadiness to change:\n[ ] Not ready\n[ ] Thinking about it\n[ ] Preparing\n[ ] Taking action\n[ ] Maintaining\nConfidence (1-10):\nMain barriers:" },
      { heading: "2. NUTRITION DIAGNOSIS (PES)", body: "Write each diagnosis as: Problem related to Etiology as evidenced by Signs and symptoms.\n\nProblem (P):\nRelated to (E):\nAs evidenced by (S):" },
      { heading: "3. NUTRITION INTERVENTION", body: "Nutrition prescription:\nEnergy (kcal):\nProtein:\nCarbohydrate:\nFat:\nFibre / fluid:\nOther (sodium, etc.):\n\nGoals:\nPillar | Goal (specific, measurable, realistic) | Target date\nFeed (body):\nBalance (mind):\nFulfill (purpose):\n\nEducation and counselling given:\n[ ] Meal plan\n[ ] Portion guide\n[ ] Label reading\n[ ] Meal timing\n[ ] Sleep and stress habits\n[ ] Mindful eating\n[ ] Food and mood journal\n[ ] Other:" },
      { heading: "4. MONITORING AND EVALUATION", body: "Indicator | Baseline | Target | Review date | Result\n\nNext follow-up:\nAssessor signature:" }
    ]
  },
  {
    key: "prediabetes-log-plain",
    category: "Condition Handouts",
    title: "Pre-Diabetes Log Book (Plain)",
    sections: [
      { heading: "1. ASSESSMENT (baseline)", body: "Height:\nWeight:\nBMI:\nWaist:\n\nMedical history / family history of diabetes:\nMedicines and supplements:\nUsual meals and snacks:\nSweet drinks and sweets per week:\nPhysical activity:\nSleep and stress:" },
      { heading: "2. NUTRITION DIAGNOSIS", body: "Write as: Problem related to cause as evidenced by signs and symptoms.\n\nProblem:\nRelated to:\nAs evidenced by:" },
      { heading: "3. INTERVENTION (my plan)", body: "Goal | How I will do it | By when\n\n[ ] Meal plan given\n[ ] Carbohydrate portions and spread across the day reviewed\n[ ] Sweet drinks reviewed\n[ ] Activity plan agreed\n[ ] Sleep and stress habits discussed" },
      { heading: "4. MONITORING (results over time)", body: "Measure | Baseline | Target | Check 1 | Check 2 | Check 3\nHbA1c:\nFasting glucose:\nWeight:\nWaist:\nBlood pressure:\nOther:\n\nReference ranges (American Diabetes Association) for pre-diabetes: HbA1c 5.7–6.4%; fasting glucose 100–125 mg/dL (5.6–6.9 mmol/L); 2-hour glucose after a 75 g test 140–199 mg/dL. Diabetes is diagnosed from 6.5% HbA1c or 126 mg/dL fasting. Your clinician interprets your own results." },
      { heading: "Daily Log", body: "Day | Fasting glucose | Breakfast | Lunch | Dinner | Snacks and drinks | Water | Activity (min) | Sleep (hrs) | Mood / energy\nDay 1:\nDay 2:\nDay 3:\nDay 4:\nDay 5:\nDay 6:\nDay 7:" },
      { heading: "Monthly Summary", body: "Measure | Start of month | End of month | Change\nWeight:\nWaist:\nHbA1c / glucose (if tested):\nAverage activity per week:\nAverage sleep:\n\nHabits that helped me:\nWhat was hard:\nQuestions for my dietitian:\nPlan for next month:" }
    ]
  },
  {
    key: "prediabetes-log-naflar",
    category: "Condition Handouts",
    title: "Pre-Diabetes Log Book (Naflar)",
    sections: [
      { heading: "1. ASSESSMENT (baseline)", body: "Height:\nWeight:\nBMI:\nWaist:\n\nMedical history / family history of diabetes:\nMedicines and supplements:\nUsual meals and snacks:\nSweet drinks and sweets per week:\nPhysical activity:\nSleep and stress:" },
      { heading: "2. NUTRITION DIAGNOSIS", body: "Write as: Problem related to cause as evidenced by signs and symptoms.\n\nProblem:\nRelated to:\nAs evidenced by:" },
      { heading: "3. INTERVENTION (my plan)", body: "Goal | How I will do it | By when\n\n[ ] Meal plan given\n[ ] Carbohydrate portions and spread across the day reviewed\n[ ] Sweet drinks reviewed\n[ ] Activity plan agreed\n[ ] Sleep and stress habits discussed" },
      { heading: "4. MONITORING (results over time)", body: "Measure | Baseline | Target | Check 1 | Check 2 | Check 3\nHbA1c:\nFasting glucose:\nWeight:\nWaist:\nBlood pressure:\nOther:\n\nReference ranges (American Diabetes Association) for pre-diabetes: HbA1c 5.7-6.4%; fasting glucose 100-125 mg/dL (5.6-6.9 mmol/L); 2-hour glucose after a 75 g test 140-199 mg/dL. Diabetes is diagnosed from 6.5% HbA1c or 126 mg/dL fasting. Your clinician interprets your own results." },
      { heading: "Daily Log", body: "Day | Fasting glucose | Breakfast | Lunch | Dinner | Snacks and drinks | Water | Activity (min) | Sleep (hrs) | Mood / energy\nDay 1:\nDay 2:\nDay 3:\nDay 4:\nDay 5:\nDay 6:\nDay 7:" },
      { heading: "Monthly Summary", body: "Measure | Start of month | End of month | Change\nWeight:\nWaist:\nHbA1c / glucose (if tested):\nAverage activity per week:\nAverage sleep:\n\nHabits that helped me:\nWhat was hard:\nQuestions for my dietitian:\nPlan for next month:" }
    ]
  }
];

async function main() {
  for (const r of data) {
    const ex = await db.select().from(resources).where(eq(resources.key, r.key)).limit(1);
    if (ex.length > 0) {
      await db.update(resources).set({ sections: r.sections }).where(eq(resources.key, r.key));
    } else {
      await db.insert(resources).values(r);
    }
  }
  console.log("Clinical Log Books Seeded!");
  process.exit(0);
}
main();