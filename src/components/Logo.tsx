import { useState } from 'react';
import { Link } from 'react-router';
import content from '../data/content.json';

/** Logo mark. Falls back to a lettermark tile if the icon file is missing. */
function LogoMark() {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return <span className="logo__mark" aria-hidden="true">S</span>;
  }

  return (
    <img
      src="/app_icon.ico"
      alt=""
      aria-hidden="true"
      className="logo__mark logo__mark--img"
      onError={() => setFailed(true)}
    />
  );
}

interface LogoProps {
  onNavigate?: () => void;
  /** Renders the wordmark in white, for use on dark backgrounds. */
  inverse?: boolean;
  /** Renders a static mark (no link), for the footer. */
  asLink?: boolean;
}

export default function Logo({ onNavigate, inverse = false, asLink = true }: LogoProps) {
  const inner = (
    <>
      <LogoMark />
      <span className="logo__text">
        <span className="logo__name" style={inverse ? { color: '#fff' } : undefined}>
          {content.company.name}
        </span>
        <span className="logo__tagline">{content.company.tagline}</span>
      </span>
    </>
  );

  if (!asLink) {
    return <span className="logo">{inner}</span>;
  }

  return (
    <Link to="/" className="logo" onClick={onNavigate} aria-label={`${content.company.name} — home`}>
      {inner}
    </Link>
  );
}
