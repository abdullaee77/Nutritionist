import Reveal from "../../components/Reveal";
import { LogoMark } from "../../components/Logo";
import { site, waLink } from "../../lib/site";

export const metadata = { title: "About — Naflar Health Care" };

export default function About() {
  return (
    <>
      <section className="page-head">
        <div className="container">
          <span className="eyebrow rise">About</span>
          <h1 className="rise" style={{ animationDelay: "100ms" }}>A leaf that becomes a person.</h1>
          <p className="lead rise" style={{ animationDelay: "200ms" }}>
            {site.owner} · {site.role}
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <Reveal>
            <div className="portrait">
              <LogoMark size={140} n="#F7F1E6" />
              <small>Photo of {site.owner} goes here</small>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <h2>Hi, I'm {site.owner.split(" ")[0]}.</h2>
            <p>
              I'm a clinical dietitian and nutrition coach. I built Naflar because I kept seeing the same
              pattern: people who followed every rule on a meal plan and still felt lost.
            </p>
            <p>
              My work joins evidence-based clinical nutrition with the moderation and routine of the Sunnah,
              so that eating well becomes a path back to purpose, not just a number on a scale.
            </p>
            <div className="pills">
              <span>Grounded</span><span>Gentle</span><span>Evidence-led</span>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section tint">
        <div className="container">
          <Reveal className="center">
            <span className="eyebrow">The Logo</span>
            <h2>What the mark means</h2>
          </Reveal>
          <div className="grid-3">
            {[
              ["The N", "Naflar, a steady path.", "Balance"],
              ["The sage leaf", "Nourishment and growth.", "Feed"],
              ["The honey dot", "A person looking up toward purpose.", "Fulfill"],
            ].map(([t, d, k], i) => (
              <Reveal key={t} delay={i * 110}>
                <div className="card">
                  <small className="tag">{k}</small>
                  <h3>{t}</h3>
                  <p>{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section cta-wrap">
        <Reveal>
          <div className="container cta">
            <h2>Let's find your next clear step.</h2>
            <a className="btn btn-honey" href={waLink()} target="_blank" rel="noreferrer">Book a consultation</a>
          </div>
        </Reveal>
      </section>
    </>
  );
}