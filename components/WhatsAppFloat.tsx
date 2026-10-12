"use client";
import { useEffect, useRef, useState } from "react";
import { PhoneIcon, WhatsAppIcon } from "./Icons";
import { site, telLink, waLink } from "../lib/site";

export default function WhatsAppFloat() {
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const on = (e: MouseEvent) => {
      if (box.current && !box.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("click", on);
    return () => document.removeEventListener("click", on);
  }, []);

  return (
    <div className="wa-wrap" ref={box}>
      <div className={`wa-panel ${open ? "open" : ""}`}>
        <small>Chat or call us</small>
        {site.phones.map((p) => (
          <div className="wa-row" key={p.intl}>
            <b>{p.display}</b>
            <a className="wa-btn wa" href={waLink(undefined, p.intl)} target="_blank" rel="noreferrer" aria-label={`WhatsApp ${p.display}`}>
              <WhatsAppIcon size={18} />
            </a>
            <a className="wa-btn call" href={telLink(p.intl)} aria-label={`Call ${p.display}`}>
              <PhoneIcon size={18} />
            </a>
          </div>
        ))}
      </div>
      <button className="wa-float" onClick={() => setOpen(!open)} aria-label="Chat or call us" aria-expanded={open}>
        <span className="wa-label">Chat or call</span>
        <span className="wa-ic"><WhatsAppIcon size={26} /></span>
      </button>
    </div>
  );
}