import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db/client";
import { resources } from "@/lib/db/schema";
import { redirect, notFound } from "next/navigation";
import ResourceEditor from "./ResourceEditor";

export const instant = false;

export default async function ResourcePage({ params }: { params: Promise<{ key: string }> }) {
  const session = await auth();
  if (!session) redirect("/owner/login");

  const { key } = await params;
  const [resource] = await db.select().from(resources).where(eq(resources.key, key)).limit(1);

  if (!resource) notFound();

  let initialData: any = [];

  if (key === "method-guide") {
    initialData = [{
      intro: "Naflar Health Care joins evidence-based clinical nutrition with the moderation and routine of the Sunnah. We care for the whole person: the body you feed, the mind and lifestyle you balance, and the purpose you fulfill.",
      promise: "Simple steps, gentle pace, and a plan that fits your real life.",
      feedText: "Feeding well means regular, balanced meals built from real food, not strict rules.",
      feedBullets: ["Build your plate: half vegetables or salad, a quarter protein (daal, beans, eggs, fish, chicken, yoghurt), a quarter whole grains (roti, brown rice, oats).", "Eat at regular times so hunger never becomes extreme.", "Drink water through the day and with meals.", "Choose home-cooked food more often, and treat sweets and fried food as occasional.", "Start your meal with gratitude and eat slowly."],
      balanceText: "Balance is the rhythm around your food: sleep, stress, movement and the pace of your day.",
      balanceBullets: ["Keep a steady sleep and wake time.", "Stop eating when comfortably satisfied, leaving a little room.", "Take short breaks to breathe or walk, especially when stressed.", "Move your body most days in a way you enjoy.", "Eat sitting down, without screens, and share meals when you can."],
      fulfillText: "Fulfilling means remembering why you want to be well: to care for family, to worship with energy, to serve with strength.",
      fulfillBullets: ["Write your reason for change and keep it where you can see it.", "End each day by noting one thing you are grateful for.", "Make small, steady choices that you can keep, not quick fixes.", "Be kind to yourself on hard days and begin again at the next meal."],
      journey: [
        { week: "1", focus: "Notice", practice: "Write down everything you eat and drink, without judging it." },
        { week: "2", focus: "Nourish", practice: "Build your plate with vegetables and protein at two meals a day." },
        { week: "3", focus: "Rhythm", practice: "Fix your meal times and your sleep time." },
        { week: "4", focus: "Rest", practice: "Add a daily 10-minute pause: breathe, walk or reflect." },
        { week: "5", focus: "Reconnect", practice: "Eat one meal a day slowly, sitting, with no screen." },
        { week: "6", focus: "Sustain", practice: "Choose the 3 habits that worked best and plan how to keep them." }
      ]
    }];
  } else if (key === "welcome-pack") {
    initialData = [{
      dearClient: "Dear [CLIENT NAME],",
      introText1: "Thank you for trusting Naflar Health Care with your health. Our approach is gentle and practical: we feed the body, balance the life and help you fulfill your purpose. You will not be given a strict plan that does not fit you. We build it together.",
      introText2: "",
      signOff: "With care, [YOUR NAME], Clinical Nutritionist",
      howWeWork: ["Your first visit is a full nutrition assessment: your health, food, lifestyle and goals.", "You receive a personalised meal plan made for your routine and preferences.", "Follow-up sessions check your progress and adjust your plan.", "Between sessions you can send short WhatsApp check-ins if your program includes them."],
      beforeVisit: ["Bring recent lab reports (blood sugar, HbA1c, lipids, thyroid, vitamin D, etc.)", "Write a list of your medicines and supplements", "Note what you eat on a normal day (a rough list is fine)", "Think about your goal and why it matters to you", "Write down any questions"],
      programs: ["Single consultation", "Program 1: Feed Reset (2 weeks)", "Program 2: The Naflar Method (6 weeks)", "Program 3: Deep Transformation (12 weeks)"],
      programDetails: { startDate: "", firstFollowUp: "", sessionTimes: "", contact: "" },
      goodToKnow: { reschedule: "[Please add your own policies above.]", payment: "" },
      faqs: {
        q1: "Will I have to give up my favourite foods?",
        a1: "No. We aim for balance and portions that work in daily life.",
        q2: "Can I follow the plan with family meals?",
        a2: "Yes. Your plan is built around home food and shared meals.",
        q3: "What if I have a bad day?",
        a3: "It is normal. Begin again at your next meal and tell us at your next session."
      }
    }];
  }  else if (key === "trackers") {
    initialData = [{
      week: "",
      dates: "",
      customHabit: "My own habit:"
    }];
  } else if (key === "7-day-challenge") {
    initialData = [{
      days: [
        { feed: "Drink a glass of water on waking", balance: "Go to bed 30 minutes earlier", fulfill: "Write your reason for change" },
        { feed: "Add a vegetable to lunch and dinner", balance: "Take a 10-minute walk", fulfill: "Note one thing you are grateful for" },
        { feed: "Eat breakfast with some protein", balance: "Breathe slowly for 2 minutes", fulfill: "Make a kind dua or intention for the day" },
        { feed: "Swap one sugary drink for water", balance: "Keep your meal times regular", fulfill: "Call or message someone you love" },
        { feed: "Eat one meal slowly, sitting, no screens", balance: "Stretch for 5 minutes", fulfill: "Do one small act of kindness" },
        { feed: "Plan tomorrow's meals", balance: "Switch screens off 1 hour before bed", fulfill: "Reflect: what helped me most?" },
        { feed: "Choose a healthy snack to keep", balance: "Sleep and wake at your set time", fulfill: "Write what I will keep doing" }
      ],
      checkOff: "",
      noticed: "",
      keep: ""
    }];
  } else if (key === "everyday-guides") {
    initialData = [{
      plate: [
        { part: "Half", text: "Vegetables and salad (sabzi, salad, leafy greens)" },
        { part: "Quarter", text: "Protein (daal, beans, chana, eggs, fish, chicken, yoghurt)" },
        { part: "Quarter", text: "Whole grains (roti, brown rice, oats)" },
        { part: "A little", text: "Healthy fat (nuts, seeds, olive or mustard oil in small amounts)" }
      ],
      meals: [
        { meal: "Breakfast", text: "Vegetable omelette with whole wheat roti · Oats with milk, nuts and fruit · Daal chilla with yoghurt" },
        { meal: "Lunch", text: "Roti or brown rice with daal, sabzi and salad · Chicken or fish with vegetables · Chana salad" },
        { meal: "Dinner", text: "Lighter plate: vegetable soup with grilled chicken · Daal with sabzi · Eggs with salad" },
        { meal: "Snacks", text: "Fruit with a few nuts · Plain yoghurt · Roasted chana · Dates with nuts" }
      ],
      grocery: {
        veg: ["Leafy greens", "Seasonal vegetables", "Tomatoes, onions, cucumber", "Seasonal fruit"],
        protein: ["Daal and beans", "Chana", "Eggs", "Fish or chicken", "Plain yoghurt, milk"],
        grains: ["Whole wheat atta", "Brown or regular rice (smaller portion)", "Oats", "Nuts and seeds", "Olive or mustard oil", "Herbs and spices"]
      },
      labelReading: [
        "Check the serving size first, then the amounts per serving.",
        "Look at sugar and salt, and choose lower where you can.",
        "A short ingredient list with foods you recognise is usually better."
      ],
      eatingOut: [
        "Choose grilled or baked, and ask for vegetables or salad on the side.",
        "Share a dessert or have a small portion.",
        "Eat slowly and stop when comfortably full."
      ]
    }];
  }
  else if (key === "workbook") {
    initialData = [{
      startingPoint: { name: "", date: "", goal: "", targetDate: "", why: "", tried: "", gotInWay: "", support: "" },
      readiness: [],
      pillars: { feed: { do: "", know: "" }, balance: { do: "", know: "" }, fulfill: { do: "", know: "" } },
      habitPlan: [],
      weeklyCheckIn: [],
      nextSteps: { keep: "", adjust: "", nextGoal: "" }
    }];
  } else if (key === "prediabetes-log-plain" || key === "prediabetes-log-naflar" || key === "nutrition-assessment") {
    initialData = [{
      // Log Book fields
      height: "", weight: "", bmi: "", waist: "",
      medical_history_family_history_of_diabetes: "", medicines_and_supplements: "", usual_meals_and_snacks: "", sweet_drinks_and_sweets_per_week: "", physical_activity: "", sleep_and_stress: "",
      problem: "", related_to: "", as_evidenced_by: "",
      goal: "", how_i_will_do_it: "", by_when: "",
      check_0: false, check_1: false, check_2: false, check_3: false, check_4: false,
      
      // Assessment fields (Using safe keys without special characters)
      name: "", file_no: "", age_sex: "", date_of_assessment: "", contact: "", occupation: "", referred_by: "", assessor: "",
      waist_hip: "", usual_weight: "", goal_weight: "", weight_change: "", body_fat: "",
      sleep_hours_quality: "", stress_level_1_10: "", work_family_schedule: "", meal_timing_routine: "", support_at_home: "",
      what_does_a_healthy_life_mean_to_you: "", what_is_your_deeper_reason_for_change: "", faith_or_routines_that_support_you: "",
      readiness_0: false, readiness_1: false, readiness_2: false, readiness_3: false, readiness_4: false
    }];
  } else {
    initialData = (resource.sections as any[]).length > 0 ? resource.sections : [{ heading: "Introduction", body: "Start typing..." }];
  }

  return <ResourceEditor resource={resource} initialSections={initialData} />;
}