"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SetupForm() {
  const router = useRouter();
  const [f, setF] = useState({ username: "", password: "", email: "" });
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(""); setBusy(true);
    const res = await fetch("/api/owner/setup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(f),
    });
    setBusy(false);
    if (!res.ok) { setErr((await res.json()).error ?? "Setup failed"); return; }
    router.replace("/owner/login");
  }

  return (
    <form className="form" onSubmit={submit}>
      <label>Username<input required value={f.username} onChange={(e) => setF({ ...f, username: e.target.value })} /></label>
      <label>Email (optional)<input type="email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} /></label>
      <label>Password<input required type="password" minLength={8} value={f.password} onChange={(e) => setF({ ...f, password: e.target.value })} /></label>
      {err && <div className="ow-flag-red">{err}</div>}
      <button className="btn btn-primary" disabled={busy}>{busy ? "Saving…" : "Create owner account"}</button>
    </form>
  );
}