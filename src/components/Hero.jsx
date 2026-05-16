import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import Waitlist from './Waitlist';

const Hero = ({ isMuted, setIsMuted }) => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky header after cinematic intro (approx 1000vh)
      if (window.scrollY > window.innerHeight * 9.5) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="top-wrapper">
      <header className={`main-header ${isSticky ? 'sticky' : ''}`}>
        <div className="logo">
          <img src="/logo_reviel.png" alt="Reviel Logo" />
        </div>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <button 
            className="header-icon-btn"
            onClick={() => setIsMuted(!isMuted)}
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>
        </div>
      </header>
      
      <div className="container" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Waitlist />
      </div>

      <div className="scroll-indicator">
        <div className="mouse-icon"></div>
        <p>Scroll down to learn more</p>
      </div>
    </section>
  );
};

export default Hero;
