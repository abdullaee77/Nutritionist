"use client";
import { useState } from "react";

const Checkbox = ({ label, checked, onChange }: { label: string, checked: boolean, onChange: (v: boolean) => void }) => (
  <div onClick={() => onChange(!checked)} style={{ display: "flex", gap: 8, alignItems: "flex-start", cursor: "pointer", marginBottom: 6, fontSize: 12, color: "#2a3a30" }}>
    <div style={{ width: 14, height: 14, border: "1px solid #a8475a", borderRadius: 2, display: "grid", placeItems: "center", background: checked ? "#a8475a" : "transparent", flexShrink: 0, marginTop: 2 }}>
      {checked && <span style={{ color: "#fff", fontSize: 10 }}>✓</span>}
    </div>
    <span style={{ lineHeight: 1.2 }}>{label}</span>
  </div>
);

export default function ClinicalFormEditor({ resource, initialData, onChange }: { resource: any, initialData: any, onChange: (data: any) => void }) {
  const [data, setData] = useState(initialData || {});
  
  const isAssessment = resource.key === "nutrition-assessment";
  const isLogBook = resource.key === "prediabetes-log-plain" || resource.key === "prediabetes-log-naflar";

  const update = (key: string, val: any) => {
    const newData = { ...data, [key]: val };
    setData(newData);
    onChange(newData);
  };

  const inputStyle = { width: "100%", padding: 8, border: "1px solid #e2d6bf", borderRadius: 6, fontSize: 12, fontFamily: "inherit" };

  return (
    <div style={{ backgroundColor: "#fff", padding: 40, boxShadow: "0 4px 20px rgba(0,0,0,0.05)", borderRadius: 8, maxWidth: 800, margin: "0 auto", color: "#2a3a30", fontFamily: "Helvetica" }}>
      
      <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #e2d6bf", paddingBottom: 10, marginBottom: 30 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 24, color: "#a8475a", fontWeight: "bold" }}>N</span>
          <span style={{ fontSize: 12, color: "#a9bfa4", fontWeight: "bold", letterSpacing: 2 }}>NAFLAR HEALTHCARE</span>
        </div>
        <div style={{ fontSize: 10, color: "#8a5a44", letterSpacing: 1, textTransform: "uppercase" }}>{resource.category}</div>
      </div>

      <div style={{ textAlign: "center", marginBottom: 30 }}>
        <div style={{ fontSize: 60, color: "#a8475a", fontWeight: "bold", fontFamily: "serif", lineHeight: 1 }}>N</div>
        <h1 style={{ fontSize: 32, color: "#a8475a", fontFamily: "serif", margin: "10px 0 0" }}>{resource.title}</h1>
      </div>

      {isLogBook && (
        <>
          <div style={{ backgroundColor: "#a8475a", color: "#fff", padding: "4px 12px", fontWeight: "bold", fontSize: 14, marginBottom: 10, fontFamily: "serif" }}>1. ASSESSMENT (baseline)</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
            {["Height", "Weight", "BMI", "Waist"].map(k => (
              <label key={k} style={{ display: "grid", gap: 6, fontSize: 12 }}>
                {k}
                <input style={inputStyle} value={data[k.toLowerCase()] || ""} onChange={(e) => update(k.toLowerCase(), e.target.value)} />
              </label>
            ))}
          </div>
          <div style={{ display: "grid", gap: 12, marginBottom: 30 }}>
            {["Medical history / family history of diabetes", "Medicines and supplements", "Usual meals and snacks", "Sweet drinks and sweets per week", "Physical activity", "Sleep and stress"].map(k => (
              <label key={k} style={{ display: "grid", gap: 6, fontSize: 12 }}>
                {k}
                <input style={inputStyle} value={data[k.toLowerCase().replace(/ /g, "_").replace(/\//g, "")] || ""} onChange={(e) => update(k.toLowerCase().replace(/ /g, "_").replace(/\//g, ""), e.target.value)} />
              </label>
            ))}
          </div>

          <div style={{ backgroundColor: "#a8475a", color: "#fff", padding: "4px 12px", fontWeight: "bold", fontSize: 14, marginBottom: 10, fontFamily: "serif" }}>2. NUTRITION DIAGNOSIS</div>
          <div style={{ display: "grid", gap: 12, marginBottom: 30 }}>
            {["Problem", "Related to", "As evidenced by"].map(k => (
              <label key={k} style={{ display: "grid", gap: 6, fontSize: 12 }}>
                {k}
                <input style={inputStyle} value={data[k.toLowerCase().replace(/ /g, "_")] || ""} onChange={(e) => update(k.toLowerCase().replace(/ /g, "_"), e.target.value)} />
              </label>
            ))}
          </div>

          <div style={{ backgroundColor: "#a8475a", color: "#fff", padding: "4px 12px", fontWeight: "bold", fontSize: 14, marginBottom: 10, fontFamily: "serif" }}>3. INTERVENTION (my plan)</div>
          <div style={{ display: "grid", gap: 12, marginBottom: 20 }}>
            {["Goal", "How I will do it", "By when"].map(k => (
              <label key={k} style={{ display: "grid", gap: 6, fontSize: 12 }}>
                {k}
                <input style={inputStyle} value={data[k.toLowerCase().replace(/ /g, "_")] || ""} onChange={(e) => update(k.toLowerCase().replace(/ /g, "_"), e.target.value)} />
              </label>
            ))}
          </div>
          <div style={{ marginBottom: 30 }}>
            {["Meal plan given", "Carbohydrate portions and spread across the day reviewed", "Sweet drinks reviewed", "Activity plan agreed", "Sleep and stress habits discussed"].map((k, i) => (
              <Checkbox key={i} label={k} checked={data[`check_${i}`] || false} onChange={(v) => update(`check_${i}`, v)} />
            ))}
          </div>
        </>
      )}

      {isAssessment && (
        <>
          <div style={{ backgroundColor: "#a8475a", color: "#fff", padding: "4px 12px", fontWeight: "bold", fontSize: 14, marginBottom: 10, fontFamily: "serif" }}>Client Information</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
            {["Name", "File no.", "Age / Sex", "Date of assessment", "Contact", "Occupation", "Referred by", "Assessor"].map(k => (
              <label key={k} style={{ display: "grid", gap: 6, fontSize: 12 }}>
                {k}
                <input style={inputStyle} value={data[k.toLowerCase().replace(/ /g, "_").replace(/\//g, "")] || ""} onChange={(e) => update(k.toLowerCase().replace(/ /g, "_").replace(/\//g, ""), e.target.value)} />
              </label>
            ))}
          </div>

          <div style={{ backgroundColor: "#a8475a", color: "#fff", padding: "4px 12px", fontWeight: "bold", fontSize: 14, marginBottom: 10, fontFamily: "serif" }}>1. NUTRITION ASSESSMENT (Feed)</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 20 }}>
            {["Height", "Weight", "BMI", "Waist / Hip", "Usual weight", "Goal weight", "Weight change", "Body fat"].map(k => (
              <label key={k} style={{ display: "grid", gap: 6, fontSize: 12 }}>
                {k}
                <input style={inputStyle} value={data[k.toLowerCase().replace(/ /g, "_").replace(/\//g, "")] || ""} onChange={(e) => update(k.toLowerCase().replace(/ /g, "_").replace(/\//g, ""), e.target.value)} />
              </label>
            ))}
          </div>

          <div style={{ backgroundColor: "#a8475a", color: "#fff", padding: "4px 12px", fontWeight: "bold", fontSize: 14, marginBottom: 10, fontFamily: "serif" }}>B. BALANCE (Mind & Lifestyle)</div>
          <div style={{ display: "grid", gap: 12, marginBottom: 20 }}>
            {["Sleep (hours, quality)", "Stress level (1-10)", "Physical activity", "Work / family schedule", "Meal timing routine", "Support at home"].map(k => (
              <label key={k} style={{ display: "grid", gap: 6, fontSize: 12 }}>
                {k}
                <input style={inputStyle} value={data[k.toLowerCase().replace(/ /g, "_").replace(/\//g, "")] || ""} onChange={(e) => update(k.toLowerCase().replace(/ /g, "_").replace(/\//g, ""), e.target.value)} />
              </label>
            ))}
          </div>
          
          <div style={{ backgroundColor: "#a8475a", color: "#fff", padding: "4px 12px", fontWeight: "bold", fontSize: 14, marginBottom: 10, fontFamily: "serif" }}>C. FULFILL (Purpose & Spirit)</div>
          <div style={{ display: "grid", gap: 12, marginBottom: 20 }}>
            {["What does a healthy life mean to you?", "What is your deeper reason for change?", "Faith or routines that support you"].map(k => (
              <label key={k} style={{ display: "grid", gap: 6, fontSize: 12 }}>
                {k}
                <input style={inputStyle} value={data[k.toLowerCase().replace(/ /g, "_").replace(/\?/g, "")] || ""} onChange={(e) => update(k.toLowerCase().replace(/ /g, "_").replace(/\?/g, ""), e.target.value)} />
              </label>
            ))}
          </div>

          <div style={{ backgroundColor: "#a8475a", color: "#fff", padding: "4px 12px", fontWeight: "bold", fontSize: 14, marginBottom: 10, fontFamily: "serif" }}>Readiness to change</div>
          <div style={{ display: "grid", gap: 6, marginBottom: 20 }}>
            {["Not ready", "Thinking about it", "Preparing", "Taking action", "Maintaining"].map((k, i) => (
              <Checkbox key={i} label={k} checked={data[`readiness_${i}`] || false} onChange={(v) => update(`readiness_${i}`, v)} />
            ))}
          </div>
        </>
      )}

      <style>{`
        .form input:focus { outline: 2px solid #a8475a; }
      `}</style>
    </div>
  );
}