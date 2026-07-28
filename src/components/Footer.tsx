import { Link } from 'react-router';
import { MapPin, Mail, Phone } from 'lucide-react';
import Logo from './Logo';
import content from '../data/content.json';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__grid">
          <div>
            <div style={{ marginBottom: 'var(--sp-4)' }}>
              <Logo asLink={false} inverse />
            </div>
            <p className="body-sm" style={{ maxWidth: '34ch', color: 'inherit' }}>
              Ordering platforms, inventory and billing systems, computer vision, and automation
              tooling for businesses across Karnataka.
            </p>
          </div>

          <div>
            <h4>Company</h4>
            <ul className="stack stack--3" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/work">Our Work</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4>Capabilities</h4>
            <ul className="stack stack--3" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {content.services.slice(0, 5).map((service) => (
                <li key={service.num}>
                  <Link to="/services">{service.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4>Get in touch</h4>
            <ul className="stack stack--3" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {content.team.map((member) => (
                <li key={member.name}>
                  <a
                    href={`tel:${member.phone.replace(/\s/g, '')}`}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}
                  >
                    <Phone size={13} aria-hidden="true" />
                    {member.phone}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${content.company.email}`}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}
                >
                  <Mail size={13} aria-hidden="true" />
                  {content.company.email}
                </a>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 'var(--fs-sm)' }}>
                <MapPin size={13} aria-hidden="true" />
                {content.company.city}
              </li>
            </ul>
          </div>
        </div>

        <div className="site-footer__bottom">
          <span>© {year} {content.company.name}. All rights reserved.</span>
          <span>Built in Hubli, Karnataka.</span>
        </div>
      </div>
    </footer>
  );
}
