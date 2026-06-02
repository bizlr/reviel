import React, { useRef, useState } from 'react';
import { ReactLenis } from 'lenis/react';
import gsap from 'gsap';

gsap.defaults({ force3D: true });
import Hero from './components/Hero';
import IntroSection from './components/IntroSection';
import Experience from './components/Experience';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import CTA from './components/CTA';
import Footer from './components/Footer';
import VideoBackground from './components/VideoBackground';

function App() {
  const globalVideoRef = useRef(null);
  const globalCTAVideoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [introFinished, setIntroFinished] = useState(false);

  return (
    <ReactLenis root>
      <div className="app">
        <VideoBackground ref={globalVideoRef} isMuted={isMuted} />
        <IntroSection
          globalVideoRef={globalVideoRef}
          setIsMuted={setIsMuted}
          globalCTAVideoRef={globalCTAVideoRef}
          onFinish={() => setIntroFinished(true)}
        />
        <Hero isMuted={isMuted} setIsMuted={setIsMuted} showHeader={introFinished} />
        <Experience />
        <Testimonials />
        <FAQ />
        <CTA globalVideoRef={globalVideoRef} isMuted={isMuted} ctaVideoRef={globalCTAVideoRef} />
        <Footer />
      </div>
    </ReactLenis>
  );
}

export default App;
