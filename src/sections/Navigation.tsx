import { useEffect, useRef, useState } from 'react';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  const navItems = [
    { label: 'Services', id: 'services' },
    { label: 'Approach', id: 'process' },
    { label: 'Work', id: 'whyus' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <>
      <nav
        ref={navRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: '28px clamp(24px, 5vw, 80px)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          transition: 'background 0.4s ease',
          background: scrolled ? 'rgba(248, 244, 239, 0.9)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
        }}
      >
        <div
          style={{
            position: 'relative',
            height: '36px',
            width: '107px',
            cursor: 'pointer',
          }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <img
            src="/logo_light.png"
            alt="Sakthi Software Logo"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: '100%',
              width: 'auto',
              opacity: scrolled ? 0 : 1,
              transition: 'opacity 0.4s ease',
            }}
          />
          <img
            src="/logo_dark.png"
            alt="Sakthi Software Logo"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: '100%',
              width: 'auto',
              opacity: scrolled ? 1 : 0,
              transition: 'opacity 0.4s ease',
            }}
          />
        </div>

        {/* Desktop nav links */}
        <div className="nav-desktop" style={{ display: 'flex', alignItems: 'baseline', gap: '2rem' }}>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="nav-link"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.8rem',
                fontWeight: 400,
                textTransform: 'uppercase' as const,
                letterSpacing: '0.08em',
                color: scrolled ? '#1A110B' : '#F8F4EF',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                position: 'relative',
                padding: 0,
                transition: 'color 0.4s ease',
              }}
            >
              {item.label}
              <span
                style={{
                  position: 'absolute',
                  bottom: -2,
                  left: 0,
                  width: '100%',
                  height: '1px',
                  background: scrolled ? '#A0522D' : '#F8F4EF',
                  transform: 'scaleX(0)',
                  transformOrigin: 'left',
                  transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                className="nav-underline"
              />
            </button>
          ))}
          <button
            onClick={() => scrollTo('contact')}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.8rem',
              fontWeight: 400,
              textTransform: 'uppercase' as const,
              letterSpacing: '0.08em',
              color: '#A0522D',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'color 0.4s ease',
            }}
            onMouseEnter={(e) => {
              const arrow = e.currentTarget.querySelector('.nav-arrow') as HTMLElement;
              if (arrow) arrow.style.transform = 'translateX(4px)';
            }}
            onMouseLeave={(e) => {
              const arrow = e.currentTarget.querySelector('.nav-arrow') as HTMLElement;
              if (arrow) arrow.style.transform = 'translateX(0)';
            }}
          >
            Get a Quote
            <span className="nav-arrow" style={{ transition: 'transform 0.3s ease', display: 'inline-block' }}>→</span>
          </button>
        </div>

        {/* Hamburger button (mobile only) */}
        <button
          className="nav-hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px',
            zIndex: 110,
            flexDirection: 'column',
            gap: '5px',
            width: '28px',
          }}
        >
          <span
            style={{
              display: 'block',
              width: '100%',
              height: '2px',
              background: menuOpen ? '#2D1F14' : (scrolled ? '#2D1F14' : '#F8F4EF'),
              borderRadius: '2px',
              transition: 'all 0.3s ease',
              transform: menuOpen ? 'translateY(7px) rotate(45deg)' : 'none',
            }}
          />
          <span
            style={{
              display: 'block',
              width: '100%',
              height: '2px',
              background: menuOpen ? '#2D1F14' : (scrolled ? '#2D1F14' : '#F8F4EF'),
              borderRadius: '2px',
              transition: 'all 0.3s ease',
              opacity: menuOpen ? 0 : 1,
            }}
          />
          <span
            style={{
              display: 'block',
              width: '100%',
              height: '2px',
              background: menuOpen ? '#2D1F14' : (scrolled ? '#2D1F14' : '#F8F4EF'),
              borderRadius: '2px',
              transition: 'all 0.3s ease',
              transform: menuOpen ? 'translateY(-7px) rotate(-45deg)' : 'none',
            }}
          />
        </button>
      </nav>

      {/* Mobile fullscreen overlay menu */}
      <div
        className="nav-mobile-overlay"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 99,
          background: 'rgba(248, 244, 239, 0.97)',
          backdropFilter: 'blur(20px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '2rem',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'auto' : 'none',
          transition: 'opacity 0.35s ease',
        }}
      >
        {navItems.map((item, i) => (
          <button
            key={item.id}
            onClick={() => scrollTo(item.id)}
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: '2rem',
              fontWeight: 400,
              color: '#2D1F14',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              letterSpacing: '-0.01em',
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
              transition: `opacity 0.4s ease ${0.1 + i * 0.06}s, transform 0.4s ease ${0.1 + i * 0.06}s`,
            }}
          >
            {item.label}
          </button>
        ))}
        <button
          onClick={() => scrollTo('contact')}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.9rem',
            fontWeight: 600,
            textTransform: 'uppercase' as const,
            letterSpacing: '0.1em',
            color: '#F8F4EF',
            background: '#A0522D',
            border: 'none',
            cursor: 'pointer',
            padding: '14px 36px',
            borderRadius: '10px',
            marginTop: '1rem',
            opacity: menuOpen ? 1 : 0,
            transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
            transition: `opacity 0.4s ease 0.35s, transform 0.4s ease 0.35s`,
          }}
        >
          Get a Quote →
        </button>
      </div>

      <style>{`
        .nav-link:hover .nav-underline {
          transform: scaleX(1) !important;
        }

        @media (max-width: 768px) {
          .nav-desktop {
            display: none !important;
          }
          .nav-hamburger {
            display: flex !important;
          }
        }
      `}</style>
    </>
  );
}
