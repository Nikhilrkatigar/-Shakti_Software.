import { useRef, useState, useCallback } from 'react';
import content from '../data/content.json';

const services = content.services;

export default function Services() {
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setCursorPos({ x: e.clientX + 20, y: e.clientY - 80 });
  }, []);

  const handleMouseEnter = useCallback((image: string) => {
    setHoveredImage(image);
    setIsVisible(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsVisible(false);
  }, []);

  return (
    <section
      id="services"
      style={{
        padding: '80px clamp(24px, 5vw, 80px) 120px',
        background: '#F8F4EF',
      }}
      onMouseMove={handleMouseMove}
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
          WHAT WE DO
        </p>

        <div>
          {services.map((service) => (
            <div
              key={service.num}
              className="service-row"
              onMouseEnter={() => handleMouseEnter(service.image)}
              onMouseLeave={handleMouseLeave}
              style={{
                display: 'grid',
                gridTemplateColumns: '15% 85%',
                padding: '28px 0',
                borderBottom: '1px solid rgba(45, 31, 20, 0.1)',
                cursor: 'pointer',
                transition: 'background 0.4s ease',
                alignItems: 'start',
              }}
              onMouseOver={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(212, 165, 116, 0.06)';
              }}
              onMouseOut={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'transparent';
              }}
            >
              <span
                style={{
                  fontFamily: "'Geist Mono', monospace",
                  fontSize: '0.75rem',
                  color: '#A0522D',
                  letterSpacing: '0.05em',
                }}
              >
                {service.num}
              </span>
              <div>
                <h3
                  style={{
                    fontFamily: "'Instrument Serif', serif",
                    fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
                    fontWeight: 400,
                    color: '#2D1F14',
                    margin: 0,
                    lineHeight: 1.15,
                  }}
                >
                  {service.title}
                </h3>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.9rem',
                    color: 'rgba(26, 17, 11, 0.6)',
                    marginTop: '6px',
                    lineHeight: 1.55,
                    maxWidth: '600px',
                  }}
                >
                  {service.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating hover image */}
      <div
        ref={imageRef}
        className="services-hover-img"
        style={{
          position: 'fixed',
          left: cursorPos.x,
          top: cursorPos.y,
          width: '220px',
          height: '160px',
          borderRadius: '8px',
          overflow: 'hidden',
          boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
          pointerEvents: 'none',
          zIndex: 100,
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'scale(1)' : 'scale(0.92)',
          transition: 'opacity 0.3s ease, transform 0.3s ease',
        }}
      >
        {hoveredImage && (
          <img
            src={hoveredImage}
            alt=""
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .service-row {
            grid-template-columns: 1fr !important;
            gap: 4px !important;
          }
          .services-hover-img {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
