import { useEffect, useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router';
import { Menu, X, Phone, MapPin, Mail, ChevronRight } from 'lucide-react';
import Logo from './Logo';
import content from '../data/content.json';

const NAV = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Our Work', to: '/work' },
  { label: 'Contact', to: '/contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the drawer on route change
  useEffect(() => setOpen(false), [location.pathname]);

  // Lock scroll + allow Escape to close while the drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const tel = content.company.phonePrimary.replace(/\s/g, '');

  return (
    <>
      {/* Utility bar */}
      <div className="utility-bar">
        <div className="container utility-bar__inner">
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <MapPin size={13} aria-hidden="true" />
            {content.company.city}
          </span>
          <div className="utility-bar__group">
            <a href={`mailto:${content.company.email}`}>
              <Mail size={13} aria-hidden="true" />
              {content.company.email}
            </a>
            <a href={`tel:${tel}`}>
              <Phone size={13} aria-hidden="true" />
              {content.company.phonePrimary}
            </a>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header className={`site-header${scrolled ? ' site-header--scrolled' : ''}`}>
        <div className="container site-header__inner">
          <Logo />

          <nav className="nav" aria-label="Primary">
            {NAV.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.to === '/'} className="nav__link">
                {item.label}
              </NavLink>
            ))}
            <Link to="/contact" className="btn btn--primary btn--auto">
              Get a Quote
              <ChevronRight size={16} aria-hidden="true" />
            </Link>
          </nav>

          <button
            type="button"
            className="nav-toggle"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-drawer"
          >
            <Menu size={20} aria-hidden="true" />
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        id="mobile-drawer"
        className="mobile-drawer"
        data-open={open}
        aria-hidden={!open}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
      >
        <div className="mobile-drawer__head">
          <Logo onNavigate={() => setOpen(false)} />
          <button
            type="button"
            className="nav-toggle"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            style={{ display: 'inline-flex' }}
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        <nav aria-label="Mobile">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className="mobile-drawer__link"
              onClick={() => setOpen(false)}
            >
              {item.label}
              <ChevronRight size={18} aria-hidden="true" />
            </NavLink>
          ))}
        </nav>

        <div className="stack stack--3" style={{ marginTop: 'var(--sp-8)' }}>
          <Link to="/contact" className="btn btn--primary btn--lg" onClick={() => setOpen(false)}>
            Get a Quote
          </Link>
          <a href={`tel:${tel}`} className="btn btn--secondary btn--lg">
            <Phone size={16} aria-hidden="true" />
            {content.company.phonePrimary}
          </a>
        </div>
      </div>
    </>
  );
}
