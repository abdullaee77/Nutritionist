"use client";
import { useState } from "react";

export default function WorkbookEditor({ initialData, onChange }: { initialData: any, onChange: (data: any) => void }) {
  const [data, setData] = useState(initialData || {
    startingPoint: { name: "", date: "", goal: "", targetDate: "", why: "", tried: "", gotInWay: "", support: "" },
    readiness: [],
    pillars: { feed: { do: "", know: "" }, balance: { do: "", know: "" }, fulfill: { do: "", know: "" } },
    habitPlan: [],
    weeklyCheckIn: [],
    nextSteps: { keep: "", adjust: "", nextGoal: "" }
  });

  const updateNested = (parent: string, key: string, val: any) => {
    const newData = { ...data, [parent]: { ...data[parent], [key]: val } };
    setData(newData);
    onChange(newData);
  };

  return (
    <div style={{ backgroundColor: "#fff", padding: 40, boxShadow: "0 4px 20px rgba(0,0,0,0.05)", borderRadius: 8, maxWidth: 800, margin: "0 auto", color: "#2a3a30", fontFamily: "Helvetica" }}>
      
      <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #e2d6bf", paddingBottom: 10, marginBottom: 30 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 24, color: "#a8475a", fontWeight: "bold" }}>N</span>
          <span style={{ fontSize: 12, color: "#a9bfa4", fontWeight: "bold", letterSpacing: 2 }}>NAFLAR HEALTHCARE</span>
        </div>
        <div style={{ fontSize: 10, color: "#8a5a44", letterSpacing: 1, textTransform: "uppercase" }}>Workbook</div>
      </div>

      <div style={{ textAlign: "center", marginBottom: 30 }}>
        <div style={{ fontSize: 60, color: "#a8475a", fontWeight: "bold", fontFamily: "serif", lineHeight: 1 }}>N</div>
        <h1 style={{ fontSize: 32, color: "#a8475a", fontFamily: "serif", margin: "10px 0 0" }}>My Naflar Workbook</h1>
        <p style={{ fontSize: 14, color: "#8a5a44", fontStyle: "italic", margin: 0 }}>Write it. See it. Live it.</p>
      </div>

      {/* 1. MY STARTING POINT */}
      <div style={{ backgroundColor: "#a8475a", color: "#fff", padding: "4px 12px", fontWeight: "bold", fontSize: 14, marginBottom: 10, fontFamily: "serif" }}>1. MY STARTING POINT</div>
      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 15 }}>
        <tbody>
          <tr>
            <td style={{ padding: 8, border: "1px solid #e2d6bf", backgroundColor: "#f7f1e6", color: "#a8475a", fontWeight: "bold", fontSize: 12, width: "15%" }}>Name</td>
            <td contentEditable suppressContentEditableWarning onBlur={(e) => updateNested("startingPoint", "name", e.currentTarget.innerText)} className="editable-hover" style={{ border: "1px solid #e2d6bf", width: "35%", padding: 8 }}>{data.startingPoint.name}</td>
            <td style={{ padding: 8, border: "1px solid #e2d6bf", backgroundColor: "#f7f1e6", color: "#a8475a", fontWeight: "bold", fontSize: 12, width: "15%" }}>Date</td>
            <td contentEditable suppressContentEditableWarning onBlur={(e) => updateNested("startingPoint", "date", e.currentTarget.innerText)} className="editable-hover" style={{ border: "1px solid #e2d6bf", width: "35%", padding: 8 }}>{data.startingPoint.date}</td>
          </tr>
          <tr>
            <td style={{ padding: 8, border: "1px solid #e2d6bf", backgroundColor: "#f7f1e6", color: "#a8475a", fontWeight: "bold", fontSize: 12 }}>Main goal</td>
            <td contentEditable suppressContentEditableWarning onBlur={(e) => updateNested("startingPoint", "goal", e.currentTarget.innerText)} className="editable-hover" style={{ border: "1px solid #e2d6bf", padding: 8 }}>{data.startingPoint.goal}</td>
            <td style={{ padding: 8, border: "1px solid #e2d6bf", backgroundColor: "#f7f1e6", color: "#a8475a", fontWeight: "bold", fontSize: 12 }}>Target date</td>
            <td contentEditable suppressContentEditableWarning onBlur={(e) => updateNested("startingPoint", "targetDate", e.currentTarget.innerText)} className="editable-hover" style={{ border: "1px solid #e2d6bf", padding: 8 }}>{data.startingPoint.targetDate}</td>
          </tr>
        </tbody>
      </table>

      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 20 }}>
        <tbody>
          {[
            { key: "why", label: "My why (the real reason)" },
            { key: "tried", label: "What I have tried before" },
            { key: "gotInWay", label: "What got in the way" },
            { key: "support", label: "Who can support me" }
          ].map((row, i) => (
            <tr key={i}>
              <td style={{ padding: 8, border: "1px solid #e2d6bf", backgroundColor: "#f7f1e6", color: "#a8475a", fontWeight: "bold", fontSize: 12, width: "30%" }}>{row.label}</td>
              <td contentEditable suppressContentEditableWarning onBlur={(e) => updateNested("startingPoint", row.key, e.currentTarget.innerText)} className="editable-hover" style={{ border: "1px solid #e2d6bf", height: 40, padding: 8 }}>{data.startingPoint[row.key]}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ color: "#a8475a", fontWeight: "bold", marginBottom: 8 }}>How ready am I to change?</div>
      <div style={{ display: "grid", gap: 6, marginBottom: 30, fontSize: 12 }}>
        {["Not ready yet", "Thinking about it", "Preparing", "Taking action", "Keeping it going"].map((item, i) => (
          <div key={i} style={{ display: "flex", gap: 8 }}><span>☐</span><span>{item}</span></div>
        ))}
      </div>

      {/* 2. MY THREE PILLARS */}
      <div style={{ backgroundColor: "#a8475a", color: "#fff", padding: "4px 12px", fontWeight: "bold", fontSize: 14, marginBottom: 10, fontFamily: "serif" }}>2. MY THREE PILLARS</div>
      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 30 }}>
        <thead>
          <tr style={{ backgroundColor: "#a8475a", color: "#fff", textAlign: "left", fontSize: 12 }}>
            <th style={{ padding: 8, border: "1px solid #e2d6bf", width: "20%" }}>Pillar</th>
            <th style={{ padding: 8, border: "1px solid #e2d6bf", width: "40%" }}>What I will do</th>
            <th style={{ padding: 8, border: "1px solid #e2d6bf", width: "40%" }}>How I will know</th>
          </tr>
        </thead>
        <tbody>
          {[
            { key: "feed", label: "FEED (body)" },
            { key: "balance", label: "BALANCE (mind)" },
            { key: "fulfill", label: "FULFILL (purpose)" }
          ].map((pillar, i) => (
            <tr key={i}>
              <td style={{ padding: 8, border: "1px solid #e2d6bf", backgroundColor: "#f7f1e6", color: "#a8475a", fontWeight: "bold", fontSize: 12 }}>{pillar.label}</td>
              <td contentEditable suppressContentEditableWarning onBlur={(e) => updateNested("pillars", pillar.key, { ...data.pillars[pillar.key], do: e.currentTarget.innerText })} className="editable-hover" style={{ border: "1px solid #e2d6bf", height: 40, padding: 8 }}>{data.pillars[pillar.key].do}</td>
              <td contentEditable suppressContentEditableWarning onBlur={(e) => updateNested("pillars", pillar.key, { ...data.pillars[pillar.key], know: e.currentTarget.innerText })} className="editable-hover" style={{ border: "1px solid #e2d6bf", height: 40, padding: 8 }}>{data.pillars[pillar.key].know}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 3. MY HABIT PLAN */}
      <div style={{ backgroundColor: "#a8475a", color: "#fff", padding: "4px 12px", fontWeight: "bold", fontSize: 14, marginBottom: 10, fontFamily: "serif" }}>3. MY HABIT PLAN</div>
      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 30 }}>
        <thead>
          <tr style={{ backgroundColor: "#a8475a", color: "#fff", textAlign: "left", fontSize: 12 }}>
            <th style={{ padding: 8, border: "1px solid #e2d6bf", width: "25%" }}>Habit</th>
            <th style={{ padding: 8, border: "1px solid #e2d6bf", width: "20%" }}>When</th>
            <th style={{ padding: 8, border: "1px solid #e2d6bf", width: "20%" }}>Where</th>
            <th style={{ padding: 8, border: "1px solid #e2d6bf", width: "35%" }}>If it gets hard I will...</th>
          </tr>
        </thead>
        <tbody>
          {[1,2,3,4].map((row, i) => (
            <tr key={i}>
              {[0,1,2,3].map(cell => <td key={cell} style={{ border: "1px solid #e2d6bf", height: 40 }}></td>)}
            </tr>
          ))}
        </tbody>
      </table>

      {/* 4. WEEKLY CHECK-IN */}
      <div style={{ backgroundColor: "#a8475a", color: "#fff", padding: "4px 12px", fontWeight: "bold", fontSize: 14, marginBottom: 10, fontFamily: "serif" }}>4. WEEKLY CHECK-IN</div>
      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 30 }}>
        <thead>
          <tr style={{ backgroundColor: "#a8475a", color: "#fff", textAlign: "left", fontSize: 12 }}>
            <th style={{ padding: 8, border: "1px solid #e2d6bf", width: "10%" }}>Week</th>
            <th style={{ padding: 8, border: "1px solid #e2d6bf", width: "20%" }}>Feed</th>
            <th style={{ padding: 8, border: "1px solid #e2d6bf", width: "20%" }}>Balance</th>
            <th style={{ padding: 8, border: "1px solid #e2d6bf", width: "20%" }}>Fulfill</th>
            <th style={{ padding: 8, border: "1px solid #e2d6bf", width: "30%" }}>Win / lesson</th>
          </tr>
        </thead>
        <tbody>
          {[1,2,3,4,5,6].map((week, i) => (
            <tr key={i}>
              <td style={{ padding: 8, border: "1px solid #e2d6bf", backgroundColor: "#f7f1e6", color: "#a8475a", fontWeight: "bold", fontSize: 12 }}>{week}</td>
              {[0,1,2,3].map(cell => <td key={cell} style={{ border: "1px solid #e2d6bf", height: 30 }}></td>)}
            </tr>
          ))}
        </tbody>
      </table>

      {/* 5. MY NEXT STEPS */}
      <div style={{ backgroundColor: "#a8475a", color: "#fff", padding: "4px 12px", fontWeight: "bold", fontSize: 14, marginBottom: 10, fontFamily: "serif" }}>5. MY NEXT STEPS</div>
      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 20 }}>
        <tbody>
          {[
            { key: "keep", label: "What I will keep" },
            { key: "adjust", label: "What I will adjust" },
            { key: "nextGoal", label: "My next goal" }
          ].map((row, i) => (
            <tr key={i}>
              <td style={{ padding: 8, border: "1px solid #e2d6bf", backgroundColor: "#f7f1e6", color: "#a8475a", fontWeight: "bold", fontSize: 12, width: "30%" }}>{row.label}</td>
              <td contentEditable suppressContentEditableWarning onBlur={(e) => updateNested("nextSteps", row.key, e.currentTarget.innerText)} className="editable-hover" style={{ border: "1px solid #e2d6bf", height: 40, padding: 8 }}>{data.nextSteps[row.key]}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <style>{`
        .editable-hover:hover { background-color: rgba(168, 71, 90, 0.05); outline: 1px dashed #a8475a; }
        .editable-hover:focus { background-color: #fff; outline: 2px solid #a8475a; }
      `}</style>
    </div>
  );
}