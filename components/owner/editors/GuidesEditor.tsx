"use client";
import { useState } from "react";

export default function GuidesEditor({ initialData, onChange }: { initialData: any, onChange: (data: any) => void }) {
  const [data, setData] = useState(initialData || {
    plate: [],
    meals: [],
    grocery: { veg: [], protein: [], grains: [] },
    labelReading: [],
    eatingOut: []
  });

  const update = (key: string, val: any) => {
    const newData = { ...data, [key]: val };
    setData(newData);
    onChange(newData);
  };

  const updateNested = (parent: string, key: string, val: any) => {
    const newData = { ...data, [parent]: { ...data[parent], [key]: val } };
    setData(newData);
    onChange(newData);
  };

  const updateArray = (key: string, index: number, val: string) => {
    const arr = [...data[key]];
    arr[index] = val;
    update(key, arr);
  };

  return (
    <div style={{ backgroundColor: "#fff", padding: 40, boxShadow: "0 4px 20px rgba(0,0,0,0.05)", borderRadius: 8, maxWidth: 800, margin: "0 auto", color: "#2a3a30", fontFamily: "Helvetica" }}>
      
      <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #e2d6bf", paddingBottom: 10, marginBottom: 30 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 24, color: "#a8475a", fontWeight: "bold" }}>N</span>
          <span style={{ fontSize: 12, color: "#a9bfa4", fontWeight: "bold", letterSpacing: 2 }}>NAFLAR HEALTHCARE</span>
        </div>
        <div style={{ fontSize: 10, color: "#8a5a44", letterSpacing: 1, textTransform: "uppercase" }}>Guides</div>
      </div>

      <div style={{ textAlign: "center", marginBottom: 30 }}>
        <div style={{ fontSize: 60, color: "#a8475a", fontWeight: "bold", fontFamily: "serif", lineHeight: 1 }}>N</div>
        <h1 style={{ fontSize: 32, color: "#a8475a", fontFamily: "serif", margin: "10px 0 0" }}>Everyday Nutrition Guides</h1>
        <p style={{ fontSize: 14, color: "#8a5a44", fontStyle: "italic", margin: 0 }}>Simple tools for your kitchen</p>
      </div>

      {/* THE NAFLAR PLATE */}
      <div style={{ backgroundColor: "#a8475a", color: "#fff", padding: "4px 12px", fontWeight: "bold", fontSize: 14, marginBottom: 10, fontFamily: "serif" }}>THE NAFLAR PLATE</div>
      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 30 }}>
        <thead>
          <tr style={{ backgroundColor: "#a8475a", color: "#fff", textAlign: "left", fontSize: 12 }}>
            <th style={{ padding: 8, border: "1px solid #e2d6bf", width: "20%" }}>Part of the plate</th>
            <th style={{ padding: 8, border: "1px solid #e2d6bf", width: "80%" }}>What goes here</th>
          </tr>
        </thead>
        <tbody>
          {data.plate.map((row: any, i: number) => (
            <tr key={i}>
              <td style={{ padding: 8, border: "1px solid #e2d6bf", backgroundColor: "#f7f1e6", color: "#a8475a", fontWeight: "bold", fontSize: 12 }}>{row.part}</td>
              <td contentEditable suppressContentEditableWarning onBlur={(e) => updateArray("plate", i, e.currentTarget.innerText)} className="editable-hover" style={{ padding: 8, border: "1px solid #e2d6bf", fontSize: 12, outline: "none" }}>{row.text}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* SIMPLE MEAL IDEAS */}
      <div style={{ backgroundColor: "#a8475a", color: "#fff", padding: "4px 12px", fontWeight: "bold", fontSize: 14, marginBottom: 10, fontFamily: "serif" }}>SIMPLE MEAL IDEAS</div>
      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 30 }}>
        <thead>
          <tr style={{ backgroundColor: "#a8475a", color: "#fff", textAlign: "left", fontSize: 12 }}>
            <th style={{ padding: 8, border: "1px solid #e2d6bf", width: "20%" }}>Meal</th>
            <th style={{ padding: 8, border: "1px solid #e2d6bf", width: "80%" }}>Ideas</th>
          </tr>
        </thead>
        <tbody>
          {data.meals.map((row: any, i: number) => (
            <tr key={i}>
              <td style={{ padding: 8, border: "1px solid #e2d6bf", backgroundColor: "#f7f1e6", color: "#a8475a", fontWeight: "bold", fontSize: 12 }}>{row.meal}</td>
              <td contentEditable suppressContentEditableWarning onBlur={(e) => {
                const arr = [...data.meals];
                arr[i].text = e.currentTarget.innerText;
                update("meals", arr);
              }} className="editable-hover" style={{ padding: 8, border: "1px solid #e2d6bf", fontSize: 12, outline: "none" }}>{row.text}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* GROCERY CHECKLIST */}
      <div style={{ backgroundColor: "#a8475a", color: "#fff", padding: "4px 12px", fontWeight: "bold", fontSize: 14, marginBottom: 10, fontFamily: "serif" }}>GROCERY CHECKLIST</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20, marginBottom: 30 }}>
        <div>
          <div style={{ color: "#a8475a", fontWeight: "bold", marginBottom: 6 }}>Vegetables and fruit</div>
          {data.grocery.veg.map((item: string, i: number) => (
            <div key={i} style={{ display: "flex", gap: 6, marginBottom: 4, fontSize: 12 }}>
              <span>☐</span>
              <div contentEditable suppressContentEditableWarning onBlur={(e) => { const arr = [...data.grocery.veg]; arr[i] = e.currentTarget.innerText; updateNested("grocery", "veg", arr); }} className="editable-hover" style={{ flex: 1, outline: "none" }}>{item}</div>
            </div>
          ))}
        </div>
        <div>
          <div style={{ color: "#a8475a", fontWeight: "bold", marginBottom: 6 }}>Protein</div>
          {data.grocery.protein.map((item: string, i: number) => (
            <div key={i} style={{ display: "flex", gap: 6, marginBottom: 4, fontSize: 12 }}>
              <span>☐</span>
              <div contentEditable suppressContentEditableWarning onBlur={(e) => { const arr = [...data.grocery.protein]; arr[i] = e.currentTarget.innerText; updateNested("grocery", "protein", arr); }} className="editable-hover" style={{ flex: 1, outline: "none" }}>{item}</div>
            </div>
          ))}
        </div>
        <div>
          <div style={{ color: "#a8475a", fontWeight: "bold", marginBottom: 6 }}>Grains and extras</div>
          {data.grocery.grains.map((item: string, i: number) => (
            <div key={i} style={{ display: "flex", gap: 6, marginBottom: 4, fontSize: 12 }}>
              <span>☐</span>
              <div contentEditable suppressContentEditableWarning onBlur={(e) => { const arr = [...data.grocery.grains]; arr[i] = e.currentTarget.innerText; updateNested("grocery", "grains", arr); }} className="editable-hover" style={{ flex: 1, outline: "none" }}>{item}</div>
            </div>
          ))}
        </div>
      </div>

      {/* READING LABEL & EATING OUT */}
      <div style={{ backgroundColor: "#a8475a", color: "#fff", padding: "4px 12px", fontWeight: "bold", fontSize: 14, marginBottom: 10, fontFamily: "serif" }}>READING A FOOD LABEL</div>
      <ul style={{ paddingLeft: 20, fontSize: 12, lineHeight: 1.6, marginBottom: 20 }}>
        {data.labelReading.map((item: string, i: number) => (
          <li key={i} contentEditable suppressContentEditableWarning onBlur={(e) => updateArray("labelReading", i, e.currentTarget.innerText)} className="editable-hover" style={{ outline: "none" }}>{item}</li>
        ))}
      </ul>

      <div style={{ backgroundColor: "#a8475a", color: "#fff", padding: "4px 12px", fontWeight: "bold", fontSize: 14, marginBottom: 10, fontFamily: "serif" }}>EATING OUT</div>
      <ul style={{ paddingLeft: 20, fontSize: 12, lineHeight: 1.6, marginBottom: 20 }}>
        {data.eatingOut.map((item: string, i: number) => (
          <li key={i} contentEditable suppressContentEditableWarning onBlur={(e) => updateArray("eatingOut", i, e.currentTarget.innerText)} className="editable-hover" style={{ outline: "none" }}>{item}</li>
        ))}
      </ul>

      <style>{`
        .editable-hover:hover { background-color: rgba(168, 71, 90, 0.05); outline: 1px dashed #a8475a; }
        .editable-hover:focus { background-color: #fff; outline: 2px solid #a8475a; }
      `}</style>
    </div>
  );
}