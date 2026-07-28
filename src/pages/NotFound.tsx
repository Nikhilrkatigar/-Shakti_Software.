import { Link } from 'react-router';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <section className="section">
      <div className="container stack stack--4" style={{ maxWidth: 560, textAlign: 'center', paddingBlock: 'var(--sp-16)' }}>
        <span className="eyebrow" style={{ textAlign: 'center' }}>Error 404</span>
        <h1 className="t-h1">This page doesn't exist</h1>
        <p className="lede">
          The link may be out of date. Try starting again from the homepage, or take a look at our work.
        </p>
        <div className="cluster" style={{ justifyContent: 'center', marginTop: 'var(--sp-4)' }}>
          <Link to="/" className="btn btn--primary">
            <ArrowLeft size={16} aria-hidden="true" />
            Back to home
          </Link>
          <Link to="/work" className="btn btn--secondary">See our work</Link>
        </div>
      </div>
    </section>
  );
}
