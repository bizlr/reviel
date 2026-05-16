import React, { useRef } from 'react';
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
  const [isMuted, setIsMuted] = React.useState(false);

  return (
    <div className="app">
      <VideoBackground ref={globalVideoRef} isMuted={isMuted} />
      <IntroSection globalVideoRef={globalVideoRef} />
      <Hero isMuted={isMuted} setIsMuted={setIsMuted} />
      <Experience />
      <Testimonials />
      <FAQ />
      <CTA globalVideoRef={globalVideoRef} isMuted={isMuted} />
      <Footer />
    </div>
  );
}

export default App;
