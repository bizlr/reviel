import React, { useRef, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Modal from './components/Modal';

import SharePage from './pages/SharePage';

function App() {
  const globalVideoRef = useRef(null);
  const globalCTAVideoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [introFinished, setIntroFinished] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
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
            <Footer onOpenPrivacy={() => setShowPrivacy(true)} onOpenTerms={() => setShowTerms(true)} />
            {showPrivacy && (
              <Modal onClose={() => setShowPrivacy(false)} title="Privacy Policy">
                <Privacy />
              </Modal>
            )}
            {showTerms && (
              <Modal onClose={() => setShowTerms(false)} title="Terms of Use">
                <Terms />
              </Modal>
            )}
          </div>
        } />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/share" element={<SharePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
