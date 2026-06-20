import { useState } from 'react';

export default function Contact() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!email || !email.includes('@')) return;
    setSubmitted(true);
    setEmail('');
    setTimeout(() => setSubmitted(false), 3500);
  };

  return (
    <section
      id="contact"
      style={{
        padding: '120px clamp(24px, 5vw, 80px) 160px',
        background: '#F8F4EF',
      }}
    >
      <div
        className="contact-grid"
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '3fr 2fr',
          gap: '48px',
          alignItems: 'end',
        }}
      >
        <div>
          <h2
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: 'clamp(2.2rem, 5vw, 3.6rem)',
              fontWeight: 400,
              color: '#2D1F14',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              margin: 0,
            }}
          >
            Ready to Build
            <br />
            Something Great Together?
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '1rem',
              color: '#1A110B',
              lineHeight: 1.65,
              marginTop: '24px',
              maxWidth: '480px',
            }}
          >
            Tell us about your project and get a free consultation + quote within 24 hours. No
            commitment required.
          </p>
          <div
            style={{
              marginTop: '32px',
              display: 'flex',
              gap: '10px',
              flexWrap: 'wrap',
            }}
          >
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              style={{
                background: '#F0EBE3',
                border: '1px solid rgba(45, 31, 20, 0.12)',
                color: '#1A110B',
                padding: '13px 20px',
                borderRadius: '10px',
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.95rem',
                minWidth: '280px',
                outline: 'none',
                flex: '1 1 auto',
              }}
            />
            <button
              onClick={handleSubmit}
              style={{
                background: submitted ? '#22C55E' : '#A0522D',
                color: '#F8F4EF',
                padding: '13px 28px',
                borderRadius: '10px',
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.95rem',
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={(e) => {
                if (!submitted) e.currentTarget.style.background = '#2D1F14';
              }}
              onMouseLeave={(e) => {
                if (!submitted) e.currentTarget.style.background = '#A0522D';
              }}
            >
              {submitted ? "✓ We'll be in touch!" : 'Get Free Quote →'}
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <h4
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.95rem',
                fontWeight: 600,
                color: '#2D1F14',
                margin: '0 0 4px 0',
              }}
            >
              Nikhil Katigar
            </h4>
            <a
              href="tel:+918904286980"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.85rem',
                color: 'rgba(26, 17, 11, 0.6)',
                textDecoration: 'none',
                display: 'block',
              }}
            >
              +91 89042 86980
            </a>
          </div>

          <div>
            <h4
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.95rem',
                fontWeight: 600,
                color: '#2D1F14',
                margin: '0 0 4px 0',
              }}
            >
              Chetan Jatti
            </h4>
            <a
              href="tel:+919980677467"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.85rem',
                color: 'rgba(26, 17, 11, 0.6)',
                textDecoration: 'none',
                display: 'block',
              }}
            >
              +91 99806 77467
            </a>
          </div>

          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.85rem',
              color: 'rgba(26, 17, 11, 0.5)',
              marginTop: '4px',
              marginBottom: 0,
            }}
          >
            Hubli, Karnataka — serving clients worldwide
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
