"use client";
import { useState } from "react";

export default function WelcomePackEditor({ initialData, onChange }: { initialData: any, onChange: (data: any) => void }) {
  const [data, setData] = useState(initialData || {
    dearClient: "",
    introText1: "",
    introText2: "",
    signOff: "",
    howWeWork: [],
    beforeVisit: [],
    programs: [],
    programDetails: { startDate: "", firstFollowUp: "", sessionTimes: "", contact: "" },
    goodToKnow: { reschedule: "", payment: "" },
    faqs: { q1: "", a1: "", q2: "", a2: "", q3: "", a3: "" }
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
        <div style={{ fontSize: 10, color: "#8a5a44", letterSpacing: 1, textTransform: "uppercase" }}>Welcome Pack</div>
      </div>

      {/* Title */}
      <div style={{ textAlign: "center", marginBottom: 30 }}>
        <div style={{ fontSize: 60, color: "#a8475a", fontWeight: "bold", fontFamily: "serif", lineHeight: 1 }}>N</div>
        <h1 style={{ fontSize: 32, color: "#a8475a", fontFamily: "serif", margin: "10px 0 0" }}>Welcome to Naflar</h1>
        <p style={{ fontSize: 14, color: "#8a5a44", fontStyle: "italic", margin: 0 }}>We are glad you are here</p>
      </div>

      {/* Intro */}
      <div style={{ fontSize: 12, lineHeight: 1.6, marginBottom: 20 }}>
        <div contentEditable suppressContentEditableWarning onBlur={(e) => update("dearClient", e.currentTarget.innerText)} className="editable-hover" style={{ fontWeight: "bold", marginBottom: 10 }}>{data.dearClient}</div>
        <div contentEditable suppressContentEditableWarning onBlur={(e) => update("introText1", e.currentTarget.innerText)} className="editable-hover" style={{ marginBottom: 10 }}>{data.introText1}</div>
        <div contentEditable suppressContentEditableWarning onBlur={(e) => update("introText2", e.currentTarget.innerText)} className="editable-hover" style={{ marginBottom: 10 }}>{data.introText2}</div>
        <div contentEditable suppressContentEditableWarning onBlur={(e) => update("signOff", e.currentTarget.innerText)} className="editable-hover" style={{ fontStyle: "italic", color: "#8a5a44" }}>{data.signOff}</div>
      </div>

      {/* How We Work */}
      <div style={{ backgroundColor: "#a8475a", color: "#fff", padding: "4px 12px", fontWeight: "bold", fontSize: 14, marginBottom: 10, fontFamily: "serif" }}>HOW WE WORK</div>
      <ul style={{ paddingLeft: 20, fontSize: 12, lineHeight: 1.6, marginBottom: 20 }}>
        {data.howWeWork.map((item: string, i: number) => (
          <li key={i} contentEditable suppressContentEditableWarning onBlur={(e) => { const arr = [...data.howWeWork]; arr[i] = e.currentTarget.innerText; update("howWeWork", arr); }} className="editable-hover">{item}</li>
        ))}
      </ul>

      {/* Before Your First Visit */}
      <div style={{ backgroundColor: "#a8475a", color: "#fff", padding: "4px 12px", fontWeight: "bold", fontSize: 14, marginBottom: 10, fontFamily: "serif" }}>BEFORE YOUR FIRST VISIT</div>
      <div style={{ fontSize: 12, lineHeight: 1.8, marginBottom: 20 }}>
        {data.beforeVisit.map((item: string, i: number) => (
          <div key={i} style={{ display: "flex", gap: 8 }}>
            <span>☐</span>
            <div contentEditable suppressContentEditableWarning onBlur={(e) => { const arr = [...data.beforeVisit]; arr[i] = e.currentTarget.innerText; update("beforeVisit", arr); }} className="editable-hover" style={{ flex: 1 }}>{item}</div>
          </div>
        ))}
      </div>

      {/* Your Program */}
      <div style={{ backgroundColor: "#a8475a", color: "#fff", padding: "4px 12px", fontWeight: "bold", fontSize: 14, marginBottom: 10, fontFamily: "serif" }}>YOUR PROGRAM</div>
      <div style={{ fontSize: 12, lineHeight: 1.8, marginBottom: 15 }}>
        {data.programs.map((item: string, i: number) => (
          <div key={i} style={{ display: "flex", gap: 8 }}>
            <span>☐</span>
            <div contentEditable suppressContentEditableWarning onBlur={(e) => { const arr = [...data.programs]; arr[i] = e.currentTarget.innerText; update("programs", arr); }} className="editable-hover" style={{ flex: 1 }}>{item}</div>
          </div>
        ))}
      </div>

      {/* Program Details Table */}
      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 20 }}>
        <tbody>
          <tr>
            <td style={{ padding: 8, border: "1px solid #e2d6bf", backgroundColor: "#f7f1e6", color: "#a8475a", fontWeight: "bold", fontSize: 12, width: "30%" }}>Start date</td>
            <td contentEditable suppressContentEditableWarning onBlur={(e) => update("programDetails", { ...data.programDetails, startDate: e.currentTarget.innerText })} className="editable-hover" style={{ border: "1px solid #e2d6bf", padding: 8, fontSize: 12 }}>{data.programDetails.startDate}</td>
            <td style={{ padding: 8, border: "1px solid #e2d6bf", backgroundColor: "#f7f1e6", color: "#a8475a", fontWeight: "bold", fontSize: 12, width: "30%" }}>First follow-up</td>
            <td contentEditable suppressContentEditableWarning onBlur={(e) => update("programDetails", { ...data.programDetails, firstFollowUp: e.currentTarget.innerText })} className="editable-hover" style={{ border: "1px solid #e2d6bf", padding: 8, fontSize: 12 }}>{data.programDetails.firstFollowUp}</td>
          </tr>
          <tr>
            <td style={{ padding: 8, border: "1px solid #e2d6bf", backgroundColor: "#f7f1e6", color: "#a8475a", fontWeight: "bold", fontSize: 12 }}>Session times</td>
            <td contentEditable suppressContentEditableWarning onBlur={(e) => update("programDetails", { ...data.programDetails, sessionTimes: e.currentTarget.innerText })} className="editable-hover" style={{ border: "1px solid #e2d6bf", padding: 8, fontSize: 12 }}>{data.programDetails.sessionTimes}</td>
            <td style={{ padding: 8, border: "1px solid #e2d6bf", backgroundColor: "#f7f1e6", color: "#a8475a", fontWeight: "bold", fontSize: 12 }}>Contact for WhatsApp</td>
            <td contentEditable suppressContentEditableWarning onBlur={(e) => update("programDetails", { ...data.programDetails, contact: e.currentTarget.innerText })} className="editable-hover" style={{ border: "1px solid #e2d6bf", padding: 8, fontSize: 12 }}>{data.programDetails.contact}</td>
          </tr>
        </tbody>
      </table>

      {/* Good to Know */}
      <div style={{ backgroundColor: "#a8475a", color: "#fff", padding: "4px 12px", fontWeight: "bold", fontSize: 14, marginBottom: 10, fontFamily: "serif" }}>GOOD TO KNOW</div>
      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 20 }}>
        <tbody>
          <tr>
            <td style={{ padding: 8, border: "1px solid #e2d6bf", backgroundColor: "#f7f1e6", color: "#a8475a", fontWeight: "bold", fontSize: 12, width: "30%" }}>Rescheduling / cancellation</td>
            <td contentEditable suppressContentEditableWarning onBlur={(e) => update("goodToKnow", { ...data.goodToKnow, reschedule: e.currentTarget.innerText })} className="editable-hover" style={{ border: "1px solid #e2d6bf", padding: 8, fontSize: 12, height: 40 }}>{data.goodToKnow.reschedule}</td>
          </tr>
          <tr>
            <td style={{ padding: 8, border: "1px solid #e2d6bf", backgroundColor: "#f7f1e6", color: "#a8475a", fontWeight: "bold", fontSize: 12 }}>Payment details</td>
            <td contentEditable suppressContentEditableWarning onBlur={(e) => update("goodToKnow", { ...data.goodToKnow, payment: e.currentTarget.innerText })} className="editable-hover" style={{ border: "1px solid #e2d6bf", padding: 8, fontSize: 12, height: 40 }}>{data.goodToKnow.payment}</td>
          </tr>
        </tbody>
      </table>

      {/* Common Questions */}
      <div style={{ backgroundColor: "#a8475a", color: "#fff", padding: "4px 12px", fontWeight: "bold", fontSize: 14, marginBottom: 10, fontFamily: "serif", textAlign: "center" }}>COMMON QUESTIONS</div>
      <div style={{ fontSize: 12, lineHeight: 1.6, marginBottom: 20 }}>
        <div style={{ marginBottom: 10 }}>
          <div contentEditable suppressContentEditableWarning onBlur={(e) => update("faqs", { ...data.faqs, q1: e.currentTarget.innerText })} className="editable-hover" style={{ color: "#a8475a", fontWeight: "bold" }}>{data.faqs.q1}</div>
          <div contentEditable suppressContentEditableWarning onBlur={(e) => update("faqs", { ...data.faqs, a1: e.currentTarget.innerText })} className="editable-hover">{data.faqs.a1}</div>
        </div>
        <div style={{ marginBottom: 10 }}>
          <div contentEditable suppressContentEditableWarning onBlur={(e) => update("faqs", { ...data.faqs, q2: e.currentTarget.innerText })} className="editable-hover" style={{ color: "#a8475a", fontWeight: "bold" }}>{data.faqs.q2}</div>
          <div contentEditable suppressContentEditableWarning onBlur={(e) => update("faqs", { ...data.faqs, a2: e.currentTarget.innerText })} className="editable-hover">{data.faqs.a2}</div>
        </div>
        <div style={{ marginBottom: 10 }}>
          <div contentEditable suppressContentEditableWarning onBlur={(e) => update("faqs", { ...data.faqs, q3: e.currentTarget.innerText })} className="editable-hover" style={{ color: "#a8475a", fontWeight: "bold" }}>{data.faqs.q3}</div>
          <div contentEditable suppressContentEditableWarning onBlur={(e) => update("faqs", { ...data.faqs, a3: e.currentTarget.innerText })} className="editable-hover">{data.faqs.a3}</div>
        </div>
      </div>

      {/* Footer */}
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