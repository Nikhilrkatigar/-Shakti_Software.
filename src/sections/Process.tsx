export default function Process() {
  const steps = [
    {
      num: '01',
      title: 'Discovery Call',
      desc: 'We understand your goals, audience, and technical requirements before writing a single line of code.',
    },
    {
      num: '02',
      title: 'Proposal & Plan',
      desc: 'Clear scope, timeline, and pricing — no surprises. You approve before we begin.',
    },
    {
      num: '03',
      title: 'Design & Build',
      desc: 'Agile sprints with regular demos and check-ins so you see progress every week.',
    },
    {
      num: '04',
      title: 'Test & Launch',
      desc: 'Thorough QA across devices and browsers, then a smooth deployment to production.',
    },
    {
      num: '05',
      title: 'Support & Growth',
      desc: 'Post-launch maintenance, updates, and scaling — we\'re with you for the long run.',
    },
  ];

  return (
    <section
      id="process"
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
            marginBottom: '20px',
          }}
        >
          OUR PROCESS
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
          From Idea to Launch — A Clear Path
        </h2>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '1rem',
            color: '#1A110B',
            lineHeight: 1.65,
            marginTop: '16px',
            maxWidth: '560px',
          }}
        >
          Our proven process keeps you informed, in control, and confident at every stage.
        </p>

        <div
          className="process-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '2rem',
            marginTop: '56px',
          }}
        >
          {steps.map((step) => (
            <div key={step.num}>
              <span
                style={{
                  fontFamily: "'Geist Mono', monospace",
                  fontSize: '0.75rem',
                  color: '#A0522D',
                  letterSpacing: '0.05em',
                  fontWeight: 500,
                }}
              >
                {step.num}
              </span>
              <h3
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: '#2D1F14',
                  marginTop: '12px',
                  marginBottom: 0,
                }}
              >
                {step.title}
              </h3>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.875rem',
                  color: 'rgba(26, 17, 11, 0.6)',
                  lineHeight: 1.6,
                  marginTop: '6px',
                }}
              >
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .process-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 500px) {
          .process-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
