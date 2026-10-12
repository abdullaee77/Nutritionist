"use client";
import { useEffect, useState } from "react";
import { LogoMark } from "./Logo";

export default function Preloader() {
  const [phase, setPhase] = useState<"in" | "out" | "done">("in");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const t1 = setTimeout(() => {
      setPhase("out");
      document.documentElement.classList.add("ready"); // starts hero animations
    }, 2100);
    const t2 = setTimeout(() => {
      setPhase("done");
      document.body.style.overflow = "";
    }, 3100);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      document.body.style.overflow = "";
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div className={`preloader ${phase === "out" ? "out" : ""}`} aria-hidden="true">
      <div className="pl-in">
        <div className="pl-mark"><LogoMark size={96} n="#F7F1E6" /></div>
        <div className="pl-name">
          {"NAFLAR".split("").map((c, i) => (
            <span key={i} style={{ animationDelay: `${500 + i * 90}ms` }}>{c}</span>
          ))}
        </div>
        <div className="pl-tag">Feed the Purpose, Balance the Life</div>
        <div className="pl-bar" />
      </div>
    </div>
  );
}