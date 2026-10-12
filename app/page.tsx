import Link from "next/link";
import Reveal from "../components/Reveal";
import Hero from "../components/Hero";
import Counter from "../components/Counter";
import Testimonial from "../components/Testimonial";
import { WhatsAppIcon } from "../components/Icons";
import { site, waLink } from "../lib/site";

const steps = [
  { t: "Feed", tag: "Physical", d: "Assess labs, symptoms and eating patterns. Feed the body what it clinically needs, not a generic template.", c: "pom" },
  { t: "Balance", tag: "Mental & lifestyle", d: "Simple, repeatable rhythms around eating, sleep and moderation, inspired by the Sunnah.", c: "sage" },
  { t: "Fulfill", tag: "Spiritual", d: "Connect nourishment to your bigger purpose: why caring for your body matters to what you're here to do.", c: "honey" },
];

const areas = [
  "Clinical Nutrition Counseling",
  "Sunnah-Inspired Lifestyle Coaching",
  "Purposeful Meal Planning",
  "Mindful Eating Workshops",
];

export default function Home() {
  return (
    <>
      <Hero />

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i}>Feed · Balance · Fulfill ·&nbsp;</span>
          ))}
        </div>
      </div>

    <section className="stats">
  <div className="container stats-grid">
    <Reveal>
      <div className="stat"><b>1:1</b><span>Personalised care</span></div>
    </Reveal>
    <Reveal delay={120}>
      <div className="stat"><b><Counter to={3} /></b><span>Step method</span></div>
    </Reveal>
    <Reveal delay={240}>
      <div className="stat"><b><Counter to={6} /></b><span>Week signature program</span></div>
    </Reveal>
  </div>
</section>

      <section className="section">
        <div className="container split">
          <Reveal>
            <span className="eyebrow">The Gap</span>
            <h2>Nourishment without direction isn't nourishment.</h2>
          </Reveal>
          <Reveal delay={120}>
            <p>
              Most nutrition advice feeds the body and ignores everything else. People follow every rule on a
              meal plan and still feel lost, because no one ever connected what they eat to why they're here.
            </p>
            <p>
              Naflar exists to close that gap: evidence-based clinical nutrition, joined with Sunnah-inspired
              principles of moderation and routine, so that eating well becomes a path back to purpose, not
              just a number on a scale.
            </p>
            <Link className="link" href="/about">Meet {site.owner} →</Link>
          </Reveal>
        </div>
      </section>

      <section className="section tint">
        <div className="container">
          <Reveal className="center">
            <span className="eyebrow">The Method</span>
            <h2>Feed. Balance. Fulfill.</h2>
            <p className="sub">One step for the body, one for daily life, one for purpose.</p>
          </Reveal>
          <div className="grid-3">
            {steps.map((s, i) => (
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
          <Reveal className="center mt">
            <Link className="btn btn-ghost" href="/method">Explore the method</Link>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="center">
            <span className="eyebrow">Areas of Focus</span>
            <h2>Where clinical meets purposeful.</h2>
          </Reveal>
          <div className="grid-4">
            {areas.map((a, i) => (
              <Reveal key={a} delay={i * 90}>
                <div className="card area">
                  <span className="dot" />
                  <h3>{a}</h3>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Testimonial />

      <section className="section cta-wrap">
        <Reveal className="zoom">
          <div className="container cta">
            <h2>Because your body was designed for a bigger purpose.</h2>
            <p>Message us on WhatsApp for programs, pricing and availability.</p>
            <a className="btn btn-honey" href={waLink()} target="_blank" rel="noreferrer">
              <WhatsAppIcon size={20} /> {site.phoneDisplay}
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}