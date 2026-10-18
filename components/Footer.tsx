import Link from "next/link";
import Logo from "./Logo";
import Year from "./Year";
import { InstagramIcon, MailIcon, WhatsAppIcon } from "./Icons";
import { site, telLink, waLink } from "../lib/site";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <Logo light />
          <p className="footer-tag">{site.tagline}</p>
        </div>
        <div className="footer-col">
          <h4>Explore</h4>
          <Link href="/about">About</Link>
          <Link href="/method">The Method</Link>
          <Link href="/programs">Programs</Link>
          <Link href="/contact">Contact</Link>
        </div>
        <div className="footer-col">
          <h4>Get in touch</h4>
          {site.phones.map((p) => (
            <span className="foot-phone" key={p.intl}>
              <WhatsAppIcon size={18} /> {p.display}
              <a href={waLink(undefined, p.intl)} target="_blank" rel="noreferrer">WhatsApp</a>
              <a href={telLink(p.intl)}>Call</a>
            </span>
          ))}
          <a className="foot-link" href={`mailto:${site.email}`}>
            <MailIcon size={18} /> {site.email}
          </a>
          <a className="foot-link" href={site.instagram} target="_blank" rel="noreferrer">
            <InstagramIcon size={18} /> Instagram
          </a>
        </div>
      </div>
      <div className="container footer-bottom">
        © <Year /> {site.name}. All rights reserved.
          <span style={{ float: "right", opacity: .55, fontSize: ".8rem" }}>
           <a href="/owner/login">Owner</a>
         </span>
      </div>
    </footer>
  );
}