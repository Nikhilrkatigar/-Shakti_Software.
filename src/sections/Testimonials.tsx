import content from '../data/content.json';

export default function Testimonials() {
  const testimonials = content.testimonials;

  const avatarColors = ['#A0522D', '#059669', '#D97706'];

  return (
    <section
      style={{
        padding: '120px clamp(24px, 5vw, 80px)',
        background: '#F8F4EF',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <p
          style={{
            fontFamily: "'Geist Mono', monospace",
            fontSize: '0.7rem',
            fontWeight: 400,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: '#A0522D',
            marginBottom: '48px',
          }}
        >
          CLIENT STORIES
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
          What Our Clients Say
        </h2>

        <div
          className="testi-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.5rem',
            marginTop: '48px',
          }}
        >
          {testimonials.map((t, i) => (
            <div
              key={i}
              style={{
                background: 'rgba(212, 165, 116, 0.04)',
                border: '1px solid rgba(45, 31, 20, 0.08)',
                borderRadius: '14px',
                padding: '28px',
              }}
            >
              <div
                style={{
                  color: '#D4A574',
                  fontSize: '0.8rem',
                  marginBottom: '14px',
                  letterSpacing: '0.1em',
                }}
              >
                ★★★★★
              </div>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.93rem',
                  color: '#1A110B',
                  lineHeight: 1.75,
                  fontStyle: 'italic',
                  margin: 0,
                }}
              >
                "{t.quote}"
              </p>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginTop: '20px',
                }}
              >
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: avatarColors[i],
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    color: '#fff',
                    fontFamily: "'Inter', sans-serif",
                    flexShrink: 0,
                  }}
                >
                  {t.initials}
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      color: '#2D1F14',
                    }}
                  >
                    {t.name}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '0.78rem',
                      color: 'rgba(26, 17, 11, 0.5)',
                    }}
                  >
                    {t.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .testi-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
