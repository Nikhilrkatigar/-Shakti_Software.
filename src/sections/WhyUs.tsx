import content from '../data/content.json';

export default function WhyUs() {
  const { title, description, checklist, cards } = content.whyUs;

  return (
    <section
      id="whyus"
      style={{
        padding: '120px clamp(24px, 5vw, 80px)',
        background: '#F8F4EF',
      }}
    >
      <div
        className="whyus-grid"
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: '48px',
          alignItems: 'start',
        }}
      >
        <div>
          <p
            style={{
              fontFamily: "'Geist Mono', monospace",
              fontSize: '0.7rem',
              fontWeight: 400,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: '#A0522D',
              marginBottom: '20px',
            }}
          >
            WHY SAKTHI SOFTWARE
          </p>
          <h2
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 400,
              color: '#2D1F14',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              margin: 0,
            }}
          >
            {title}
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '1rem',
              color: '#1A110B',
              lineHeight: 1.65,
              marginTop: '16px',
            }}
          >
            {description}
          </p>
          <div style={{ marginTop: '32px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {checklist.map((item, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.9rem',
                  color: '#1A110B',
                }}
              >
                <span
                  style={{
                    width: '22px',
                    height: '22px',
                    background: '#A0522D',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.7rem',
                    color: '#fff',
                    flexShrink: 0,
                    fontWeight: 700,
                  }}
                >
                  ✓
                </span>
                {item}
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1.5rem',
          }}
          className="whyus-cards"
        >
          {cards.map((card, i) => (
            <div
              key={i}
              style={{
                background: 'rgba(212, 165, 116, 0.06)',
                border: '1px solid rgba(45, 31, 20, 0.08)',
                borderRadius: '14px',
                padding: '28px',
                transition: 'all 0.25s ease',
                cursor: 'default',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = 'rgba(160, 82, 45, 0.25)';
                el.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = 'rgba(45, 31, 20, 0.08)';
                el.style.transform = 'translateY(0)';
              }}
            >
              <div style={{ fontSize: '1.5rem', marginBottom: '14px' }}>{card.icon}</div>
              <h3
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: '#2D1F14',
                  marginBottom: '8px',
                  marginTop: 0,
                }}
              >
                {card.title}
              </h3>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.875rem',
                  color: 'rgba(26, 17, 11, 0.6)',
                  lineHeight: 1.65,
                  margin: 0,
                }}
              >
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .whyus-grid {
            grid-template-columns: 1fr !important;
          }
          .whyus-cards {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 500px) {
          .whyus-cards {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
