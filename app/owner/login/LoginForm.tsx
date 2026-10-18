"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [f, setF] = useState({ username: "", password: "" });
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(""); setBusy(true);
    const res = await signIn("credentials", { ...f, redirect: false });
    setBusy(false);
    if (res?.error) { setErr("Wrong username or password."); return; }
    router.replace("/owner");
    router.refresh();
  }

  return (
    <form className="form" onSubmit={submit}>
      <label>Username<input required value={f.username} onChange={(e) => setF({ ...f, username: e.target.value })} /></label>
      <label>Password<input required type="password" value={f.password} onChange={(e) => setF({ ...f, password: e.target.value })} /></label>
      {err && <div className="ow-flag-red">{err}</div>}
      <button className="btn btn-primary" disabled={busy}>{busy ? "Signing in…" : "Sign in"}</button>
    </form>
  );
}