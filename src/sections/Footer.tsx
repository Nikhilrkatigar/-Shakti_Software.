export default function Footer() {
  const links = ['LinkedIn', 'GitHub', 'Twitter', 'Instagram'];

  return (
    <footer
      style={{
        width: '100%',
        padding: '40px clamp(24px, 5vw, 80px)',
        borderTop: '1px solid rgba(45, 31, 20, 0.08)',
        background: '#F8F4EF',
      }}
    >
      <div
        className="footer-inner"
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div className="footer-left">
          <img
            src="/logo_dark.png"
            alt="Sakthi Software Logo"
            style={{ height: '28px', width: 'auto', display: 'block', opacity: 0.8 }}
          />
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.8rem',
              color: 'rgba(26, 17, 11, 0.4)',
            }}
          >
            © 2025 Sakthi Software. All rights reserved. Built with care in Hubli.
          </div>
        </div>
        <div style={{ display: 'flex', gap: '24px' }}>
          {links.map((link) => (
            <a
              key={link}
              href="#"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.8rem',
                color: 'rgba(26, 17, 11, 0.4)',
                textDecoration: 'none',
                transition: 'color 0.3s ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = '#2D1F14';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = 'rgba(26, 17, 11, 0.4)';
              }}
            >
              {link}
            </a>
          ))}
        </div>
      </div>

      <style>{`
        .footer-left {
          display: flex;
          flex-direction: column;
          gap: 12px;
          align-items: flex-start;
        }

        @media (max-width: 768px) {
          .footer-inner {
            flex-direction: column !important;
            text-align: center !important;
          }
          .footer-left {
            align-items: center !important;
          }
        }
      `}</style>
    </footer>
  );
}
