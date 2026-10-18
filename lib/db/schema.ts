import {
  pgTable, text, integer, numeric, date, timestamp, jsonb, boolean, uuid, serial, index, uniqueIndex,
} from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";

/* ---------------- owner ---------------- */
export const practitioners = pgTable("practitioners", {
  id: uuid("id").primaryKey().defaultRandom(),
  username: text("username").notNull(),
  passwordHash: text("password_hash").notNull(),
  email: text("email"),
  fullName: text("full_name"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
}, (t) => ({ u: uniqueIndex("practitioners_username_uq").on(t.username) }));

/* ---------------- clients ---------------- */
export const clients = pgTable("clients", {
  id: uuid("id").primaryKey().defaultRandom(),
  ownerId: uuid("owner_id").notNull().references(() => practitioners.id, { onDelete: "cascade" }),
  fullName: text("full_name").notNull(),
  dob: date("dob"),
  sex: text("sex"),
  phone: text("phone"),
  email: text("email"),
  program: text("program"),
  status: text("status").default("active").notNull(), // active | archived
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
}, (t) => ({ ownerIdx: index("clients_owner_idx").on(t.ownerId) }));

/* ---------------- Intake (1:1) ---------------- */
export const clientIntake = pgTable("client_intake", {
  clientId: uuid("client_id").primaryKey().references(() => clients.id, { onDelete: "cascade" }),
  dateOfAssessment: date("date_of_assessment"),
  occupation: text("occupation"),
  preferredLanguage: text("preferred_language"),
  referralSource: text("referral_source"),
  consentAssessment: boolean("consent_assessment").default(false).notNull(),
  consentNotMedicalCare: boolean("consent_not_medical_care").default(false).notNull(),
  consentTellPhysician: boolean("consent_tell_physician").default(false).notNull(),
  safetyFlags: jsonb("safety_flags").$type<string[]>().default(sql`'[]'::jsonb`).notNull(),
  safetyActionTaken: text("safety_action_taken"),
  mainConcern: text("main_concern"),
  whatTheyWant: text("what_they_want"),
  whyNow: text("why_now"),
  triedBefore: text("tried_before"),
  importance_1_10: integer("importance_1_10"),
  confidence_1_10: integer("confidence_1_10"),
  stageOfChange: text("stage_of_change"),
  ratingFeed: integer("rating_feed"),
  ratingBalance: integer("rating_balance"),
  ratingFulfill: integer("rating_fulfill"),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

/* ---------------- Feed (1:1) ---------------- */
export const clientFeed = pgTable("client_feed", {
  clientId: uuid("client_id").primaryKey().references(() => clients.id, { onDelete: "cascade" }),
  conditions: jsonb("conditions").$type<string[]>().default(sql`'[]'::jsonb`).notNull(),
  otherConditions: text("other_conditions"),
  familyHistory: jsonb("family_history").$type<string[]>().default(sql`'[]'::jsonb`).notNull(),
  medications: jsonb("medications").$type<{ name: string; dose: string; freq: string; purpose: string }[]>().default(sql`'[]'::jsonb`).notNull(),
  supplements: jsonb("supplements").$type<{ product: string; dose: string; howLong: string; why: string }[]>().default(sql`'[]'::jsonb`).notNull(),
  allergies: text("allergies"),
  symptoms: jsonb("symptoms").$type<string[]>().default(sql`'[]'::jsonb`).notNull(),
  stoolType: text("stool_type"),
  bowelFrequency: text("bowel_frequency"),
  menstrualStatus: text("menstrual_status"),
  cycleNotes: text("cycle_notes"),
  symptomTriggers: text("symptom_triggers"),
  household: text("household"),
  whoShopsCooks: text("who_shops_cooks"),
  foodBudget: text("food_budget"),
  cookingSkill: text("cooking_skill"),
  culturalPractices: text("cultural_practices"),
  constraints: text("constraints"),
  hungerVitalSign1: text("hunger_vital_sign_1"),
  hungerVitalSign2: text("hunger_vital_sign_2"),
  heightCm: numeric("height_cm", { precision: 5, scale: 1 }),
  currentWeight: numeric("current_weight", { precision: 5, scale: 1 }),
  usualWeight: numeric("usual_weight", { precision: 5, scale: 1 }),
  weight3mo: numeric("weight_3mo", { precision: 5, scale: 1 }),
  weight6mo: numeric("weight_6mo", { precision: 5, scale: 1 }),
  goalWeight: numeric("goal_weight", { precision: 5, scale: 1 }),
  waistCm: numeric("waist_cm", { precision: 5, scale: 1 }),
  hipCm: numeric("hip_cm", { precision: 5, scale: 1 }),
  bodyComp: text("body_comp"),
  activityLevel: text("activity_level"),
  labsDate: date("labs_date"),
  otherTests: text("other_tests"),
  bp: text("bp"),
  restingHr: integer("resting_hr"),
  appetite: text("appetite"),
  chewingSwallowing: text("chewing_swallowing"),
  physicalFindings: jsonb("physical_findings").$type<string[]>().default(sql`'[]'::jsonb`).notNull(),
  generalAppearance: text("general_appearance"),
  mealsPerDay: text("meals_per_day"),
  snacksPerDay: text("snacks_per_day"),
  breakfast: text("breakfast"),
  usualMealTimes: text("usual_meal_times"),
  eatingOutPerWeek: text("eating_out_per_week"),
  waterLiters: numeric("water_liters", { precision: 3, scale: 1 }),
  caffeine: text("caffeine"),
  sugaryDrinks: text("sugary_drinks"),
  recall: jsonb("recall").$type<{ food: string; time: string; where: string; hunger: string; mood: string }[]>().default(sql`'[]'::jsonb`).notNull(),
  foodFrequency: jsonb("food_frequency").$type<Record<string, string>>().default(sql`'{}'::jsonb`).notNull(),
  previousDiets: text("previous_diets"),
  foodLikes: text("food_likes"),
  nutritionBeliefs: text("nutrition_beliefs"),
  physicalActivity: text("physical_activity"),
  dailySteps: text("daily_steps"),
  sittingHours: text("sitting_hours"),
  clinicianNotes: text("clinician_notes"),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

/* ---------------- Balance (1:1) ---------------- */
export const clientBalance = pgTable("client_balance", {
  clientId: uuid("client_id").primaryKey().references(() => clients.id, { onDelete: "cascade" }),
  bedtime: text("bedtime"),
  wakeTime: text("wake_time"),
  avgSleepHours: numeric("avg_sleep_hours", { precision: 3, scale: 1 }),
  sleepQuality: integer("sleep_quality"),
  sleepIssues: jsonb("sleep_issues").$type<string[]>().default(sql`'[]'::jsonb`).notNull(),
  lastMealBeforeSleep: text("last_meal_before_sleep"),
  qaylulah: text("qaylulah"),
  morningRoutine: text("morning_routine"),
  eveningRoutine: text("evening_routine"),
  rhythmTrue: jsonb("rhythm_true").$type<string[]>().default(sql`'[]'::jsonb`).notNull(),
  pastFullness_1_10: integer("past_fullness_1_10"),
  rhythmNotes: text("rhythm_notes"),
  fastingPractice: text("fasting_practice"),
  fastingExperience: text("fasting_experience"),
  perceivedStress_1_10: integer("perceived_stress_1_10"),
  eatingTriggers: jsonb("eating_triggers").$type<string[]>().default(sql`'[]'::jsonb`).notNull(),
  allOrNothing_1_10: integer("all_or_nothing_1_10"),
  guiltAfterEating: text("guilt_after_eating"),
  copingTools: jsonb("coping_tools").$type<string[]>().default(sql`'[]'::jsonb`).notNull(),
  relationshipWords: text("relationship_words"),
  scoff: jsonb("scoff").$type<{ q1: boolean; q2: boolean; q3: boolean; q4: boolean; q5: boolean }>().default(sql`'{}'::jsonb`).notNull(),
  supportPeople: text("support_people"),
  timeOutdoors: text("time_outdoors"),
  strengths: text("strengths"),
  barriers: text("barriers"),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

/* ---------------- Fulfill (1:1) ---------------- */
export const clientFulfill = pgTable("client_fulfill", {
  clientId: uuid("client_id").primaryKey().references(() => clients.id, { onDelete: "cascade" }),
  whyBodyMatters: text("why_body_matters"),
  purposeHereToDo: text("purpose_here_to_do"),
  whoDepends: text("who_depends"),
  values: jsonb("values").$type<string[]>().default(sql`'[]'::jsonb`).notNull(),
  bodyFeelsLike: text("body_feels_like"),
  connection_1_10: integer("connection_1_10"),
  clarity_1_10: integer("clarity_1_10"),
  whatWithMoreEnergy: text("what_with_more_energy"),
  practices: jsonb("practices").$type<string[]>().default(sql`'[]'::jsonb`).notNull(),
  intention: text("intention"),
  bodyDesignedFor: text("body_designed_for"),
  at90Days: text("at_90_days"),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

/* ---------------- Diagnosis (N) ---------------- */
export const clientDiagnosis = pgTable("client_diagnosis", {
  id: uuid("id").primaryKey().defaultRandom(),
  clientId: uuid("client_id").notNull().references(() => clients.id, { onDelete: "cascade" }),
  problem: text("problem").notNull(),
  etiology: text("etiology"),
  signs: text("signs"),
  domain: text("domain"),
  priority: integer("priority").default(1).notNull(),
  pillar: text("pillar"),
  status: text("status").default("active").notNull(),
  position: integer("position").default(0).notNull(),
});

/* ---------------- Goals (N) ---------------- */
export const clientGoals = pgTable("client_goals", {
  id: uuid("id").primaryKey().defaultRandom(),
  clientId: uuid("client_id").notNull().references(() => clients.id, { onDelete: "cascade" }),
  goal: text("goal").notNull(),
  measuredBy: text("measured_by"),
  target: text("target"),
  byDate: date("by_date"),
  pillar: text("pillar"),
  status: text("status").default("on track").notNull(),
  notes: text("notes"),
  position: integer("position").default(0).notNull(),
});

/* ---------------- Plan (1:1) ---------------- */
export const clientPlan = pgTable("client_plan", {
  clientId: uuid("client_id").primaryKey().references(() => clients.id, { onDelete: "cascade" }),
  prescription: jsonb("prescription").$type<Record<string, string>>().default(sql`'{}'::jsonb`).notNull(),
  strategies: jsonb("strategies").$type<{ nd: string[]; e: string[]; c: string[]; rc: string[] }>().default(sql`'{}'::jsonb`).notNull(),
  naflarPlan: jsonb("naflar_plan").$type<{ feed: string; balance: string; fulfill: string }>().default(sql`'{}'::jsonb`).notNull(),
  roadmap: jsonb("roadmap").$type<{ week: number; focus: string; homework: string; done: boolean }[]>().default(sql`'[]'::jsonb`).notNull(),
  materials: text("materials"),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

/* ---------------- FollowUps (N, unbounded) ---------------- */
export const clientFollowups = pgTable("client_followups", {
  id: uuid("id").primaryKey().defaultRandom(),
  clientId: uuid("client_id").notNull().references(() => clients.id, { onDelete: "cascade" }),
  visitNo: integer("visit_no").notNull(),
  visitDate: date("visit_date"),
  programWeek: integer("program_week"),
  format: text("format"),
  wantsToTalk: text("wants_to_talk"),
  safety: jsonb("safety").$type<Record<string, boolean | string>>().default(sql`'{}'::jsonb`).notNull(),
  weightKg: numeric("weight_kg", { precision: 5, scale: 1 }),
  waistCm: numeric("waist_cm", { precision: 5, scale: 1 }),
  bp: text("bp"),
  newLabs: text("new_labs"),
  feed: jsonb("feed").$type<Record<string, string>>().default(sql`'{}'::jsonb`).notNull(),
  balance: jsonb("balance").$type<Record<string, string>>().default(sql`'{}'::jsonb`).notNull(),
  fulfill: jsonb("fulfill").$type<Record<string, string>>().default(sql`'{}'::jsonb`).notNull(),
  reassess: jsonb("reassess").$type<Record<string, string>>().default(sql`'{}'::jsonb`).notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
}, (t) => ({ uq: uniqueIndex("followups_client_visit_uq").on(t.clientId, t.visitNo) }));

/* ---------------- Outcome (1:1) ---------------- */
export const clientOutcome = pgTable("client_outcome", {
  clientId: uuid("client_id").primaryKey().references(() => clients.id, { onDelete: "cascade" }),
  ratingFeedEnd: integer("rating_feed_end"),
  ratingBalanceEnd: integer("rating_balance_end"),
  ratingFulfillEnd: integer("rating_fulfill_end"),
  latestGlucose: numeric("latest_glucose"),
  latestHba1c: numeric("latest_hba1c"),
  latestVitD: numeric("latest_vit_d"),
  latestFerritin: numeric("latest_ferritin"),
  indicatorPlan: jsonb("indicator_plan").$type<{ indicator: string; domain: string; baseline: string; target: string; tool: string; freq: string; result: string }[]>().default(sql`'[]'::jsonb`).notNull(),
  goalsOverall: text("goals_overall"),
  summary: text("summary"),
  nextStep: text("next_step"),
  referrals: text("referrals"),
  testimonialPermission: boolean("testimonial_permission").default(false).notNull(),
  testimonialWords: text("testimonial_words"),
  practitionerName: text("practitioner_name"),
  date: date("date"),
});

/* ---------------- Labs (N) ---------------- */
export const clientLabs = pgTable("client_labs", {
  id: uuid("id").primaryKey().defaultRandom(),
  clientId: uuid("client_id").notNull().references(() => clients.id, { onDelete: "cascade" }),
  marker: text("marker").notNull(),
  value: text("value"),
  unit: text("unit"),
  refRange: text("ref_range"),
  takenOn: date("taken_on"),
});

/* ---------------- Lists (editable) ---------------- */
export const lists = pgTable("lists", {
  id: serial("id").primaryKey(),
  kind: text("kind").notNull(),
  label: text("label").notNull(),
  value: text("value").notNull(),
  sort: integer("sort").default(0).notNull(),
}, (t) => ({ k: index("lists_kind_idx").on(t.kind) }));

/* ---------------- Resources ---------------- */
export const resources = pgTable("resources", {
  key: text("key").primaryKey(),
  category: text("category").notNull(),
  title: text("title").notNull(),
  sections: jsonb("sections").$type<{ heading: string; body?: string; bullets?: string[]; table?: { headers: string[]; rows: string[][] } }[]>().default(sql`'[]'::jsonb`).notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

/* ---------------- Exports ---------------- */
export const clientExports = pgTable("client_exports", {
  id: uuid("id").primaryKey().defaultRandom(),
  clientId: uuid("client_id").references(() => clients.id, { onDelete: "cascade" }),
  kind: text("kind").notNull(), // full_record | intake | feed | ... | bundle | resources_zip
  fileUrl: text("file_url"),
  fileSize: integer("file_size"),
  exportedAt: timestamp("exported_at", { withTimezone: true }).defaultNow().notNull(),
});

/* ---------------- IG ---------------- */
export const igTemplates = pgTable("ig_templates", {
  id: serial("id").primaryKey(),
  key: text("key").notNull(),
  name: text("name").notNull(),
  width: integer("width").notNull(),
  height: integer("height").notNull(),
  layout: jsonb("layout").$type<Record<string, unknown>>().default(sql`'{}'::jsonb`).notNull(),
}, (t) => ({ u: uniqueIndex("ig_templates_key_uq").on(t.key) }));

export const igPosts = pgTable("ig_posts", {
  id: uuid("id").primaryKey().defaultRandom(),
  ownerId: uuid("owner_id").notNull().references(() => practitioners.id, { onDelete: "cascade" }),
  templateKey: text("template_key").notNull(),
  payload: jsonb("payload").$type<Record<string, unknown>>().default(sql`'{}'::jsonb`).notNull(),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

/* ---------------- Audit ---------------- */
export const auditLog = pgTable("audit_log", {
  id: uuid("id").primaryKey().defaultRandom(),
  actorId: uuid("actor_id").references(() => practitioners.id, { onDelete: "set null" }),
  action: text("action").notNull(),
  entity: text("entity"),
  entityId: text("entity_id"),
  at: timestamp("at", { withTimezone: true }).defaultNow().notNull(),
});

/* ---------------- relations ---------------- */
export const clientsRelations = relations(clients, ({ one, many }) => ({
  owner: one(practitioners, { fields: [clients.ownerId], references: [practitioners.id] }),
  intake: one(clientIntake),
  feed: one(clientFeed),
  balance: one(clientBalance),
  fulfill: one(clientFulfill),
  plan: one(clientPlan),
  outcome: one(clientOutcome),
  diagnosis: many(clientDiagnosis),
  goals: many(clientGoals),
  followups: many(clientFollowups),
  labs: many(clientLabs),
  exports: many(clientExports),
}));