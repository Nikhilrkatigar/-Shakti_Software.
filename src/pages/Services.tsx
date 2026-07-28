import { Link } from 'react-router';
import { Check, ArrowRight } from 'lucide-react';
import PageHero from '../components/PageHero';
import CTABand from '../components/CTABand';
import Icon from '../components/Icon';
import content from '../data/content.json';

export default function Services() {
  const { pages, services, process: steps, techStack, caseStudies } = content;

  return (
    <>
      <PageHero
        eyebrow="Services"
        title={pages.services.title}
        lede={pages.services.lede}
        image={pages.services.image}
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Services' }]}
      />

      {/* ------------------------------------------------------ SERVICES GRID */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Capabilities</span>
            <h2 className="t-h2 measure">What we build, and what we look after once it is live</h2>
          </div>

          <div className="grid grid--3">
            {services.map((service) => (
              <article key={service.num} className="card">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span className="icon-badge" style={{ marginBottom: 0 }}><Icon name={service.icon} /></span>
                  <span className="body-sm muted" style={{ fontFamily: 'var(--font-mono)' }}>{service.num}</span>
                </div>
                <h3 className="t-h5" style={{ marginTop: 'var(--sp-5)' }}>{service.title}</h3>
                <p className="body-sm muted" style={{ marginTop: 'var(--sp-3)' }}>{service.desc}</p>
                <hr className="rule" style={{ marginBlock: 'var(--sp-5)' }} />
                <ul className="checklist">
                  {service.points.map((point) => (
                    <li key={point}>
                      <Check size={15} aria-hidden="true" />
                      <span className="muted">{point}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- PROCESS */}
      <section className="section section--subtle">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Our process</span>
            <h2 className="t-h2">A clear path from idea to launch</h2>
            <p className="lede measure">
              Five stages on every engagement, so you always know what happens next and what it costs.
            </p>
          </div>
          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))' }}>
            {steps.map((step) => (
              <article key={step.num}>
                <span className="numbered-list__num" aria-hidden="true">{step.num}</span>
                <h3 className="t-h5" style={{ marginTop: 'var(--sp-4)' }}>{step.title}</h3>
                <p className="body-sm muted" style={{ marginTop: 'var(--sp-2)' }}>{step.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------- TECHSTACK */}
      <section className="section">
        <div className="container grid grid--split" style={{ alignItems: 'start' }}>
          <div>
            <span className="eyebrow">Tech we use</span>
            <h2 className="t-h2 measure">Modern stack, battle-tested tools</h2>
            <p className="lede measure" style={{ marginTop: 'var(--sp-4)' }}>
              We pick tools for how long the system has to keep running, not for how new they are. Every
              client owns their source code and their data.
            </p>
            <Link to="/work" className="btn btn--secondary" style={{ marginTop: 'var(--sp-6)' }}>
              See it in production
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <div className="cluster">
            {techStack.map((tech) => (
              <span key={tech} className="badge badge--plain">{tech}</span>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- RELATED WORK */}
      <section className="section section--subtle">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Applied</span>
            <h2 className="t-h2">These services, running for real clients</h2>
          </div>
          <div className="grid grid--3">
            {caseStudies.slice(0, 3).map((cs) => (
              <Link key={cs.slug} to={`/work/${cs.slug}`} className="card card--flush card--link" style={{ color: 'inherit' }}>
                <div className="media media--16x9">
                  <img src={cs.image} alt={`${cs.client} — ${cs.title}`} loading="lazy" />
                </div>
                <div className="card__body">
                  <span className="badge">{cs.tag}</span>
                  <h3 className="t-h5" style={{ marginTop: 'var(--sp-4)' }}>{cs.client}</h3>
                  <p className="body-sm muted" style={{ marginTop: 'var(--sp-2)' }}>{cs.summary}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
