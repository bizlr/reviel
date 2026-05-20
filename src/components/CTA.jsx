import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const CTA = ({ globalVideoRef, isMuted, ctaVideoRef }) => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    if (globalVideoRef && globalVideoRef.current) {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top bottom",
        onEnter: () => {
          gsap.to(globalVideoRef.current, { opacity: 0, duration: 1 });
          if (ctaVideoRef && ctaVideoRef.current) ctaVideoRef.current.play();
        },
        onLeaveBack: () => {
          gsap.to(globalVideoRef.current, { opacity: 1, duration: 1 });
        }
      });
    }
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="bottom-cta-section">
      <video
        ref={ctaVideoRef}
        className="cta-bg-video"
        src="https://res.cloudinary.com/quinn-daisies-platform/video/upload/v1778958498/ARUKAH%20IMAGES/YTDown_YouTube_No-Copyright-Drone-Shots-Royalty-free-dr_Media_iUtnZpzkbG8_001_1080p_fjvmrl.mp4"
        autoPlay
        loop
        playsInline
        muted={isMuted}
      />
      <div className="container cta-content">
        <h2 className="cta-headline">You made it <br /> this far.</h2>
        <p className="cta-subtext">
          Your journey towards a calmer self starts here. Join thousands of users who have already found their peace.
        </p>
        <button 
          className="btn-primary cta-btn"
          onClick={() => {
            document.getElementById('waitlist-section')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          Join waitlist
        </button>
      </div>
    </section>
  );
};

export default CTA;
