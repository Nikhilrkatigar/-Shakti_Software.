import { Link } from 'react-router';
import { Phone } from 'lucide-react';
import content from '../data/content.json';

interface CTABandProps {
  title?: string;
  text?: string;
}

export default function CTABand({
  title = 'Have a process that software should be handling?',
  text = 'Tell us how your operation runs today. We will come back with a clear scope, timeline, and price — usually within one working day.',
}: CTABandProps) {
  const tel = content.company.phonePrimary.replace(/\s/g, '');

  return (
    <section className="cta-band">
      <div className="container cta-band__inner">
        <div>
          <h2 className="t-h2 measure">{title}</h2>
          <p className="lede lede--on-dark measure" style={{ marginTop: 'var(--sp-4)' }}>{text}</p>
        </div>
        <div className="cluster" style={{ flexShrink: 0 }}>
          <Link to="/contact" className="btn btn--white btn--lg">Start a conversation</Link>
          <a href={`tel:${tel}`} className="btn btn--on-dark btn--lg">
            <Phone size={16} aria-hidden="true" />
            {content.company.phonePrimary}
          </a>
        </div>
      </div>
    </section>
  );
}
