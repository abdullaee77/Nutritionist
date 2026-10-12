import Reveal from "../../components/Reveal";
import { waLink } from "../../lib/site";

export const metadata = { title: "The Method — Naflar Health Care" };

const steps = [
  {
    t: "Feed", tag: "Physical — Clinical Nutrition", c: "pom",
    d: "Assess labs, symptoms, and current eating patterns. Feed the body what it clinically needs, not a generic template.",
    q: "I finally understand what my body actually needs.",
  },
  {
    t: "Balance", tag: "Mental & Lifestyle — Sunnah-Inspired Routine", c: "sage",
    d: "Simple, repeatable rhythms around eating, sleep, and moderation. Break the all-or-nothing and stressed-eating cycle.",
    q: "Eating well finally feels sustainable, not restrictive.",
  },
  {
    t: "Fulfill", tag: "Spiritual — Purpose", c: "honey",
    d: "Reflective work connecting nourishment to your bigger purpose: why caring for the body matters to what you're here to do.",
    q: "This finally connects to something bigger than my weight.",
  },
];

export default function Method() {
  return (
    <>
      <section className="page-head">
        <div className="container">
          <span className="eyebrow rise">The Method</span>
          <h1 className="rise" style={{ animationDelay: "100ms" }}>Feed. Balance. Fulfill.</h1>
          <p className="lead rise" style={{ animationDelay: "200ms" }}>
            A three-step method built directly from the Naflar name: one step for the body, one for daily
            life, one for purpose.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container timeline">
          {steps.map((s, i) => (
            <Reveal key={s.t} delay={80}>
              <div className={`tl-item ${s.c}`}>
                <div className="tl-num">0{i + 1}</div>
                <div className="tl-body">
                  <small>{s.tag}</small>
                  <h2>{s.t}</h2>
                  <p>{s.d}</p>
                  <blockquote>“{s.q}”</blockquote>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section tint">
        <div className="container">
          <Reveal className="center">
            <span className="eyebrow">Areas of Focus</span>
            <h2>Where clinical meets purposeful.</h2>
          </Reveal>
          <div className="pills center-pills">
            {["Clinical Nutrition Counseling", "Sunnah-Inspired Lifestyle Coaching", "Purposeful Meal Planning", "Mindful Eating Workshops"].map((a) => (
              <span key={a}>{a}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="section cta-wrap">
        <Reveal>
          <div className="container cta">
            <h2>Ready to try the method?</h2>
            <a className="btn btn-honey" href={waLink()} target="_blank" rel="noreferrer">Book a consultation</a>
          </div>
        </Reveal>
      </section>
    </>
  );
}