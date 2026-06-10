import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import Waitlist from './Waitlist';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

// Added showHeader prop to control visibility of the header until the waitlist appears

  function Hero({ showHeader, isMuted, setIsMuted }) {
    const [isSticky, setIsSticky] = useState(false);
    const waitlistContainerRef = useRef(null);


  // Update sticky state based on scroll position
  useEffect(() => {
    const onScroll = () => {
      setIsSticky(window.scrollY > 0);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Removed GSAP animation and ScrollTrigger to ensure the waitlist form appears instantly without relying on scroll position.
  // The form is now rendered directly and visible as soon as the component mounts.



  return (
    <section id="waitlist-section" className="top-wrapper" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      {showHeader && (
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
      )}
      
      <div className="container" ref={waitlistContainerRef} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <div style={{ maxWidth: '600px', width: '100%' }}>
          <Waitlist />
        </div>
      </div>

      
    </section>
  );
}

export default Hero;
