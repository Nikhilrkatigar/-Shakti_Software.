import { useEffect, useRef, useState } from 'react';
import { FragmentSlideshow } from '../effects/FragmentSlideshow';
import content from '../data/content.json';

const heroSlides = [
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1920&q=80',
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const slideshowRef = useRef<FragmentSlideshow | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [webglError, setWebglError] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    try {
      slideshowRef.current = new FragmentSlideshow(containerRef.current, heroSlides);

      // Track slide changes
      const interval = setInterval(() => {
        if (slideshowRef.current) {
          setCurrentSlide(slideshowRef.current.getCurrentSlide());
        }
      }, 500);

      return () => {
        clearInterval(interval);
        slideshowRef.current?.dispose();
      };
    } catch (e) {
      console.warn("WebGL initialization failed. Using static fallback image.", e);
      setWebglError(true);
    }
  }, []);

  const goToSlide = (index: number) => {
    if (!webglError && slideshowRef.current) {
      slideshowRef.current.goToSlide(index);
      setCurrentSlide(index);
    }
  };

  const scrollToServices = () => {
    const el = document.getElementById('services');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>
      {/* Three.js slideshow container */}
      <div
        ref={containerRef}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          display: webglError ? 'none' : 'block',
        }}
      />

      {/* Fallback Static Image (rendered if WebGL fails) */}
      {webglError && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${heroSlides[0]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: 1,
          }}
        />
      )}

      {/* Content overlay */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 2,
          padding: '0 clamp(24px, 5vw, 80px) 80px',
          pointerEvents: 'none',
        }}
      >
        <div style={{ maxWidth: '640px' }}>
          <h1
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: 'clamp(2.8rem, 6vw, 4.8rem)',
              fontWeight: 400,
              color: '#F8F4EF',
              letterSpacing: '-0.02em',
              lineHeight: 1.05,
              textShadow: '0 2px 40px rgba(0,0,0,0.15)',
              margin: 0,
            }}
          >
            {content.hero.titleLine1}
            <br />
            {content.hero.titleLine2}
            <br />
            {content.hero.titleLine3}
          </h1>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '1.1rem',
              fontWeight: 400,
              color: 'rgba(248, 244, 239, 0.8)',
              marginTop: '20px',
              lineHeight: 1.65,
              textShadow: '0 1px 20px rgba(0,0,0,0.1)',
            }}
          >
            {content.hero.description}
          </p>
          <button
            onClick={scrollToServices}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.85rem',
              fontWeight: 500,
              textTransform: 'uppercase' as const,
              letterSpacing: '0.08em',
              color: '#F8F4EF',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              marginTop: '28px',
              padding: 0,
              position: 'relative',
              pointerEvents: 'auto',
            }}
          >
            <span style={{ borderBottom: '1px solid rgba(248, 244, 239, 0.4)', paddingBottom: '2px' }}>
              {content.hero.buttonText}
            </span>
          </button>
        </div>
      </div>

      {/* Dot indicators */}
      <div
        style={{
          position: 'absolute',
          bottom: '80px',
          right: 'clamp(24px, 5vw, 80px)',
          zIndex: 2,
          display: 'flex',
          gap: '10px',
        }}
      >
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              background: i === currentSlide ? '#F8F4EF' : 'rgba(248, 244, 239, 0.35)',
              transition: 'background 0.3s ease',
            }}
          />
        ))}
      </div>
    </section>
  );
}
