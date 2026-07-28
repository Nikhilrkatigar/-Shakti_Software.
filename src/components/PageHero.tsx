import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { ChevronRight } from 'lucide-react';

interface Crumb {
  label: string;
  to?: string;
}

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  lede?: string;
  image?: string;
  crumbs?: Crumb[];
  children?: ReactNode;
}

export default function PageHero({ eyebrow, title, lede, image, crumbs, children }: PageHeroProps) {
  return (
    <section className="page-hero">
      {image && (
        <div className="page-hero__bg">
          <img src={image} alt="" aria-hidden="true" loading="eager" />
        </div>
      )}
      <div className="page-hero__scrim" />
      <div className="container page-hero__inner">
        {crumbs && crumbs.length > 0 && (
          <nav className="breadcrumb" aria-label="Breadcrumb">
            {crumbs.map((crumb, i) => (
              <span key={crumb.label} style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                {crumb.to ? <Link to={crumb.to}>{crumb.label}</Link> : <span>{crumb.label}</span>}
                {i < crumbs.length - 1 && <ChevronRight size={13} aria-hidden="true" />}
              </span>
            ))}
          </nav>
        )}
        {eyebrow && <span className="eyebrow eyebrow--on-dark">{eyebrow}</span>}
        <h1 className="t-h1">{title}</h1>
        {lede && <p className="lede lede--on-dark measure" style={{ marginTop: 'var(--sp-5)' }}>{lede}</p>}
        {children}
      </div>
    </section>
  );
}
