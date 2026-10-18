"use client";
import { useState } from "react";
import Link from "next/link";

const sections = [
  {
    title: "1. Managing Clients",
    icon: "👥",
    content: "Your main workspace. You can add a new client, view their status, and access their complete record. To start a new client, click the '+ New Client' button on the Clients page and fill out their basic details. Once created, click 'Open Record' to access their 8 clinical tabs.",
  },
  {
    title: "2. The 8-Tab Clinical Record",
    icon: "📋",
    content: "Every client has a complete NCP record:\n\n• Intake: Safety screens and consent.\n• Feed: Anthropometrics, medical history, labs, and food recall. (Note: BMI, BMR, and flags calculate live as you type).\n• Balance: Sleep, stress, SCOFF, and lifestyle.\n• Fulfill: Purpose and values.\n• Diagnosis: PES statements.\n• Plan: Macronutrient prescription and goals.\n• FollowUps: Add unlimited visits and track weight changes.\n• Outcome: Final labs and testimonials.\n\nHit 'Save Changes' on any tab to save it to the database.",
  },
  {
    title: "3. Exporting PDFs",
    icon: "🖨️",
    content: "Go to the client's page and click 'Export PDF'. You can choose from 14 different document types (from a full 8-tab record to a client-facing Meal Plan). Every export is saved in the client's 'Export History' for easy re-downloading.",
  },
  {
    title: "4. Resources & Handouts",
    icon: "📚",
    content: "The Resources page lets you edit your 13 core documents (like the Welcome Pack or the 7-Day Reset). Click 'Edit' on any card. The screen will look exactly like the PDF. You can click on any text on the page, edit it, and hit 'Save Changes'. Click 'Export PDF' to download a pixel-perfect PDF.",
  },
  {
    title: "5. Instagram Studio",
    icon: "📸",
    content: "Create beautiful, branded posts for Instagram. Choose a template (Feed, Balance, Fulfill, or Program), type your text, and the live preview will update instantly. You can export as a Square Post (1080x1080) or a Story (1080x1920) JPG. Perfect for daily reminders.",
  },
  {
    title: "6. Clinical Calculator",
    icon: "🧮",
    content: "A quick tool for the Prediabetes Calorie Phases. Enter the client's weight and target macro percentages. It instantly calculates the Phase 1, 2, and 3 calories, carbs, protein, fat, and g/kg to ensure the plan is safe.",
  },
  {
    title: "7. Settings",
    icon: "⚙️",
    content: "Change your owner password here. In the future, this page will also let you edit the dropdown lists (like activity levels or fasting practices).",
  },
];

export default function GuidePage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", display: "grid", gap: 24, paddingBottom: 60 }}>
      
      <header style={{ textAlign: "center", marginBottom: 20 }}>
        <h1 style={{ fontSize: "2.6rem", color: "var(--pom)" }}>Welcome to your Dashboard</h1>
        <p style={{ color: "var(--date)", fontSize: "1.1rem" }}>
          A quick guide to managing your clinical practice.
        </p>
      </header>

      <div style={{ display: "grid", gap: 12 }}>
        {sections.map((sec, i) => (
          <div 
            key={i} 
            className="ow-card" 
            style={{ 
              padding: 0, overflow: "hidden", 
              border: openIndex === i ? "2px solid var(--pom)" : "1px solid var(--cream-2)", 
              transition: "border 0.2s"
            }}
          >
            <button 
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              style={{
                width: "100%", display: "flex", alignItems: "center", gap: 16, padding: "20px 24px",
                background: openIndex === i ? "var(--cream)" : "transparent",
                border: "none", cursor: "pointer", textAlign: "left"
              }}
            >
              <span style={{ fontSize: "1.5rem" }}>{sec.icon}</span>
              <h2 style={{ fontSize: "1.2rem", margin: 0, color: "var(--pom)", flex: 1 }}>{sec.title}</h2>
              <span style={{ color: "var(--pom)", fontSize: "1.2rem", transform: openIndex === i ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>
                ▼
              </span>
            </button>
            
            {openIndex === i && (
              <div style={{ padding: "0 24px 24px 64px", color: "var(--ink)", whiteSpace: "pre-wrap", lineHeight: 1.7, fontSize: "0.95rem" }}>
                {sec.content}
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{ textAlign: "center", marginTop: 20 }}>
        <p style={{ color: "var(--date)", marginBottom: 16 }}>Ready to get started?</p>
        <Link href="/owner/clients" className="btn btn-primary" style={{ padding: "14px 32px" }}>
          Go to Clients →
        </Link>
      </div>

    </div>
  );
}