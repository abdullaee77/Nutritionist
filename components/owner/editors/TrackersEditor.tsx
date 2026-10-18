"use client";
import { useState } from "react";

export default function TrackersEditor({ initialData, onChange }: { initialData: any, onChange: (data: any) => void }) {
  const [data, setData] = useState(initialData || {
    week: "",
    dates: "",
    customHabit: ""
  });

  const update = (key: string, val: any) => {
    const newData = { ...data, [key]: val };
    setData(newData);
    onChange(newData);
  };

  return (
    <div style={{ backgroundColor: "#fff", padding: 40, boxShadow: "0 4px 20px rgba(0,0,0,0.05)", borderRadius: 8, maxWidth: 800, margin: "0 auto", color: "#2a3a30", fontFamily: "Helvetica" }}>
      
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #e2d6bf", paddingBottom: 10, marginBottom: 30 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 24, color: "#a8475a", fontWeight: "bold" }}>N</span>
          <span style={{ fontSize: 12, color: "#a9bfa4", fontWeight: "bold", letterSpacing: 2 }}>NAFLAR HEALTHCARE</span>
        </div>
        <div style={{ fontSize: 10, color: "#8a5a44", letterSpacing: 1, textTransform: "uppercase" }}>Trackers</div>
      </div>

      {/* Title */}
      <div style={{ textAlign: "center", marginBottom: 30 }}>
        <div style={{ fontSize: 60, color: "#a8475a", fontWeight: "bold", fontFamily: "serif", lineHeight: 1 }}>N</div>
        <h1 style={{ fontSize: 32, color: "#a8475a", fontFamily: "serif", margin: "10px 0 0" }}>My Trackers</h1>
        <p style={{ fontSize: 14, color: "#8a5a44", fontStyle: "italic", margin: 0 }}>Small notes, big awareness</p>
      </div>

      {/* DAILY FOOD AND MOOD JOURNAL */}
      <div style={{ backgroundColor: "#a8475a", color: "#fff", padding: "4px 12px", fontWeight: "bold", fontSize: 14, marginBottom: 10, fontFamily: "serif" }}>DAILY FOOD AND MOOD JOURNAL</div>
      
      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 30 }}>
        <tbody>
          <tr>
            <td style={{ padding: 8, border: "1px solid #e2d6bf", backgroundColor: "#f7f1e6", color: "#a8475a", fontWeight: "bold", fontSize: 12, width: "15%" }}>Date</td>
            <td style={{ border: "1px solid #e2d6bf", width: "35%" }}></td>
            <td style={{ padding: 8, border: "1px solid #e2d6bf", backgroundColor: "#f7f1e6", color: "#a8475a", fontWeight: "bold", fontSize: 12, width: "15%" }}>Day / week</td>
            <td style={{ border: "1px solid #e2d6bf", width: "35%" }}></td>
          </tr>
        </tbody>
      </table>

      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 20 }}>
        <thead>
          <tr style={{ backgroundColor: "#a8475a", color: "#fff", textAlign: "left", fontSize: 12 }}>
            <th style={{ padding: 8, border: "1px solid #e2d6bf", width: "20%" }}>Time</th>
            <th style={{ padding: 8, border: "1px solid #e2d6bf", width: "35%" }}>What I ate and drank</th>
            <th style={{ padding: 8, border: "1px solid #e2d6bf", width: "15%" }}>Hunger (1-5)</th>
            <th style={{ padding: 8, border: "1px solid #e2d6bf", width: "15%" }}>Mood / feeling</th>
            <th style={{ padding: 8, border: "1px solid #e2d6bf", width: "15%" }}>Where / with whom</th>
          </tr>
        </thead>
        <tbody>
          {["Wake-up", "Breakfast", "Mid-morning", "Lunch", "Evening", "Dinner", "Night"].map((meal, i) => (
            <tr key={i}>
              <td style={{ padding: 8, border: "1px solid #e2d6bf", backgroundColor: "#f7f1e6", color: "#a8475a", fontSize: 12, fontWeight: "bold" }}>{meal}</td>
              <td style={{ border: "1px solid #e2d6bf", height: 30 }}></td>
              <td style={{ border: "1px solid #e2d6bf" }}></td>
              <td style={{ border: "1px solid #e2d6bf" }}></td>
              <td style={{ border: "1px solid #e2d6bf" }}></td>
            </tr>
          ))}
        </tbody>
      </table>

      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 30 }}>
        <tbody>
          <tr>
            <td style={{ padding: 8, border: "1px solid #e2d6bf", backgroundColor: "#f7f1e6", color: "#a8475a", fontWeight: "bold", fontSize: 12, width: "25%" }}>Water today</td>
            <td style={{ border: "1px solid #e2d6bf", height: 30 }}></td>
          </tr>
          <tr>
            <td style={{ padding: 8, border: "1px solid #e2d6bf", backgroundColor: "#f7f1e6", color: "#a8475a", fontWeight: "bold", fontSize: 12 }}>Movement today</td>
            <td style={{ border: "1px solid #e2d6bf", height: 30 }}></td>
          </tr>
          <tr>
            <td style={{ padding: 8, border: "1px solid #e2d6bf", backgroundColor: "#f7f1e6", color: "#a8475a", fontWeight: "bold", fontSize: 12 }}>Sleep last night</td>
            <td style={{ border: "1px solid #e2d6bf", height: 30 }}></td>
          </tr>
        </tbody>
      </table>

      {/* PAGE 2 - WEEKLY HABIT TRACKER */}
      <div style={{ pageBreakBefore: "always" }} className="print-break" />
      
      <div style={{ backgroundColor: "#a8475a", color: "#fff", padding: "4px 12px", fontWeight: "bold", fontSize: 14, marginBottom: 10, fontFamily: "serif" }}>WEEKLY HABIT TRACKER</div>
      
      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 20 }}>
        <tbody>
          <tr>
            <td style={{ padding: 8, border: "1px solid #e2d6bf", backgroundColor: "#f7f1e6", color: "#a8475a", fontWeight: "bold", fontSize: 12, width: "15%" }}>Week</td>
            <td 
              contentEditable suppressContentEditableWarning onBlur={(e) => update("week", e.currentTarget.innerText)} 
              style={{ border: "1px solid #e2d6bf", width: "35%", padding: 8, fontSize: 12 }}
              className="editable-hover"
            >{data.week}</td>
            <td style={{ padding: 8, border: "1px solid #e2d6bf", backgroundColor: "#f7f1e6", color: "#a8475a", fontWeight: "bold", fontSize: 12, width: "15%" }}>Dates</td>
            <td 
              contentEditable suppressContentEditableWarning onBlur={(e) => update("dates", e.currentTarget.innerText)} 
              style={{ border: "1px solid #e2d6bf", width: "35%", padding: 8, fontSize: 12 }}
              className="editable-hover"
            >{data.dates}</td>
          </tr>
        </tbody>
      </table>

      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 30 }}>
        <thead>
          <tr style={{ backgroundColor: "#a8475a", color: "#fff", textAlign: "left", fontSize: 11 }}>
            <th style={{ padding: 6, border: "1px solid #e2d6bf", width: "28%" }}>Habit</th>
            <th style={{ padding: 6, border: "1px solid #e2d6bf", textAlign: "center" }}>Mon</th>
            <th style={{ padding: 6, border: "1px solid #e2d6bf", textAlign: "center" }}>Tue</th>
            <th style={{ padding: 6, border: "1px solid #e2d6bf", textAlign: "center" }}>Wed</th>
            <th style={{ padding: 6, border: "1px solid #e2d6bf", textAlign: "center" }}>Thu</th>
            <th style={{ padding: 6, border: "1px solid #e2d6bf", textAlign: "center" }}>Fri</th>
            <th style={{ padding: 6, border: "1px solid #e2d6bf", textAlign: "center" }}>Sat</th>
            <th style={{ padding: 6, border: "1px solid #e2d6bf", textAlign: "center" }}>Sun</th>
          </tr>
        </thead>
        <tbody>
          {["Vegetables at 2 meals", "Water through the day", "Regular meal times", "10-minute movement", "No screens while eating", "Sleep on time", "Pause / breathe", "Gratitude note"].map((habit, i) => (
            <tr key={i}>
              <td style={{ padding: 6, border: "1px solid #e2d6bf", backgroundColor: "#f7f1e6", color: "#a8475a", fontSize: 11, fontWeight: "bold" }}>{habit}</td>
              {[1,2,3,4,5,6,7].map(d => <td key={d} style={{ border: "1px solid #e2d6bf", height: 30 }}></td>)}
            </tr>
          ))}
          {/* Custom Habit Row */}
          <tr>
            <td 
              contentEditable suppressContentEditableWarning onBlur={(e) => update("customHabit", e.currentTarget.innerText)} 
              style={{ padding: 6, border: "1px solid #e2d6bf", backgroundColor: "#f7f1e6", color: "#a8475a", fontSize: 11, fontWeight: "bold" }}
              className="editable-hover"
            >{data.customHabit || "My own habit:"}</td>
            {[1,2,3,4,5,6,7].map(d => <td key={d} style={{ border: "1px solid #e2d6bf", height: 30 }}></td>)}
          </tr>
        </tbody>
      </table>

      <div style={{ backgroundColor: "#a8475a", color: "#fff", padding: "4px 12px", fontWeight: "bold", fontSize: 14, marginBottom: 10, fontFamily: "serif" }}>WEEKLY REFLECTION</div>
      
      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 20 }}>
        <tbody>
          {["FEED: how did I nourish my body?", "BALANCE: how was my sleep, stress and rhythm?", "FULFILL: what gave me purpose or peace?", "One win this week", "One thing to improve"].map((prompt, i) => (
            <tr key={i}>
              <td style={{ padding: 8, border: "1px solid #e2d6bf", backgroundColor: "#f7f1e6", color: "#a8475a", fontSize: 12, fontWeight: "bold", width: "35%" }}>{prompt}</td>
              <td style={{ border: "1px solid #e2d6bf", height: 40 }}></td>
            </tr>
          ))}
        </tbody>
      </table>

      <style>{`
        .editable-hover:hover { background-color: rgba(168, 71, 90, 0.05); outline: 1px dashed #a8475a; }
        .editable-hover:focus { background-color: #fff; outline: 2px solid #a8475a; }
        @media print {
          .print-break { page-break-before: always; }
        }
      `}</style>
    </div>
  );
}