import Reveal from "../../components/Reveal";
import ContactForm from "../../components/ContactForm";
import { InstagramIcon, MailIcon, PhoneIcon, WhatsAppIcon } from "../../components/Icons";
import { site, telLink, waLink } from "../../lib/site";

export const metadata = { title: "Contact — Naflar Health Care" };

export default function Contact() {
  return (
    <>
      <section className="page-head">
        <div className="container">
          <span className="eyebrow rise">Contact</span>
          <h1 className="rise" style={{ animationDelay: "100ms" }}>Ready to start?</h1>
          <p className="lead rise" style={{ animationDelay: "200ms" }}>
            Message or call Naflar Health Care to book your spot. One clear next step.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container split top">
          <Reveal>
            <ContactForm />
          </Reveal>
          <Reveal delay={120}>
            <div className="contact-list">
              {site.phones.map((p, i) => (
                <div className="card contact-card" key={p.intl}>
                  <small className="tag">{i === 0 ? "Main line" : "Second line"}</small>
                  <h3>{p.display}</h3>
                  <div className="contact-actions">
                    <a className="btn btn-primary" href={waLink(undefined, p.intl)} target="_blank" rel="noreferrer">
                      <WhatsAppIcon size={18} /> WhatsApp
                    </a>
                    <a className="btn btn-ghost" href={telLink(p.intl)}>
                      <PhoneIcon size={18} /> Call
                    </a>
                  </div>
                </div>
              ))}
              <a className="card contact-card" href={`mailto:${site.email}`}>
                <small className="tag">Email</small>
                <h3><MailIcon size={22} /> {site.email}</h3>
                <p>For questions and collaborations.</p>
              </a>
              <a className="card contact-card" href={site.instagram} target="_blank" rel="noreferrer">
                <small className="tag">Follow</small>
                <h3><InstagramIcon size={22} /> Instagram</h3>
                <p>Daily tips on Feed · Balance · Fulfill.</p>
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}