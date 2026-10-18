import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { db } from "../lib/db/client";
import { resources } from "../lib/db/schema";

const resourceSeed = [
  {
    key: "method-guide",
    category: "Core Guides",
    title: "The Naflar Method",
    sections: [
      { heading: "Our Promise", body: "Simple steps, gentle pace, and a plan that fits your real life. Naflar Health Care joins evidence-based clinical nutrition with the moderation and routine of the Sunnah. We care for the whole person: the body you feed, the mind and lifestyle you balance, and the purpose you fulfill." },
      { heading: "FEED · The Body", body: "Feeding well means regular, balanced meals built from real food, not strict rules. Build your plate: half vegetables or salad, a quarter protein (daal, beans, eggs, fish, chicken, yoghurt), a quarter whole grains (roti, brown rice, oats). Eat at regular times so hunger never becomes extreme. Drink water through the day and with meals. Choose home-cooked food more often, and treat sweets and fried food as occasional. Start your meal with gratitude and eat slowly." },
      { heading: "BALANCE · Mind and Lifestyle", body: "Balance is the rhythm around your food: sleep, stress, movement and the pace of your day. Keep a steady sleep and wake time. Stop eating when comfortably satisfied, leaving a little room. Take short breaks to breathe or walk, especially when stressed. Move your body most days in a way you enjoy. Eat sitting down, without screens, and share meals when you can." },
      { heading: "FULFILL · Purpose and Spirit", body: "Fulfilling means remembering why you want to be well: to care for family, to worship with energy, to serve with strength. Write your reason for change and keep it where you can see it. End each day by noting one thing you are grateful for. Make small, steady choices that you can keep, not quick fixes. Be kind to yourself on hard days and begin again at the next meal." }
    ]
  },
  {
    key: "welcome-pack",
    category: "Core Guides",
    title: "Welcome to Naflar",
    sections: [
      { heading: "We are glad you are here", body: "Dear [CLIENT NAME], Thank you for trusting Naflar Health Care with your health. Our approach is gentle and practical: we feed the body, balance the life and help you fulfill your purpose. You will not be given a strict plan that does not fit you. We build it together. With care, [YOUR NAME], Clinical Nutritionist" },
      { heading: "How we work", body: "- Your first visit is a full nutrition assessment: your health, food, lifestyle and goals.\n- You receive a personalised meal plan made for your routine and preferences.\n- Follow-up sessions check your progress and adjust your plan.\n- Between sessions you can send short WhatsApp check-ins if your program includes them." },
      { heading: "Before your first visit", body: "- Bring recent lab reports (blood sugar, HbA1c, lipids, thyroid, vitamin D, etc.)\n- Write a list of your medicines and supplements\n- Note what you eat on a normal day (a rough list is fine)\n- Think about your goal and why it matters to you\n- Write down any questions" },
      { heading: "Common Questions", body: "Will I have to give up my favourite foods? No. We aim for balance and portions that work in daily life.\n\nCan I follow the plan with family meals? Yes. Your plan is built around home food and shared meals.\n\nWhat if I have a bad day? It is normal. Begin again at your next meal and tell us at your next session." }
    ]
  },
  {
    key: "trackers",
    category: "Trackers",
    title: "My Trackers",
    sections: [
      { heading: "Daily Food and Mood Journal", body: "Use this space to track what you ate, your hunger levels (1-5), your mood, and who you were with.\n\nWater today: _____\nMovement today: _____\nSleep last night: _____" },
      { heading: "Weekly Habit Tracker", body: "Track these daily habits:\n- Vegetables at 2 meals\n- Water through the day\n- Regular meal times\n- 10-minute movement\n- No screens while eating\n- Sleep on time\n- Pause / breathe\n- Gratitude note" },
      { heading: "Weekly Reflection", body: "FEED: how did I nourish my body?\n\nBALANCE: how was my sleep, stress and rhythm?\n\nFULFILL: what gave me purpose or peace?\n\nOne win this week:\nOne thing to improve:" }
    ]
  },
  {
    key: "7-day-challenge",
    category: "Programs",
    title: "The 7-Day Reset",
    sections: [
      { heading: "Feed · Balance · Fulfill", body: "One small step a day. Tick each day when done. Do not aim for perfect. Aim for steady." },
      { heading: "Day 1", body: "Feed: Drink a glass of water on waking.\nBalance: Go to bed 30 minutes earlier.\nFulfill: Write your reason for change." },
      { heading: "Day 2", body: "Feed: Add a vegetable to lunch and dinner.\nBalance: Take a 10-minute walk.\nFulfill: Note one thing you are grateful for." },
      { heading: "Day 3", body: "Feed: Eat breakfast with some protein.\nBalance: Breathe slowly for 2 minutes.\nFulfill: Make a kind dua or intention for the day." },
      { heading: "Day 4", body: "Feed: Swap one sugary drink for water.\nBalance: Keep your meal times regular.\nFulfill: Call or message someone you love." },
      { heading: "Day 5", body: "Feed: Eat one meal slowly, sitting, no screens.\nBalance: Stretch for 5 minutes.\nFulfill: Do one small act of kindness." },
      { heading: "Day 6", body: "Feed: Plan tomorrow's meals.\nBalance: Switch screens off 1 hour before bed.\nFulfill: Reflect: what helped me most?" },
      { heading: "Day 7", body: "Feed: Choose a healthy snack to keep.\nBalance: Sleep and wake at your set time.\nFulfill: Write what I will keep doing." }
    ]
  },
  {
    key: "everyday-guides",
    category: "Handouts",
    title: "Everyday Nutrition Guides",
    sections: [
      { heading: "The Naflar Plate", body: "Half: Vegetables and salad (sabzi, salad, leafy greens)\nQuarter: Protein (daal, beans, chana, eggs, fish, chicken, yoghurt)\nQuarter: Whole grains (roti, brown rice, oats)\nA little: Healthy fat (nuts, seeds, olive or mustard oil in small amounts)" },
      { heading: "Simple Meal Ideas", body: "Breakfast: Vegetable omelette with whole wheat roti · Oats with milk, nuts and fruit · Daal chilla with yoghurt\n\nLunch: Roti or brown rice with daal, sabzi and salad · Chicken or fish with vegetables · Chana salad\n\nDinner: Lighter plate: vegetable soup with grilled chicken · Daal with sabzi · Eggs with salad\n\nSnacks: Fruit with a few nuts · Plain yoghurt · Roasted chana · Dates with nuts" }
    ]
  },
  {
    key: "prediabetes-log-plain",
    category: "Condition Handouts",
    title: "Pre-Diabetes Log Book (Plain)",
    sections: [
      { heading: "1. Assessment (Baseline)", body: "Height:\nWeight:\nBMI:\nWaist:\n\nMedical history / family history of diabetes:\nMedicines and supplements:\nUsual meals and snacks:\nSweet drinks and sweets per week:\nPhysical activity:\nSleep and stress:" },
      { heading: "2. Nutrition Diagnosis", body: "Write as: Problem related to cause as evidenced by signs and symptoms.\n\nProblem:\nRelated to:\nAs evidenced by:" },
      { heading: "3. Intervention (My Plan)", body: "Goal:\nHow I will do it:\nBy when:\n\nChecklist:\n- Meal plan given\n- Carbohydrate portions and spread across the day reviewed\n- Sweet drinks reviewed\n- Activity plan agreed\n- Sleep and stress habits discussed" },
      { heading: "4. Monitoring", body: "Measure: Baseline | Target | Check 1 | Check 2 | Check 3\nHbA1c:\nFasting glucose:\nWeight:\nWaist:\nBlood pressure:\n\nReference ranges (ADA) for pre-diabetes: HbA1c 5.7–6.4%; fasting glucose 100–125 mg/dL; 2-hour glucose 140–199 mg/dL. Your clinician interprets your own results." }
    ]
  },
  {
    key: "nutrition-assessment",
    category: "Clinical Forms",
    title: "Nutrition Assessment Form",
    sections: [
      { heading: "Client Information", body: "Name:\nFile no:\nAge / Sex:\nDate of assessment:\nContact:\nOccupation:\nReferred by:\nAssessor:" },
      { heading: "A. Feed · Body", body: "Anthropometric data:\nHeight:\nWeight:\nBMI:\nWaist / Hip:\nUsual weight:\nGoal weight:\nWeight change (6 months):\nBody fat / other:\n\nClinical history:\nMedical history:\nMedications / supplements:\nAllergies / intolerances:\nFamily history:\nBlood pressure / pulse:\nDigestion:\nHormonal / menstrual:\nPhysical signs:" },
      { heading: "B. Balance · Mind and Lifestyle", body: "Sleep (hours, quality):\nStress level (1-10):\nPhysical activity:\nWork / family schedule:\nMeal timing routine:\nSupport at home:\nMood and food:" },
      { heading: "C. Fulfill · Purpose and Spirit", body: "What does a healthy life mean to you?\nWhat is your deeper reason for change?\nFaith or routines that support you:" },
      { heading: "2. Nutrition Diagnosis (PES)", body: "Problem (P):\nRelated to (E):\nAs evidenced by (S):" },
      { heading: "3. Nutrition Intervention", body: "Nutrition prescription:\nEnergy (kcal):\nProtein:\nCarbohydrate:\nFat:\nFibre / fluid:\nOther:\n\nGoals:\nFeed (body):\nBalance (mind):\nFulfill (purpose):" }
    ]
  }
];

async function main() {
  console.log("Seeding resources...");
  
  for (const r of resourceSeed) {
    const existing = await db.select().from(resources).where(eq(resources.key, r.key)).limit(1);
    if (existing.length > 0) {
      await db.update(resources).set({ sections: r.sections, category: r.category, title: r.title }).where(eq(resources.key, r.key));
      console.log(`Updated: ${r.title}`);
    } else {
      await db.insert(resources).values(r);
      console.log(`Inserted: ${r.title}`);
    }
  }
  
  console.log("All resources seeded successfully!");
  process.exit(0);
}

import { eq } from "drizzle-orm";
main().catch((e) => { console.error(e); process.exit(1); });