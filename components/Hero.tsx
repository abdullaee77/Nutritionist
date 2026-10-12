"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { LogoMark } from "./Logo";
import { WhatsAppIcon } from "./Icons";
import { Pomegranate, DateFruit, Olive, Honey, LeafIcon } from "./Foods";
import { waLink } from "../lib/site";

const rotating = ["Body", "Mind", "Soul"];

const ORBIT_SECONDS = 40;
const orbitItems = [
  { Icon: Pomegranate, p: 0 },
  { Icon: Honey, p: 0.2 },
  { Icon: Olive, p: 0.4 },
  { Icon: DateFruit, p: 0.6 },
  { Icon: LeafIcon, p: 0.8 },
];

const sparks = [
  { top: "6%", left: "20%", delay: "0s" },
  { top: "14%", left: "82%", delay: "0.8s" },
  { top: "78%", left: "8%", delay: "1.6s" },
  { top: "88%", left: "70%", delay: "2.2s" },
  { top: "46%", left: "-2%", delay: "1.1s" },
];

const leaves = Array.from({ length: 10 }).map((_, i) => ({
  left: 4 + i * 10,
  size: 14 + (i % 4) * 8,
  dur: 14 + (i % 5) * 3,
  delay: -i * 2.3,
  color: i % 3 === 0 ? "var(--honey)" : i % 3 === 1 ? "var(--sage)" : "#d98a98",
}));

const bubbles = Array.from({ length: 9 }).map((_, i) => ({
  left: 6 + i * 10.5,
  size: 6 + (i % 3) * 5,
  dur: 9 + (i % 4) * 3,
  delay: -i * 1.7,
}));

const W = ({ i, em, children }: { i: number; em?: boolean; children: React.ReactNode }) => (
  <span className="word">
    <span className={em ? "em" : ""} style={{ ["--d" as string]: `${i * 130}ms` } as React.CSSProperties}>
      {children}
    </span>
  </span>
);

export default function Hero() {
  const [idx, setIdx] = useState(0);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const t = setInterval(() => setIdx((v) => (v + 1) % rotating.length), 2400);
    return () => clearInterval(t);
  }, []);

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r || !ref.current) return;
    ref.current.style.setProperty("--mx", String((e.clientX - r.left) / r.width - 0.5));
    ref.current.style.setProperty("--my", String((e.clientY - r.top) / r.height - 0.5));
  };

  return (
    <section className="hero" ref={ref} onMouseMove={onMove}>
      <div className="blob b1" /><div className="blob b2" />

      <div className="bg-marquee" aria-hidden="true">
        <div>
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i}>FEED · BALANCE · FULFILL · </span>
          ))}
        </div>
      </div>

      {leaves.map((l, i) => (
        <span
          key={i}
          className="leaf"
          style={{
            left: `${l.left}%`,
            ["--s" as string]: `${l.size}px`,
            ["--d" as string]: `${l.dur}s`,
            animationDelay: `${l.delay}s`,
            background: l.color,
          } as React.CSSProperties}
        />
      ))}

      {bubbles.map((b, i) => (
        <span
          key={i}
          className="bub"
          style={{
            left: `${b.left}%`,
            ["--s" as string]: `${b.size}px`,
            ["--d" as string]: `${b.dur}s`,
            animationDelay: `${b.delay}s`,
          } as React.CSSProperties}
        />
      ))}

      <div className="hero-in">
        <div className="hero-copy">
          <span className="chip-eyebrow rise" style={{ animationDelay: "0ms" }}>
            <i className="live" /> Clinical Dietitian & Nutrition Coach
          </span>

          <h1>
            <W i={0}>Feed</W><W i={1}>the</W><W i={2} em>Purpose,</W>
            <br />
            <W i={3}>Balance</W><W i={4}>the</W><W i={5} em>Life.</W>
          </h1>

          <p className="rot rise" style={{ animationDelay: "800ms" }}>
            Nourishing your{" "}
            <span className="rot-box">
              <span key={idx} className={`rot-word rw${idx}`}>{rotating[idx]}</span>
            </span>
          </p>

          <p className="lead rise" style={{ animationDelay: "950ms" }}>
            Evidence-based clinical nutrition, joined with the moderation and routine of the Sunnah.
            Plain words, calm tone, one clear next step.
          </p>

          <div className="btn-row rise" style={{ animationDelay: "1100ms" }}>
            <a className="btn btn-primary" href={waLink()} target="_blank" rel="noreferrer">
              <WhatsAppIcon size={20} /> Book on WhatsApp
            </a>
            <Link className="btn btn-ghost" href="/programs">See programs</Link>
          </div>
        </div>

        <div className="hero-art rise" style={{ animationDelay: "300ms" }}>
          <div className="ripple" /><div className="ripple d2" /><div className="ripple d3" />

          {sparks.map((s, i) => (
            <span key={i} className="spark" style={{ top: s.top, left: s.left, animationDelay: s.delay }} />
          ))}

          <svg className="textring" viewBox="0 0 400 400" aria-hidden="true">
            <defs>
              <path id="ringPath" d="M200,200 m-175,0 a175,175 0 1,1 350,0 a175,175 0 1,1 -350,0" />
            </defs>
            <text>
              <textPath href="#ringPath" textLength="1090" lengthAdjust="spacing">
                FEED · BALANCE · FULFILL · FEED · BALANCE · FULFILL ·
              </textPath>
            </text>
          </svg>

          <div className="layer l1">
            <div className="orb"><LogoMark size={110} n="#F7F1E6" /></div>
          </div>

          <div className="layer l2">
            {orbitItems.map(({ Icon, p }, i) => (
              <div
                key={i}
                className="orbit oa"
                style={{ animationDuration: `${ORBIT_SECONDS}s`, animationDelay: `${-ORBIT_SECONDS * p}s` }}
              >
                <span
                  className="item"
                  style={{
                    animationDuration: `${ORBIT_SECONDS}s`,
                    animationDelay: `${-ORBIT_SECONDS * p}s`,
                    animationDirection: "reverse",
                  }}
                >
                  <Icon />
                </span>
              </div>
            ))}
            <div className="found-card">
              <i className="live" /> Founding client spots open
            </div>
          </div>
        </div>
      </div>

      <div className="scroll-cue" aria-hidden="true"><span /></div>
    </section>
  );
}