export default function TechStack() {
  const chips = [
    'React', 'Next.js', 'Node.js', 'MongoDB', 'PostgreSQL', 'Express.js',
    'React Native', 'Flutter', 'TypeScript', 'AWS', 'Docker', 'GitHub Actions',
    'Tailwind CSS', 'Figma', 'Firebase', 'Redis', 'REST APIs', 'GraphQL',
    'Razorpay', 'Stripe', 'Linux', 'SEO Tools', 'Google Analytics', 'WordPress', 'Shopify',
  ];

  return (
    <section
      style={{
        padding: '80px clamp(24px, 5vw, 80px) 120px',
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
            marginBottom: '20px',
          }}
        >
          TECH WE USE
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
          Modern Stack, Battle-Tested Tools
        </h2>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px',
            marginTop: '40px',
          }}
        >
          {chips.map((chip) => (
            <span
              key={chip}
              style={{
                background: 'rgba(212, 165, 116, 0.04)',
                border: '1px solid rgba(45, 31, 20, 0.08)',
                borderRadius: '100px',
                padding: '8px 20px',
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.85rem',
                fontWeight: 600,
                color: 'rgba(26, 17, 11, 0.7)',
                cursor: 'default',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = '#A0522D';
                el.style.color = '#A0522D';
                el.style.background = 'rgba(160, 82, 45, 0.06)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = 'rgba(45, 31, 20, 0.08)';
                el.style.color = 'rgba(26, 17, 11, 0.7)';
                el.style.background = 'rgba(212, 165, 116, 0.04)';
              }}
            >
              {chip}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
