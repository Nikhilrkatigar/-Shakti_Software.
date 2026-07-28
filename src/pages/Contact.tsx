import { Phone, Mail, MapPin, Clock, Check, MessageCircle } from 'lucide-react';
import PageHero from '../components/PageHero';
import content from '../data/content.json';

const WHAT_TO_INCLUDE = [
  'What the process looks like today — who does what, and with which tools',
  'Where it slows down, or where mistakes tend to creep in',
  'Roughly how many orders, files, or locations are involved',
  'Any timeline or budget you already have in mind',
];

export default function Contact() {
  const mailto = `mailto:${content.company.email}?subject=${encodeURIComponent('Project enquiry')}`;

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={content.pages.contact.title}
        lede={content.pages.contact.lede}
        image={content.pages.contact.image}
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Contact' }]}
      />

      <section className="section">
        <div className="container grid grid--split" style={{ alignItems: 'start' }}>
          {/* ------------------------------------------------- HOW TO REACH US */}
          <div>
            <span className="eyebrow">Get in touch</span>
            <h2 className="t-h3">Call us, or send us an email</h2>
            <p className="lede measure" style={{ marginTop: 'var(--sp-4)', fontSize: 'var(--fs-base)' }}>
              We're a small team, so there's no contact form to disappear into — you reach one of us
              directly. Call any of the numbers here during working hours, or email us and we'll come
              back within one working day.
            </p>

            <div className="cluster" style={{ marginTop: 'var(--sp-8)' }}>
              <a href={mailto} className="btn btn--primary btn--lg">
                <Mail size={17} aria-hidden="true" />
                Email us
              </a>
              <a
                href={`tel:${content.company.phonePrimary.replace(/\s/g, '')}`}
                className="btn btn--secondary btn--lg"
              >
                <Phone size={17} aria-hidden="true" />
                {content.company.phonePrimary}
              </a>
            </div>

            <hr className="rule" style={{ marginBlock: 'var(--sp-10)' }} />

            <h3 className="t-h5">Helpful things to include</h3>
            <p className="body-sm muted" style={{ marginTop: 'var(--sp-2)' }}>
              The more of this you can tell us up front, the more useful our first reply will be.
            </p>
            <ul className="checklist" style={{ marginTop: 'var(--sp-5)' }}>
              {WHAT_TO_INCLUDE.map((item) => (
                <li key={item}>
                  <Check size={17} aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* ------------------------------------------------------- CONTACTS */}
          <aside className="stack stack--4">
            <div className="card" style={{ background: 'var(--bg-subtle)' }}>
              <h3 className="t-h5">Office</h3>
              <ul className="stack stack--3" style={{ listStyle: 'none', margin: 'var(--sp-4) 0 0', padding: 0 }}>
                <li style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 'var(--fs-sm)' }}>
                  <MapPin size={16} aria-hidden="true" style={{ color: 'var(--accent)', marginTop: 3 }} />
                  {content.company.city}
                </li>
                <li style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 'var(--fs-sm)' }}>
                  <Mail size={16} aria-hidden="true" style={{ color: 'var(--accent)', marginTop: 3 }} />
                  <a href={mailto}>{content.company.email}</a>
                </li>
                <li style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 'var(--fs-sm)' }}>
                  <Clock size={16} aria-hidden="true" style={{ color: 'var(--accent)', marginTop: 3 }} />
                  Mon–Sat, 9:30am – 7:00pm IST
                </li>
                <li style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 'var(--fs-sm)' }}>
                  <MessageCircle size={16} aria-hidden="true" style={{ color: 'var(--accent)', marginTop: 3 }} />
                  Also reachable on WhatsApp
                </li>
              </ul>
            </div>

            <div className="stack stack--3">
              <span className="eyebrow" style={{ marginBottom: 0 }}>Speak to us directly</span>
              {content.team.map((member) => (
                <div key={member.name} className="contact-card">
                  <span className="contact-card__role">{member.role}</span>
                  <span style={{ fontWeight: 700, color: 'var(--text-strong)' }}>{member.name}</span>
                  <a
                    href={`tel:${member.phone.replace(/\s/g, '')}`}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 8,
                      fontWeight: 600,
                      fontSize: 'var(--fs-sm)',
                      marginTop: 4,
                    }}
                  >
                    <Phone size={14} aria-hidden="true" />
                    {member.phone}
                  </a>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
