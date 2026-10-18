import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { db } from "../lib/db/client";
import { resources } from "../lib/db/schema";
import { eq } from "drizzle-orm";

const data = [
  {
    key: "method-guide",
    category: "Core Guides",
    title: "The Naflar Method",
    sections: [
      { heading: "Our Promise", body: "Simple steps, gentle pace, and a plan that fits your real life.\n\nNaflar Health Care joins evidence-based clinical nutrition with the moderation and routine of the Sunnah. We care for the whole person: the body you feed, the mind and lifestyle you balance, and the purpose you fulfill." },
      { heading: "FEED · The Body", body: "Feeding well means regular, balanced meals built from real food, not strict rules.\n\nBuild your plate: half vegetables or salad, a quarter protein (daal, beans, eggs, fish, chicken, yoghurt), a quarter whole grains (roti, brown rice, oats). Eat at regular times so hunger never becomes extreme. Drink water through the day and with meals. Choose home-cooked food more often, and treat sweets and fried food as occasional. Start your meal with gratitude and eat slowly." },
      { heading: "BALANCE · Mind and Lifestyle", body: "Balance is the rhythm around your food: sleep, stress, movement and the pace of your day.\n\nKeep a steady sleep and wake time. Stop eating when comfortably satisfied, leaving a little room. Take short breaks to breathe or walk, especially when stressed. Move your body most days in a way you enjoy. Eat sitting down, without screens, and share meals when you can." },
      { heading: "FULFILL · Purpose and Spirit", body: "Fulfilling means remembering why you want to be well: to care for family, to worship with energy, to serve with strength.\n\nWrite your reason for change and keep it where you can see it. End each day by noting one thing you are grateful for. Make small, steady choices that you can keep, not quick fixes. Be kind to yourself on hard days and begin again at the next meal." },
      { heading: "Your 6-Week Journey", body: "Week 1 — Notice: Write down everything you eat and drink, without judging it.\nWeek 2 — Nourish: Build your plate with vegetables and protein at two meals a day.\nWeek 3 — Rhythm: Fix your meal times and your sleep time.\nWeek 4 — Rest: Add a daily 10-minute pause: breathe, walk or reflect.\nWeek 5 — Reconnect: Eat one meal a day slowly, sitting, with no screen.\nWeek 6 — Sustain: Choose the 3 habits that worked best and plan how to keep them." }
    ]
  },
  {
    key: "welcome-pack",
    category: "Core Guides",
    title: "Welcome to Naflar",
    sections: [
      { heading: "Dear [CLIENT NAME],", body: "Thank you for trusting Naflar Health Care with your health. Our approach is gentle and practical: we feed the body, balance the life and help you fulfill your purpose. You will not be given a strict plan that does not fit you. We build it together.\n\nWith care,\n[YOUR NAME], Clinical Nutritionist" },
      { heading: "How We Work", body: "- Your first visit is a full nutrition assessment: your health, food, lifestyle and goals.\n- You receive a personalised meal plan made for your routine and preferences.\n- Follow-up sessions check your progress and adjust your plan.\n- Between sessions you can send short WhatsApp check-ins if your program includes them." },
      { heading: "Before Your First Visit", body: "- Bring recent lab reports (blood sugar, HbA1c, lipids, thyroid, vitamin D, etc.)\n- Write a list of your medicines and supplements\n- Note what you eat on a normal day (a rough list is fine)\n- Think about your goal and why it matters to you\n- Write down any questions" },
      { heading: "Common Questions", body: "Will I have to give up my favourite foods? No. We aim for balance and portions that work in daily life.\n\nCan I follow the plan with family meals? Yes. Your plan is built around home food and shared meals.\n\nWhat if I have a bad day? It is normal. Begin again at your next meal and tell us at your next session." }
    ]
  },
  {
    key: "trackers",
    category: "Trackers",
    title: "My Trackers",
    sections: [
      { heading: "Daily Food and Mood Journal", body: "Date:\nDay / week:\n\nWake-up: What I ate and drank | Hunger (1-5) | Mood / feeling | Where / with whom\nBreakfast:\nMid-morning:\nLunch:\nEvening:\nDinner:\nNight:\n\nWater today:\nMovement today:\nSleep last night:" },
      { heading: "Weekly Habit Tracker", body: "Week:\nDates:\n\nHabits to track daily (Mon-Sun):\n- Vegetables at 2 meals\n- Water through the day\n- Regular meal times\n- 10-minute movement\n- No screens while eating\n- Sleep on time\n- Pause / breathe\n- Gratitude note\n- My own habit: ________" },
      { heading: "Weekly Reflection", body: "FEED: how did I nourish my body?\n\nBALANCE: how was my sleep, stress and rhythm?\n\nFULFILL: what gave me purpose or peace?\n\nOne win this week:\nOne thing to improve:" }
    ]
  },
  {
    key: "7-day-challenge",
    category: "Programs",
    title: "The 7-Day Reset",
    sections: [
      { heading: "Feed · Balance · Fulfill", body: "One small step a day.\nTick each day when done. Do not aim for perfect. Aim for steady." },
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
      { heading: "Simple Meal Ideas", body: "Breakfast: Vegetable omelette with whole wheat roti · Oats with milk, nuts and fruit · Daal chilla with yoghurt\n\nLunch: Roti or brown rice with daal, sabzi and salad · Chicken or fish with vegetables · Chana salad\n\nDinner: Lighter plate: vegetable soup with grilled chicken · Daal with sabzi · Eggs with salad\n\nSnacks: Fruit with a few nuts · Plain yoghurt · Roasted chana · Dates with nuts" },
      { heading: "Grocery Checklist", body: "Vegetables and fruit: Leafy greens, Seasonal vegetables, Tomatoes, onions, cucumber, Seasonal fruit\n\nProtein: Daal and beans, Chana, Eggs, Fish or chicken, Plain yoghurt, milk\n\nGrains and extras: Whole wheat atta, Brown or regular rice, Oats, Nuts and seeds, Olive or mustard oil, Herbs and spices" }
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
  console.log("Educational Handouts Seeded!");
  process.exit(0);
}
main();