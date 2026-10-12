import Reveal from "../../components/Reveal";
import { WhatsAppIcon } from "../../components/Icons";
import { site, waLink } from "../../lib/site";

export const metadata = { title: "Programs — Naflar Health Care" };

const programs = [
  {
    name: "Program 1 — Feed Reset", len: "2 weeks",
    best: "First-time clients who want to try before committing longer.",
    items: ["Full nutrition assessment", "1 follow-up session (after 2 weeks)", "1 personalised meal plan", "WhatsApp check-in support between sessions"],
  },
  {
    name: "Program 2 — The Naflar Method", len: "Signature program · 6 weeks", featured: true,
    best: "Anyone working on everyday habits, routine, and a healthier relationship with food.",
    items: ["Full assessment + personalised meal plan", "Follow-up session every 2 weeks (week 2, 4, 6)", "Food & mood journal for the full program", "Final progress report with next-step recommendations"],
  },
  {
    name: "Program 3 — Deep Transformation", len: "12 weeks",
    best: "Weight management, PCOS, diabetes, or any condition needing sustained, monitored care.",
    items: ["Full assessment plus the relevant condition-specific addendum", "Follow-up every 2 weeks (week 2, 4, 6, 8, 10, 12)", "Meal plan refreshed 3 times across the program", "Mid-program reassessment at week 6", "Final report and a maintenance plan to keep results"],
  },
];

const more = [
  ["Small Group Cohort", "Same method, delivered live to a small group.", "Coming soon"],
  ["Digital Guide / Workbook", "The Feed → Balance → Fulfill method, at your own pace.", "Coming soon"],
  ["Corporate & Community Workshops", "Talks for companies, schools and gyms.", "On request"],
];

export default function Programs() {
  return (
    <>
      <section className="page-head">
        <div className="container">
          <span className="eyebrow rise">Programs</span>
          <h1 className="rise" style={{ animationDelay: "100ms" }}>Choose the path that fits where you are today.</h1>
          <div className="pill-price rise" style={{ animationDelay: "200ms" }}>
            Contact us on WhatsApp for further details
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container price-grid">
          {programs.map((p, i) => (
            <Reveal key={p.name} delay={i * 110}>
              <div className={`price ${p.featured ? "featured" : ""}`}>
                {p.featured && <span className="badge">Signature</span>}
                <h3>{p.name}</h3>
                <span className="len">{p.len}</span>
                <p className="best"><strong>Best for:</strong> {p.best}</p>
                <ul>{p.items.map((it) => <li key={it}>{it}</li>)}</ul>
                <a
                  className={`btn ${p.featured ? "btn-honey" : "btn-primary"}`}
                  href={waLink(`Assalamu alaikum! I'd like details about ${p.name}.`)}
                  target="_blank" rel="noreferrer"
                >
                  <WhatsAppIcon size={18} /> Get details on WhatsApp
                </a>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="center mt">
          <p className="sub">Not sure which one fits? Message us first. We'll assess together and recommend the right path.</p>
        </Reveal>
      </section>

      <section className="section tint">
        <div className="container">
          <Reveal className="center">
            <span className="eyebrow">More ways to work together</span>
            <h2>Growing with you</h2>
          </Reveal>
          <div className="grid-3">
            {more.map(([t, d, tag], i) => (
              <Reveal key={t} delay={i * 100}>
                <div className="card">
                  <small className="tag">{tag}</small>
                  <h3>{t}</h3>
                  <p>{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section cta-wrap">
        <Reveal className="zoom">
          <div className="container cta">
            <h2>Want pricing and availability?</h2>
            <p>Message us on WhatsApp and we'll reply with everything you need.</p>
            <a className="btn btn-honey" href={waLink()} target="_blank" rel="noreferrer">
              <WhatsAppIcon size={20} /> {site.phoneDisplay}
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}