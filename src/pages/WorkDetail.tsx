import { Link, useParams, Navigate } from 'react-router';
import { Check, ArrowRight, ArrowLeft } from 'lucide-react';
import PageHero from '../components/PageHero';
import CTABand from '../components/CTABand';
import content from '../data/content.json';

export default function WorkDetail() {
  const { slug } = useParams();
  const study = content.caseStudies.find((cs) => cs.slug === slug);

  if (!study) return <Navigate to="/work" replace />;

  const others = content.caseStudies.filter((cs) => cs.slug !== slug).slice(0, 2);

  return (
    <>
      <PageHero
        eyebrow={study.tag}
        title={study.title}
        lede={study.summary}
        image={study.heroImage}
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Our Work', to: '/work' }, { label: study.client }]}
      />

      {/* -------------------------------------------------------- AT A GLANCE */}
      <section className="section section--tight section--subtle">
        <div className="container grid grid--3">
          <div>
            <span className="eyebrow">Client</span>
            <p className="t-h5">{study.client}</p>
          </div>
          <div>
            <span className="eyebrow">Sector</span>
            <p className="t-h5">{study.tag}</p>
          </div>
          <div>
            <span className="eyebrow">Services</span>
            <div className="cluster">
              {study.services.map((service) => (
                <span key={service} className="badge badge--plain">{service}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ CHALLENGE + SOLUTION */}
      <section className="section">
        <div className="container grid grid--split" style={{ alignItems: 'start' }}>
          <div className="stack stack--4">
            <span className="eyebrow">The challenge</span>
            <h2 className="t-h3 measure">Where the process was breaking down</h2>
            <p className="body-sm" style={{ marginTop: 'var(--sp-2)' }}>{study.challenge}</p>
          </div>
          <div className="media media--4x3">
            <img src={study.image} alt={`${study.client} operations`} loading="lazy" />
          </div>
        </div>
      </section>

      <section className="section section--inverse">
        <div className="container grid grid--split" style={{ alignItems: 'start' }}>
          <div className="stack stack--4">
            <span className="eyebrow eyebrow--on-dark">What we built</span>
            <h2 className="t-h3 measure">The solution</h2>
            <p className="body-sm on-dark-muted" style={{ marginTop: 'var(--sp-2)' }}>{study.solution}</p>
            <div className="cluster" style={{ marginTop: 'var(--sp-4)' }}>
              {study.tech.map((tech) => (
                <span
                  key={tech}
                  className="badge"
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    borderColor: 'rgba(255,255,255,0.2)',
                    color: 'var(--c-blue-200)',
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
          <div>
            <span className="eyebrow eyebrow--on-dark">Results</span>
            <ul className="checklist checklist--on-dark" style={{ marginTop: 'var(--sp-4)' }}>
              {study.outcomes.map((outcome) => (
                <li key={outcome}>
                  <Check size={17} aria-hidden="true" />
                  <span>{outcome}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- MORE WORK */}
      <section className="section">
        <div className="container">
          <div className="section-head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 'var(--sp-6)', flexWrap: 'wrap' }}>
            <div>
              <span className="eyebrow">More work</span>
              <h2 className="t-h3">Other projects</h2>
            </div>
            <Link to="/work" className="link-arrow">
              <ArrowLeft size={16} aria-hidden="true" /> Back to all work
            </Link>
          </div>
          <div className="grid grid--2">
            {others.map((cs) => (
              <Link key={cs.slug} to={`/work/${cs.slug}`} className="card card--flush card--link" style={{ color: 'inherit' }}>
                <div className="media media--16x9">
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

      <CTABand />
    </>
  );
}
