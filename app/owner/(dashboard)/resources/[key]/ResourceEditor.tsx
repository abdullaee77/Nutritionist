"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import MethodGuideEditor from "@/components/owner/editors/MethodGuideEditor";
import WelcomePackEditor from "@/components/owner/editors/WelcomePackEditor";
import TrackersEditor from "@/components/owner/editors/TrackersEditor";
import SevenDayEditor from "@/components/owner/editors/SevenDayEditor";
import GuidesEditor from "@/components/owner/editors/GuidesEditor";
import WorkbookEditor from "@/components/owner/editors/WorkbookEditor";
import ClinicalFormEditor from "@/components/owner/editors/ClinicalFormEditor";

export default function ResourceEditor({ resource, initialSections }: { resource: any, initialSections: any }) {
  const router = useRouter();
  const [data, setData] = useState(initialSections);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  const isMethodGuide = resource.key === "method-guide";
  const isWelcomePack = resource.key === "welcome-pack";
  const isTrackers = resource.key === "trackers";
  const isSevenDay = resource.key === "7-day-challenge";
  const isGuides = resource.key === "everyday-guides";
  const isWorkbook = resource.key === "workbook";
  const isClinical = resource.key === "prediabetes-log-plain" || resource.key === "prediabetes-log-naflar" || resource.key === "nutrition-assessment";
  const isCustom = isMethodGuide || isWelcomePack || isTrackers || isSevenDay || isGuides || isWorkbook || isClinical;

  async function save() {
    setSaving(true);
    setMsg("");
    const res = await fetch(`/api/owner/resources/${resource.key}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sections: isCustom ? data : data }),
    });
    setSaving(false);
    if (res.ok) {
      setMsg("Saved successfully.");
      router.refresh();
    } else {
      setMsg("Error saving.");
    }
  }

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gap: 24 }}>
      <header style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Link href="/owner/resources" style={{ color: "var(--pom)", fontWeight: 600, fontSize: "0.9rem" }}>← Back to Resources</Link>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16 }}>
          <div>
            <span className="tag" style={{ color: "var(--date)" }}>{resource.category}</span>
            <h1 style={{ fontSize: "2rem" }}>{resource.title}</h1>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button onClick={save} className="btn btn-primary" disabled={saving}>{saving ? "Saving..." : "Save Changes"}</button>
            <a href={`/api/owner/resources/${resource.key}/export`} className="btn btn-ghost" target="_blank">Export PDF</a>
          </div>
        </div>
      </header>

      {msg && <div className="ow-flag-ok">{msg}</div>}

      {isMethodGuide && <MethodGuideEditor initialData={data[0]} onChange={(newData) => setData([newData])} />}
      {isWelcomePack && <WelcomePackEditor initialData={data[0]} onChange={(newData) => setData([newData])} />}
      {isTrackers && <TrackersEditor initialData={data[0]} onChange={(newData) => setData([newData])} />}
      {isSevenDay && <SevenDayEditor initialData={data[0]} onChange={(newData) => setData([newData])} />}
      {isGuides && <GuidesEditor initialData={data[0]} onChange={(newData) => setData([newData])} />}
      {isWorkbook && <WorkbookEditor initialData={data[0]} onChange={(newData) => setData([newData])} />}
      {isClinical && <ClinicalFormEditor resource={resource} initialData={data[0]} onChange={(newData) => setData([newData])} />}
      
      {!isCustom && (
        <div style={{ display: "grid", gap: 20 }}>
          {Array.isArray(data) && data.map((sec: any, i: number) => (
            <div key={i} className="ow-card">
              <label className="form" style={{ marginBottom: 12 }}>
                Heading
                <input value={sec.heading} onChange={(e) => { const nd = [...data]; nd[i].heading = e.target.value; setData(nd); }} />
              </label>
              <label className="form">
                Content
                <textarea rows={10} value={sec.body} onChange={(e) => { const nd = [...data]; nd[i].body = e.target.value; setData(nd); }} />
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}