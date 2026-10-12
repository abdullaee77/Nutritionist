"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Logo from "./Logo";
import { WhatsAppIcon } from "./Icons";
import { waLink } from "../lib/site";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/method", label: "The Method" },
  { href: "/programs", label: "Programs" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    const on = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(y > 20);
      if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <>
      <div className="progress" ref={bar} />
      <header className={`nav ${scrolled ? "scrolled" : ""}`}>
        <div className="container nav-in">
          <Link href="/" aria-label="Naflar home"><Logo /></Link>
          <nav className={`nav-links ${open ? "open" : ""}`}>
            {links.map((l) => (
              <Link key={l.href} href={l.href} className={path === l.href ? "active" : ""}>{l.label}</Link>
            ))}
            <a className="btn btn-primary nav-cta" href={waLink()} target="_blank" rel="noreferrer">
              <WhatsAppIcon size={18} /> WhatsApp us
            </a>
          </nav>
          <button className={`burger ${open ? "open" : ""}`} onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open}>
            <span /><span /><span />
          </button>
        </div>
      </header>
    </>
  );
}