import { Link } from 'react-router';
import { ArrowRight, Check } from 'lucide-react';
import PageHero from '../components/PageHero';
import CTABand from '../components/CTABand';
import content from '../data/content.json';

export default function Work() {
  const { pages, caseStudies, clients } = content;

  return (
    <>
      <PageHero
        eyebrow="Our work"
        title={pages.work.title}
        lede={pages.work.lede}
        image={pages.work.image}
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Our Work' }]}
      />

      {/* ------------------------------------------------------- CLIENT STRIP */}
      <section className="section section--tight section--subtle">
        <div className="container">
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

      {/* -------------------------------------------------------- CASE STUDIES */}
      <section className="section">
        <div className="container stack" style={{ gap: 'clamp(40px, 6vw, 80px)' }}>
          {caseStudies.map((cs, i) => (
            <article key={cs.slug} className="grid grid--split">
              <div className="media media--4x3" style={{ order: i % 2 === 0 ? 1 : 2 }}>
                <img src={cs.image} alt={`${cs.client} — ${cs.title}`} loading="lazy" />
              </div>
              <div style={{ order: i % 2 === 0 ? 2 : 1 }}>
                <span className="badge">{cs.tag}</span>
                <h2 className="t-h3" style={{ marginTop: 'var(--sp-4)' }}>{cs.title}</h2>
                <p className="body-sm" style={{ marginTop: 6, fontWeight: 600, color: 'var(--text-muted)' }}>
                  {cs.client}
                </p>
                <p className="lede measure" style={{ marginTop: 'var(--sp-4)', fontSize: 'var(--fs-base)' }}>
                  {cs.summary}
                </p>
                <ul className="checklist" style={{ marginTop: 'var(--sp-5)' }}>
                  {cs.outcomes.slice(0, 3).map((outcome) => (
                    <li key={outcome}>
                      <Check size={16} aria-hidden="true" />
                      <span className="muted">{outcome}</span>
                    </li>
                  ))}
                </ul>
                <div className="cluster" style={{ marginTop: 'var(--sp-5)' }}>
                  {cs.tech.map((tech) => (
                    <span key={tech} className="badge badge--plain">{tech}</span>
                  ))}
                </div>
                <Link to={`/work/${cs.slug}`} className="btn btn--secondary" style={{ marginTop: 'var(--sp-6)' }}>
                  Read the full case study
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <CTABand
        title="Your operation is different. That's the point."
        text="Tell us where the manual work is piling up and we'll tell you honestly whether software is the right fix."
      />
    </>
  );
}
