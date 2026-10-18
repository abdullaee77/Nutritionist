"use client";
import { useState } from "react";

export default function MethodGuideEditor({ initialData, onChange }: { initialData: any, onChange: (data: any) => void }) {
  const [data, setData] = useState(initialData);

  const handleBlur = (e: React.FocusEvent<HTMLElement>, path: string, index?: number) => {
    const text = e.currentTarget.innerText;
    const newData = { ...data };
    
    if (index !== undefined) {
      newData[path][index] = text;
    } else {
      newData[path] = text;
    }
    
    setData(newData);
    onChange(newData);
  };

  const handleJourneyBlur = (e: React.FocusEvent<HTMLElement>, index: number, field: string) => {
    const text = e.currentTarget.innerText;
    const newData = { ...data };
    newData.journey[index][field] = text;
    setData(newData);
    onChange(newData);
  };

  return (
    <div style={{ backgroundColor: "#fff", padding: 40, boxShadow: "0 4px 20px rgba(0,0,0,0.05)", borderRadius: 8, maxWidth: 800, margin: "0 auto" }}>
      
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #e2d6bf", paddingBottom: 10, marginBottom: 30 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 24, color: "#a8475a", fontWeight: "bold" }}>N</span>
          <span style={{ fontSize: 12, color: "#a9bfa4", fontWeight: "bold", letterSpacing: 2 }}>NAFLAR HEALTHCARE</span>
        </div>
        <div style={{ fontSize: 10, color: "#8a5a44", letterSpacing: 1, textTransform: "uppercase" }}>The Naflar Method</div>
      </div>

      {/* Title */}
      <div style={{ textAlign: "center", marginBottom: 30 }}>
        <div style={{ fontSize: 60, color: "#a8475a", fontWeight: "bold", fontFamily: "serif", lineHeight: 1 }}>N</div>
        <h1 style={{ fontSize: 32, color: "#a8475a", fontFamily: "serif", margin: "10px 0 0" }}>The Naflar Method</h1>
        <p style={{ fontSize: 14, color: "#8a5a44", fontStyle: "italic", margin: 0 }}>Feed · Balance · Fulfill</p>
      </div>

      {/* Intro */}
      <div 
        contentEditable suppressContentEditableWarning onBlur={(e) => handleBlur(e, "intro")}
        style={{ fontSize: 12, lineHeight: 1.6, outline: "none", marginBottom: 20, borderBottom: "1px dashed transparent" }}
        className="editable-hover"
      >
        {data.intro}
      </div>

      {/* Promise Box */}
      <div style={{ backgroundColor: "#f7f1e6", border: "1px solid #e2d6bf", padding: 16, marginBottom: 30 }}>
        <div style={{ color: "#a8475a", fontWeight: "bold", fontFamily: "serif", fontSize: 14, marginBottom: 4 }}>Our promise</div>
        <div 
          contentEditable suppressContentEditableWarning onBlur={(e) => handleBlur(e, "promise")}
          style={{ fontSize: 12, fontStyle: "italic", outline: "none" }}
          className="editable-hover"
        >
          {data.promise}
        </div>
      </div>

      {/* FEED */}
      <div style={{ backgroundColor: "#a8475a", color: "#fff", padding: "4px 12px", fontWeight: "bold", fontSize: 14, marginBottom: 10, fontFamily: "serif" }}>FEED · The body</div>
      <div contentEditable suppressContentEditableWarning onBlur={(e) => handleBlur(e, "feedText")} style={{ fontSize: 12, marginBottom: 10, outline: "none" }} className="editable-hover">{data.feedText}</div>
      <ul style={{ paddingLeft: 20, fontSize: 12, lineHeight: 1.6, marginBottom: 20 }}>
        {data.feedBullets.map((b: string, i: number) => (
          <li key={i} contentEditable suppressContentEditableWarning onBlur={(e) => handleBlur(e, "feedBullets", i)} style={{ outline: "none" }} className="editable-hover">{b}</li>
        ))}
      </ul>

      {/* BALANCE */}
      <div style={{ backgroundColor: "#a8475a", color: "#fff", padding: "4px 12px", fontWeight: "bold", fontSize: 14, marginBottom: 10, fontFamily: "serif" }}>BALANCE · Mind and lifestyle</div>
      <div contentEditable suppressContentEditableWarning onBlur={(e) => handleBlur(e, "balanceText")} style={{ fontSize: 12, marginBottom: 10, outline: "none" }} className="editable-hover">{data.balanceText}</div>
      <ul style={{ paddingLeft: 20, fontSize: 12, lineHeight: 1.6, marginBottom: 20 }}>
        {data.balanceBullets.map((b: string, i: number) => (
          <li key={i} contentEditable suppressContentEditableWarning onBlur={(e) => handleBlur(e, "balanceBullets", i)} style={{ outline: "none" }} className="editable-hover">{b}</li>
        ))}
      </ul>

      {/* FULFILL */}
      <div style={{ backgroundColor: "#a8475a", color: "#fff", padding: "4px 12px", fontWeight: "bold", fontSize: 14, marginBottom: 10, fontFamily: "serif" }}>FULFILL · Purpose and spirit</div>
      <div contentEditable suppressContentEditableWarning onBlur={(e) => handleBlur(e, "fulfillText")} style={{ fontSize: 12, marginBottom: 10, outline: "none" }} className="editable-hover">{data.fulfillText}</div>
      <ul style={{ paddingLeft: 20, fontSize: 12, lineHeight: 1.6, marginBottom: 30 }}>
        {data.fulfillBullets.map((b: string, i: number) => (
          <li key={i} contentEditable suppressContentEditableWarning onBlur={(e) => handleBlur(e, "fulfillBullets", i)} style={{ outline: "none" }} className="editable-hover">{b}</li>
        ))}
      </ul>

      {/* 6 Week Journey Table */}
      <div style={{ backgroundColor: "#a8475a", color: "#fff", padding: "4px 12px", fontWeight: "bold", fontSize: 14, marginBottom: 10, fontFamily: "serif", textAlign: "center" }}>YOUR 6-WEEK JOURNEY</div>
      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 30 }}>
        <thead>
          <tr style={{ backgroundColor: "#a8475a", color: "#fff", textAlign: "left", fontSize: 12 }}>
            <th style={{ padding: 8, border: "1px solid #e2d6bf", width: "15%" }}>Week</th>
            <th style={{ padding: 8, border: "1px solid #e2d6bf", width: "20%" }}>Focus</th>
            <th style={{ padding: 8, border: "1px solid #e2d6bf" }}>One simple practice</th>
          </tr>
        </thead>
        <tbody>
          {data.journey.map((row: any, i: number) => (
            <tr key={i} style={{ fontSize: 12 }}>
              <td contentEditable suppressContentEditableWarning onBlur={(e) => handleJourneyBlur(e, i, "week")} style={{ padding: 8, border: "1px solid #e2d6bf", outline: "none" }} className="editable-hover">{row.week}</td>
              <td contentEditable suppressContentEditableWarning onBlur={(e) => handleJourneyBlur(e, i, "focus")} style={{ padding: 8, border: "1px solid #e2d6bf", outline: "none" }} className="editable-hover">{row.focus}</td>
              <td contentEditable suppressContentEditableWarning onBlur={(e) => handleJourneyBlur(e, i, "practice")} style={{ padding: 8, border: "1px solid #e2d6bf", outline: "none" }} className="editable-hover">{row.practice}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 style={{ color: "#a8475a", fontFamily: "serif", fontSize: 16, marginBottom: 10 }}>Your reflection</h3>
      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 20 }}>
        <tbody>
          <tr>
            <td style={{ padding: 12, border: "1px solid #e2d6bf", backgroundColor: "#f7f1e6", color: "#a8475a", fontFamily: "serif", fontSize: 12, width: "30%" }}>The habit I am proudest of</td>
            <td style={{ border: "1px solid #e2d6bf", height: 40 }}></td>
          </tr>
          <tr>
            <td style={{ padding: 12, border: "1px solid #e2d6bf", backgroundColor: "#f7f1e6", color: "#a8475a", fontFamily: "serif", fontSize: 12 }}>The habit I want to keep</td>
            <td style={{ border: "1px solid #e2d6bf", height: 40 }}></td>
          </tr>
          <tr>
            <td style={{ padding: 12, border: "1px solid #e2d6bf", backgroundColor: "#f7f1e6", color: "#a8475a", fontFamily: "serif", fontSize: 12 }}>My reason (my why)</td>
            <td style={{ border: "1px solid #e2d6bf", height: 40 }}></td>
          </tr>
        </tbody>
      </table>

      <div style={{ fontSize: 10, color: "#8a5a44", fontStyle: "italic", textAlign: "center", marginTop: 40, borderTop: "1px solid #e2d6bf", paddingTop: 10 }}>
        This guide is general nutrition education. It does not replace individual medical advice. If you have a health condition or take medication, follow your clinician and dietitian.
      </div>

      <style>{`
        .editable-hover:hover { background-color: rgba(168, 71, 90, 0.05); outline: 1px dashed #a8475a; }
        .editable-hover:focus { background-color: #fff; outline: 2px solid #a8475a; }
      `}</style>
    </div>
  );
}