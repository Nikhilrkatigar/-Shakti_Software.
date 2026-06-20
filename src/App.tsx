import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import About from './sections/About';
import Services from './sections/Services';
import Process from './sections/Process';
import WhyUs from './sections/WhyUs';
import Stats from './sections/Stats';
import Testimonials from './sections/Testimonials';
import TechStack from './sections/TechStack';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import Admin from './pages/Admin';
import './App.css';

function MainLayout() {
  useEffect(() => {
    // Initialize Lenis smooth scroll
    let lenis: any = null;

    const initLenis = async () => {
      try {
        const Lenis = (await import('lenis')).default;
        lenis = new Lenis({
          lerp: 0.12,
          smoothWheel: true,
        });

        const raf = (time: number) => {
          lenis.raf(time);
          requestAnimationFrame(raf);
        };
        requestAnimationFrame(raf);
      } catch (e) {
        // Lenis failed to load, fallback to native scroll
        console.log('Lenis not available, using native scroll');
      }
    };

    initLenis();

    return () => {
      if (lenis) lenis.destroy();
    };
  }, []);

  return (
    <div style={{ background: '#F8F4EF' }}>
      <Navigation />
      <Hero />
      <About />
      <Services />
      <Process />
      <WhyUs />
      <Stats />
      <Testimonials />
      <TechStack />
      <Contact />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />} />
        {/* Only include the Admin dashboard in local development mode for maximum security */}
        {import.meta.env.DEV && (
          <Route path="/admin" element={<Admin />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
