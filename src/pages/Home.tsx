import { Link } from 'react-router';
import { ArrowRight, Check, Star, ChevronRight } from 'lucide-react';
import Icon from '../components/Icon';
import CTABand from '../components/CTABand';
import content from '../data/content.json';

const AVATAR_TONE = ['', 'avatar--blue', 'avatar--teal', 'avatar--gold'];

export default function Home() {
  const { hero, stats, clients, services, caseStudies, whyUs, testimonials } = content;

  return (
    <>
      {/* ---------------------------------------------------------------- HERO */}
      <section className="hero">
        <div className="hero__bg">
          <img src={hero.image} alt="" aria-hidden="true" loading="eager" />
        </div>
        <div className="hero__scrim" />
        <div className="container">
          <div className="hero__inner">
            <span className="eyebrow eyebrow--on-dark">{hero.eyebrow}</span>
            <h1 className="t-display">
              {hero.titleLine1}
              <br />
              {hero.titleLine2}
              <br />
              {hero.titleLine3}
            </h1>
            <p className="lede lede--on-dark measure" style={{ marginTop: 'var(--sp-6)' }}>
              {hero.description}
            </p>
            <div className="hero__actions">
              <Link to="/services" className="btn btn--primary btn--lg">
                {hero.buttonText}
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
              <Link to="/work" className="btn btn--on-dark btn--lg">See our work</Link>
            </div>
          </div>

          <div className="hero-stats">
            {stats.map((stat) => (
              <div key={stat.label} className="stat">
                <div className="stat__value">{stat.value}</div>
                <div className="stat__label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- CLIENTS */}
      <section className="section section--tight section--subtle">
        <div className="container">
          <p
            className="eyebrow"
            style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: 'var(--sp-6)' }}
          >
            Trusted by businesses across Karnataka
          </p>
          <div className="client-strip">
            {clients.map((client) => (
              <div key={client.name} className="client-tile">
                <span className="client-tile__name">{client.name}</span>
                <span className="client-tile__meta">{client.industry}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ SERVICES */}
      <section className="section">
        <div className="container">
          <div className="section-head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 'var(--sp-6)', flexWrap: 'wrap' }}>
            <div>
              <span className="eyebrow">What we do</span>
              <h2 className="t-h2 measure">Systems for the parts of your business that can't afford errors</h2>
            </div>
            <Link to="/services" className="link-arrow">
              All services <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid--3">
            {services.slice(0, 6).map((service) => (
              <article key={service.num} className="card">
                <span className="icon-badge"><Icon name={service.icon} /></span>
                <h3 className="t-h5">{service.title}</h3>
                <p className="body-sm muted" style={{ marginTop: 'var(--sp-3)' }}>{service.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ OUR WORK */}
      <section className="section section--subtle">
        <div className="container">
          <div
            className="section-head"
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 'var(--sp-6)', flexWrap: 'wrap' }}
          >
            <div>
              <span className="eyebrow">Our work</span>
              <h2 className="t-h2">Live projects, real businesses</h2>
              <p className="lede measure" style={{ marginTop: 'var(--sp-4)' }}>
                Every project below is running in production for an active client — not a concept or a demo.
              </p>
            </div>
            <Link to="/work" className="link-arrow">
              All case studies <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid--3">
            {caseStudies.slice(0, 3).map((cs) => (
              <Link key={cs.slug} to={`/work/${cs.slug}`} className="card card--flush card--link" style={{ color: 'inherit' }}>
                <div className="media media--4x3">
                  <img src={cs.image} alt={`${cs.client} — ${cs.title}`} loading="lazy" />
                </div>
                <div className="card__body">
                  <span className="badge">{cs.tag}</span>
                  <h3 className="t-h5" style={{ marginTop: 'var(--sp-4)' }}>{cs.title}</h3>
                  <p className="body-sm muted" style={{ marginTop: 'var(--sp-3)' }}>{cs.summary}</p>
                  <span className="link-arrow" style={{ marginTop: 'var(--sp-5)' }}>
                    Read case study <ArrowRight size={16} aria-hidden="true" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------- WHY US */}
      <section className="section">
        <div className="container grid grid--split">
          <div>
            <span className="eyebrow">Why Shakti Softwares</span>
            <h2 className="t-h2">{whyUs.title}</h2>
            <p className="lede measure" style={{ marginTop: 'var(--sp-4)' }}>{whyUs.description}</p>
            <ul className="checklist" style={{ marginTop: 'var(--sp-8)' }}>
              {whyUs.checklist.map((item) => (
                <li key={item}>
                  <Check size={17} aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Link to="/about" className="btn btn--secondary" style={{ marginTop: 'var(--sp-8)' }}>
              More about us
              <ChevronRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <div className="media media--4x3">
            <img src={whyUs.image} alt="Engineers working on client systems" loading="lazy" />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ DIFFERENTIATORS */}
      <section className="section section--inverse">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow eyebrow--on-dark">How we work</span>
            <h2 className="t-h2">Four things every client gets</h2>
          </div>
          <div className="grid grid--4">
            {whyUs.cards.map((card) => (
              <article key={card.title} className="card card--inverse">
                <span className="icon-badge icon-badge--inverse"><Icon name={card.icon} /></span>
                <h3 className="t-h5">{card.title}</h3>
                <p className="body-sm on-dark-muted" style={{ marginTop: 'var(--sp-3)' }}>{card.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- TESTIMONIALS */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Client stories</span>
            <h2 className="t-h2">What our clients say</h2>
          </div>
          <div className="grid grid--2">
            {testimonials.map((t, i) => (
              <blockquote key={t.name} className="card quote-card" style={{ margin: 0 }}>
                <div className="quote-card__stars" aria-label="5 out of 5">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} size={14} fill="currentColor" strokeWidth={0} aria-hidden="true" />
                  ))}
                </div>
                <p className="quote-card__text">“{t.quote}”</p>
                <footer className="quote-card__author">
                  <span className={`avatar ${AVATAR_TONE[i % AVATAR_TONE.length]}`} aria-hidden="true">
                    {t.initials}
                  </span>
                  <span>
                    <span style={{ display: 'block', fontWeight: 700, color: 'var(--text-strong)', fontSize: 'var(--fs-sm)' }}>
                      {t.name}
                    </span>
                    <span className="body-sm muted">{t.role}</span>
                  </span>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
