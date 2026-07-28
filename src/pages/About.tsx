import { Phone } from 'lucide-react';
import PageHero from '../components/PageHero';
import CTABand from '../components/CTABand';
import Icon from '../components/Icon';
import content from '../data/content.json';

const AVATAR_TONE = ['', 'avatar--blue', 'avatar--teal'];

const initials = (name: string) =>
  name.split(' ').map((part) => part[0]).join('').toUpperCase();

export default function About() {
  const { pages, values, team, stats, process: steps, whyUs } = content;

  return (
    <>
      <PageHero
        eyebrow="About us"
        title={pages.about.title}
        lede={pages.about.lede}
        image={pages.about.image}
        crumbs={[{ label: 'Home', to: '/' }, { label: 'About' }]}
      />

      {/* --------------------------------------------------------------- STORY */}
      <section className="section">
        <div className="container grid grid--split">
          <div className="stack stack--6">
            <span className="eyebrow">Who we are</span>
            {pages.about.story.map((para, i) => (
              <p key={i} className={i === 0 ? 'lede' : 'body-sm'} style={{ color: i === 0 ? 'var(--text-body)' : undefined }}>
                {para}
              </p>
            ))}
          </div>
          <div className="media media--4x3">
            <img src={whyUs.image} alt="The Shakti Softwares team at work" loading="lazy" />
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------- STATS */}
      <section className="section section--tight section--inverse">
        <div className="container">
          <div className="grid grid--4">
            {stats.map((stat) => (
              <div key={stat.label} className="stat">
                <div className="stat__value">{stat.value}</div>
                <div className="stat__label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------- VALUES */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">What we stand for</span>
            <h2 className="t-h2">Principles we build by</h2>
          </div>
          <div className="grid grid--4">
            {values.map((value) => (
              <article key={value.title} className="card">
                <span className="icon-badge"><Icon name={value.icon} /></span>
                <h3 className="t-h5">{value.title}</h3>
                <p className="body-sm muted" style={{ marginTop: 'var(--sp-3)' }}>{value.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- PROCESS */}
      <section className="section section--subtle">
        <div className="container grid grid--split" style={{ alignItems: 'start' }}>
          <div>
            <span className="eyebrow">How we engage</span>
            <h2 className="t-h2 measure">From first conversation to a system in daily use</h2>
            <p className="lede measure" style={{ marginTop: 'var(--sp-4)' }}>
              The same five stages on every engagement, so you always know what happens next and what
              it costs.
            </p>
          </div>
          <ol className="numbered-list" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {steps.map((step) => (
              <li key={step.num} className="numbered-list__item">
                <span className="numbered-list__num" aria-hidden="true">{step.num}</span>
                <div>
                  <h3 className="t-h5">{step.title}</h3>
                  <p className="body-sm muted" style={{ marginTop: 6 }}>{step.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------------------------------------------------------------- TEAM */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">The team</span>
            <h2 className="t-h2">The people building your software</h2>
            <p className="lede measure">
              A small, hands-on team. When you call, you talk to the person who wrote the code.
            </p>
          </div>
          <div className="grid grid--3">
            {team.map((member, i) => (
              <article key={member.name} className="card">
                <span className={`avatar ${AVATAR_TONE[i % AVATAR_TONE.length]}`} style={{ width: 54, height: 54, fontSize: '0.95rem' }} aria-hidden="true">
                  {initials(member.name)}
                </span>
                <h3 className="t-h5" style={{ marginTop: 'var(--sp-5)' }}>{member.name}</h3>
                <p className="contact-card__role" style={{ marginTop: 4 }}>{member.role}</p>
                <p className="body-sm muted" style={{ marginTop: 'var(--sp-4)', flex: 1 }}>{member.bio}</p>
                <a
                  href={`tel:${member.phone.replace(/\s/g, '')}`}
                  className="link-arrow"
                  style={{ marginTop: 'var(--sp-5)' }}
                >
                  <Phone size={15} aria-hidden="true" />
                  {member.phone}
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        title="Want to talk through your operation?"
        text="No sales pitch — just a conversation about what you run today and whether software would actually help."
      />
    </>
  );
}
