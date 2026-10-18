"use client";
import { useState } from "react";

export default function SevenDayEditor({ initialData, onChange }: { initialData: any, onChange: (data: any) => void }) {
  const [data, setData] = useState(initialData || {
    days: Array(7).fill({ feed: "", balance: "", fulfill: "" }),
    checkOff: "",
    noticed: "",
    keep: ""
  });

  const updateDay = (index: number, field: string, val: string) => {
    const newDays = [...data.days];
    newDays[index] = { ...newDays[index], [field]: val };
    const newData = { ...data, days: newDays };
    setData(newData);
    onChange(newData);
  };

  const update = (key: string, val: any) => {
    const newData = { ...data, [key]: val };
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
        <div style={{ fontSize: 10, color: "#8a5a44", letterSpacing: 1, textTransform: "uppercase" }}>Programs</div>
      </div>

      <div style={{ textAlign: "center", marginBottom: 30 }}>
        <div style={{ fontSize: 60, color: "#a8475a", fontWeight: "bold", fontFamily: "serif", lineHeight: 1 }}>N</div>
        <h1 style={{ fontSize: 32, color: "#a8475a", fontFamily: "serif", margin: "10px 0 0" }}>The 7-Day Reset</h1>
        <p style={{ fontSize: 14, color: "#8a5a44", fontStyle: "italic", margin: 0 }}>Feed · Balance · Fulfill. One small step a day</p>
        <p style={{ fontSize: 12, marginTop: 10 }}>Tick each day when done. Do not aim for perfect. Aim for steady.</p>
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 30 }}>
        <thead>
          <tr style={{ backgroundColor: "#a8475a", color: "#fff", textAlign: "left", fontSize: 12 }}>
            <th style={{ padding: 8, border: "1px solid #e2d6bf", width: "10%" }}>Day</th>
            <th style={{ padding: 8, border: "1px solid #e2d6bf", width: "30%" }}>Feed</th>
            <th style={{ padding: 8, border: "1px solid #e2d6bf", width: "30%" }}>Balance</th>
            <th style={{ padding: 8, border: "1px solid #e2d6bf", width: "30%" }}>Fulfill</th>
          </tr>
        </thead>
        <tbody>
          {data.days.map((row: any, i: number) => (
            <tr key={i}>
              <td style={{ padding: 8, border: "1px solid #e2d6bf", backgroundColor: "#f7f1e6", color: "#a8475a", fontWeight: "bold", fontSize: 12 }}>{i + 1}</td>
              <td contentEditable suppressContentEditableWarning onBlur={(e) => updateDay(i, "feed", e.currentTarget.innerText)} className="editable-hover" style={{ padding: 8, border: "1px solid #e2d6bf", fontSize: 12, outline: "none" }}>{row.feed}</td>
              <td contentEditable suppressContentEditableWarning onBlur={(e) => updateDay(i, "balance", e.currentTarget.innerText)} className="editable-hover" style={{ padding: 8, border: "1px solid #e2d6bf", fontSize: 12, outline: "none" }}>{row.balance}</td>
              <td contentEditable suppressContentEditableWarning onBlur={(e) => updateDay(i, "fulfill", e.currentTarget.innerText)} className="editable-hover" style={{ padding: 8, border: "1px solid #e2d6bf", fontSize: 12, outline: "none" }}>{row.fulfill}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ backgroundColor: "#a8475a", color: "#fff", padding: "4px 12px", fontWeight: "bold", fontSize: 14, marginBottom: 10, fontFamily: "serif" }}>Check-off</div>
      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 30 }}>
        <thead>
          <tr style={{ backgroundColor: "#a8475a", color: "#fff", textAlign: "left", fontSize: 12 }}>
            {[1,2,3,4,5,6,7].map(d => <th key={d} style={{ padding: 8, border: "1px solid #e2d6bf" }}>Day {d}</th>)}
          </tr>
        </thead>
        <tbody>
          <tr>
            {[1,2,3,4,5,6,7].map(d => <td key={d} style={{ border: "1px solid #e2d6bf", height: 40 }}></td>)}
          </tr>
        </tbody>
      </table>

      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 20 }}>
        <tbody>
          <tr>
            <td style={{ padding: 8, border: "1px solid #e2d6bf", backgroundColor: "#f7f1e6", color: "#a8475a", fontWeight: "bold", fontSize: 12, width: "30%" }}>What I noticed</td>
            <td contentEditable suppressContentEditableWarning onBlur={(e) => update("noticed", e.currentTarget.innerText)} className="editable-hover" style={{ border: "1px solid #e2d6bf", height: 50, padding: 8, outline: "none" }}>{data.noticed}</td>
          </tr>
          <tr>
            <td style={{ padding: 8, border: "1px solid #e2d6bf", backgroundColor: "#f7f1e6", color: "#a8475a", fontWeight: "bold", fontSize: 12 }}>What I will keep</td>
            <td contentEditable suppressContentEditableWarning onBlur={(e) => update("keep", e.currentTarget.innerText)} className="editable-hover" style={{ border: "1px solid #e2d6bf", height: 50, padding: 8, outline: "none" }}>{data.keep}</td>
          </tr>
        </tbody>
      </table>

      <style>{`
        .editable-hover:hover { background-color: rgba(168, 71, 90, 0.05); outline: 1px dashed #a8475a; }
        .editable-hover:focus { background-color: #fff; outline: 2px solid #a8475a; }
      `}</style>
    </div>
  );
}