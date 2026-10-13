import Link from "next/link";
import Reveal from "../components/Reveal";
import Hero from "../components/Hero";
import Testimonial from "../components/Testimonial";
import { LogoMark } from "../components/Logo";
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

      <section className="section story-sec">
        <div className="container">
          <Reveal className="zoom">
            <div className="story-card">
              <span className="sc-quote" aria-hidden="true">“</span>
              <span className="sc-eyebrow">Our Story</span>

              <p className="sc-text">
                True health is more than just what’s on your plate—it’s{" "}
                <span className="hl">the harmony of mind, body, and soul.</span> After immersing myself in
                human nutrition and dietetics, I’ve witnessed people nourish their bodies yet neglect their
                sense of purpose. That’s why I founded Naflar Health Care: to connect clinical science with
                the fulfillment of a <span className="hl">purpose-driven life.</span>
              </p>

              <div className="sc-foot">
                <div className="sc-who">
                  <span className="sc-avatar"><LogoMark size={40} n="#F7F1E6" /></span>
                  <div>
                    <b>{site.owner}</b>
                    <small>Founder</small>
                  </div>
                </div>
                <Link className="btn btn-honey" href="/about">Meet {site.owner} →</Link>
              </div>
            </div>
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