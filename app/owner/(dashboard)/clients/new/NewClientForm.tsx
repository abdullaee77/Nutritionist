"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewClientForm() {
  const router = useRouter();
  const [f, setF] = useState({ fullName: "", dob: "", sex: "", phone: "", email: "", program: "Single consultation" });
  const [err, setErr] = useState(""); const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault(); setErr(""); setBusy(true);
    const res = await fetch("/api/owner/clients", {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(f),
    });
    setBusy(false);
    if (!res.ok) { setErr("Could not create client."); return; }
    const { id } = await res.json();
    router.replace(`/owner/clients/${id}/record/intake`);
  }

  return (
    <form className="form" onSubmit={submit}>
      <label>Full name<input required value={f.fullName} onChange={(e) => setF({ ...f, fullName: e.target.value })} /></label>
      <label>Date of birth<input type="date" value={f.dob} onChange={(e) => setF({ ...f, dob: e.target.value })} /></label>
      <label>Sex
        <select value={f.sex} onChange={(e) => setF({ ...f, sex: e.target.value })}>
          <option value="">—</option><option>Female</option><option>Male</option>
        </select>
      </label>
      <label>Phone<input value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} /></label>
      <label>Email<input type="email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} /></label>
      <label>Program
        <select value={f.program} onChange={(e) => setF({ ...f, program: e.target.value })}>
          <option>Single consultation</option>
          <option>Feed Reset (2 wk)</option>
          <option>The Naflar Method (6 wk)</option>
          <option>Deep Transformation (12 wk)</option>
        </select>
      </label>
      {err && <div className="ow-flag-red">{err}</div>}
      <button className="btn btn-primary" disabled={busy}>{busy ? "Creating…" : "Create client"}</button>
    </form>
  );
}