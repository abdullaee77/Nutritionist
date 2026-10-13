import Reveal from "../../components/Reveal";
import { LogoMark } from "../../components/Logo";
import { WhatsAppIcon } from "../../components/Icons";
import { site, waLink } from "../../lib/site";

export const metadata = { title: "About — Naflar Health Care" };

const approach = [
  { t: "Feed", tag: "Physical", c: "pom", d: "Assess labs, symptoms and eating patterns. Feed the body what it clinically needs, not a generic template." },
  { t: "Balance", tag: "Mental & lifestyle", c: "sage", d: "Simple, repeatable rhythms around eating, sleep and moderation, inspired by the Sunnah." },
  { t: "Fulfill", tag: "Spiritual", c: "honey", d: "Reflective work connecting nourishment to your bigger purpose: why caring for your body matters to what you're here to do." },
];

const areas = [
  "Clinical Nutrition Counseling",
  "Sunnah-Inspired Lifestyle Coaching",
  "Purposeful Meal Planning",
  "Mindful Eating Workshops",
];

export default function About() {
  return (
    <>
      <section className="page-head">
        <div className="container">
          <span className="eyebrow rise">About</span>
          <h1 className="rise" style={{ animationDelay: "100ms" }}>Where clinical science meets purpose.</h1>
          <p className="lead rise" style={{ animationDelay: "200ms" }}>
            {site.owner} · {site.role}
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container about-grid">
          <Reveal>
            <aside className="profile-card">
              <span className="pc-mark"><LogoMark size={64} n="#F7F1E6" /></span>
              <h3>{site.owner}</h3>
              <p>{site.role}</p>
              <div className="pills">
                <span>Grounded</span><span>Gentle</span><span>Evidence-led</span>
              </div>
              <a className="btn btn-honey" href={waLink()} target="_blank" rel="noreferrer">
                <WhatsAppIcon size={18} /> Book on WhatsApp
              </a>
            </aside>
          </Reveal>

          <Reveal delay={120}>
            <span className="eyebrow">My story</span>
            <h2>Hi, I'm Rimsha.</h2>
            <p>
              I'm a clinical dietitian and nutrition coach. I built Naflar because I kept seeing the same
              pattern: people who followed every rule on a meal plan and still felt lost.
            </p>
            <p>
              My work joins evidence-based clinical nutrition with the moderation and routine of the Sunnah,
              so that eating well becomes a path back to purpose, not just a number on a scale.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section tint">
        <div className="container">
          <Reveal className="center">
            <span className="eyebrow">How I work</span>
            <h2>Feed. Balance. Fulfill.</h2>
            <p className="sub">One step for the body, one for daily life, one for purpose.</p>
          </Reveal>
          <div className="grid-3">
            {approach.map((s, i) => (
              <Reveal key={s.t} delay={i * 120}>
                <div className={`step ${s.c}`}>
                  <span className="step-num">0{i + 1}</span>
                  <small>{s.tag}</small>
                  <h3>{s.t}</h3>
                  <p>{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="center">
            <span className="eyebrow">Areas of Focus</span>
            <h2>Where clinical meets purposeful.</h2>
          </Reveal>
          <div className="pills center-pills">
            {areas.map((a) => (
              <span key={a}>{a}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="section cta-wrap">
        <Reveal className="zoom">
          <div className="container cta">
            <h2>Let's find your next clear step.</h2>
            <p>Message us on WhatsApp for programs and availability.</p>
            <a className="btn btn-honey" href={waLink()} target="_blank" rel="noreferrer">
              <WhatsAppIcon size={20} /> {site.phoneDisplay}
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}