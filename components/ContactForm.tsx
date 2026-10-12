"use client";
import { useState } from "react";
import { waLink } from "../lib/site";

export default function ContactForm() {
  const [f, setF] = useState({ name: "", phone: "", interest: "Single consultation", msg: "" });
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setF({ ...f, [k]: e.target.value });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Assalamu alaikum! I'm ${f.name}${f.phone ? ` (${f.phone})` : ""}.\nInterested in: ${f.interest}.\n${f.msg}`;
    window.open(waLink(text), "_blank");
  };

  return (
    <form className="form card" onSubmit={submit}>
      <label>
        Your name
        <input required value={f.name} onChange={set("name")} placeholder="Full name" />
      </label>
      <label>
        Phone (optional)
        <input value={f.phone} onChange={set("phone")} placeholder="03xx xxxxxxx" inputMode="tel" />
      </label>
      <label>
        I'm interested in
        <select value={f.interest} onChange={set("interest")}>
          <option>Single consultation</option>
          <option>Program 1 — Feed Reset</option>
          <option>Program 2 — The Naflar Method</option>
          <option>Program 3 — Deep Transformation</option>
          <option>Workshop / Corporate session</option>
        </select>
      </label>
      <label>
        Tell me a little about your goals
        <textarea rows={4} value={f.msg} onChange={set("msg")} placeholder="What would you like help with?" />
      </label>
      <button className="btn btn-primary" type="submit">Send via WhatsApp</button>
      <small>This opens WhatsApp with your message ready to send.</small>
    </form>
  );
}