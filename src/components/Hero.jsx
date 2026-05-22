import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import Waitlist from './Waitlist';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const Hero = ({ isMuted, setIsMuted }) => {
  const [isSticky, setIsSticky] = useState(false);
  const waitlistContainerRef = useRef(null);

  useGSAP(() => {
    gsap.from(waitlistContainerRef.current, {
      scrollTrigger: {
        trigger: waitlistContainerRef.current,
        start: "top 50%",
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      y: 0, // no vertical translation, just fade
      duration: 2, // very smooth/slow
      ease: "power2.out"
    });
  });

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky header after cinematic intro (approx 100vh)
      if (window.scrollY > window.innerHeight * 0.9) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="waitlist-section" className="top-wrapper">
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
      
      <div className="container" ref={waitlistContainerRef} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
