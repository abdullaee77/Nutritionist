"use client";
import { useState } from "react";

export default function SettingsPage() {
  const [passwords, setPasswords] = useState({ current: "", new: "", confirm: "" });
  const [status, setStatus] = useState("");

  async function updatePassword(e: React.FormEvent) {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) return setStatus("Passwords do not match.");
    
    setStatus("Updating...");
    // Phase 6 API call goes here (we will build this next)
    setTimeout(() => setStatus("Password updated successfully."), 1000);
  }

  return (
    <div style={{ maxWidth: 600, display: "grid", gap: 32 }}>
      <header>
        <h1 style={{ fontSize: "2.2rem" }}>Settings</h1>
        <p style={{ color: "var(--date)" }}>Manage your account and preferences.</p>
      </header>

      <div className="ow-card">
        <h2 style={{ fontSize: "1.4rem", marginBottom: 16 }}>Change Password</h2>
        <form className="form" onSubmit={updatePassword} style={{ maxWidth: 400 }}>
          <label>Current Password <input type="password" required value={passwords.current} onChange={e => setPasswords({...passwords, current: e.target.value})} /></label>
          <label>New Password <input type="password" required minLength={8} value={passwords.new} onChange={e => setPasswords({...passwords, new: e.target.value})} /></label>
          <label>Confirm New Password <input type="password" required minLength={8} value={passwords.confirm} onChange={e => setPasswords({...passwords, confirm: e.target.value})} /></label>
          <button className="btn btn-primary" type="submit" style={{ marginTop: 10 }}>Update Password</button>
          {status && <div className="ow-flag-ok" style={{ marginTop: 10 }}>{status}</div>}
        </form>
      </div>

      <div className="ow-card">
        <h2 style={{ fontSize: "1.4rem", marginBottom: 16 }}>Dropdown Lists</h2>
        <p style={{ color: "var(--date)", marginBottom: 20 }}>Manage the options that appear in client records (e.g., Activity Factors, Fasting Types).</p>
        <button className="btn btn-ghost">Edit Lists (Coming Soon)</button>
      </div>
    </div>
  );
}