export default function Stats() {
  const stats = [
    { num: '150+', label: 'Projects Delivered' },
    { num: '8+', label: 'Years in Business' },
    { num: '98%', label: 'Client Satisfaction' },
    { num: '40+', label: 'Happy Clients' },
  ];

  return (
    <section
      style={{
        width: '100%',
        background: '#2D1F14',
        padding: '60px clamp(24px, 5vw, 80px)',
      }}
    >
      <div
        className="stats-grid"
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '2rem',
        }}
      >
        {stats.map((stat, i) => (
          <div key={i} style={{ textAlign: 'center', flex: '1 1 auto', minWidth: '140px' }}>
            <div
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontSize: 'clamp(2rem, 4vw, 3.2rem)',
                fontWeight: 400,
                color: '#D4A574',
                letterSpacing: '-0.02em',
              }}
            >
              {stat.num}
            </div>
            <div
              style={{
                fontFamily: "'Geist Mono', monospace",
                fontSize: '0.7rem',
                fontWeight: 400,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'rgba(248, 244, 239, 0.6)',
                marginTop: '8px',
              }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .stats-grid {
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            gap: 2rem !important;
          }
        }
        @media (max-width: 400px) {
          .stats-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
