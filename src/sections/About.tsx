export default function About() {
  const values = [
    'Strategy-led, not technology-led',
    'Human-centered by default',
    'Collaborative from day one',
    'Focused on measurable outcomes',
  ];

  return (
    <section
      id="about"
      style={{
        padding: '120px clamp(24px, 5vw, 80px)',
        background: '#F8F4EF',
      }}
    >
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: '48px',
          alignItems: 'start',
        }}
        className="about-grid"
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
            ABOUT
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
            We use technology to help forward-thinking businesses grow.
          </h2>
        </div>
        <div>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '1rem',
              color: '#1A110B',
              lineHeight: 1.65,
              margin: 0,
            }}
          >
            We combine deep expertise in web development, software engineering, and digital platforms
            with a human-centered approach to design. Every engagement starts with understanding your
            context — your goals, your constraints, your ambitions — and builds from there.
          </p>
          <div style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {values.map((value, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.9rem',
                  color: 'rgba(26, 17, 11, 0.7)',
                }}
              >
                <span style={{ color: '#A0522D', fontWeight: 500 }}>–</span>
                {value}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
