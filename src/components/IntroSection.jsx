import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const IntroSection = ({ globalVideoRef }) => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const bgRef = useRef(null);
  const overlayRef = useRef(null);
  
  // Refs for text blocks
  const step1Ref = useRef(null);
  const step2Ref = useRef(null);
  const step3Ref = useRef(null);
  const step4Ref = useRef(null);
  const mouseRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=1000%", // Longer scroll for the narrative
        pin: true,
        scrub: 1,
      }
    });

    // 1. Initial Zoom (0-15%)
    tl.to(textRef.current, {
      scale: 200,
      transformOrigin: "center center",
      ease: "power2.in",
      duration: 1.5
    }, 0);

    tl.to(overlayRef.current, {
      opacity: 0,
      ease: "power2.in",
      duration: 0.8
    }, 0.7);

    // Fade out mouse icon early
    tl.to(mouseRef.current, {
      opacity: 0,
      duration: 0.5
    }, 0.2);

    // 2. Step 1: Come Back To Yourself (15-35%)
    tl.fromTo(step1Ref.current, 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1 }, 
      1.5
    );
    tl.to(step1Ref.current, {
      opacity: 0,
      y: -30,
      duration: 1
    }, 3.5);

    // Background Subtle Zoom (Nature)
    tl.to(bgRef.current, {
      scale: 1.1,
      duration: 4.5,
      ease: "none"
    }, 0);

    // 3. Background Transition (Nature -> Global Video) (Starts at Step 2)
    tl.to(bgRef.current, {
      opacity: 0,
      duration: 1.5
    }, 4.0);
    
    if (globalVideoRef && globalVideoRef.current) {
      tl.to(globalVideoRef.current, {
        opacity: 1,
        duration: 1.5
      }, 4.0);

      // Background Subtle Zoom (Video)
      tl.fromTo(globalVideoRef.current,
        { scale: 1.1 },
        { scale: 1, duration: 7, ease: "none" },
        4.0
      );
    }

    // 4. Step 2: You've been holding too much (45-60%)
    tl.fromTo(step2Ref.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1 },
      4.5
    );
    tl.to(step2Ref.current, {
      opacity: 0,
      y: -30,
      duration: 1
    }, 5.5);

    // 5. Step 3: You can pause here (60-75%)
    tl.fromTo(step3Ref.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1 },
      6.0
    );
    tl.to(step3Ref.current, {
      opacity: 0,
      y: -30,
      duration: 1
    }, 7.0);

    // 6. Step 4: We're building something (75-90%)
    tl.fromTo(step4Ref.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1 },
      7.5
    );
    tl.to(step4Ref.current, {
      opacity: 0,
      duration: 1
    }, 8.5);

    // Final Fade Out (reveal Hero) (90-100%)
    tl.to(containerRef.current, {
      opacity: 0,
      duration: 1
    }, 9.0);

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="intro-container">
      {/* Background Layers */}
      <div 
        ref={bgRef} 
        className="intro-bg"
        style={{ backgroundImage: "url('/reviel_nature_bg.jpg')" }}
      />
      
      {/* SVG Mask Overlay */}
      <div ref={overlayRef} className="intro-overlay">
        <svg viewBox="0 0 2000 1000" className="intro-svg" preserveAspectRatio="xMidYMid slice">
          <defs>
            <mask id="textMask">
              <rect width="100%" height="100%" fill="white" />
              <text 
                ref={textRef}
                x="1000" 
                y="500" 
                textAnchor="middle" 
                dominantBaseline="middle"
                className="mask-text"
                style={{ fontWeight: 700 }}
              >
                Reviel
              </text>
            </mask>
          </defs>
          <rect width="100%" height="100%" fill="white" mask="url(#textMask)" />
        </svg>
      </div>

      {/* Narrative Content */}
      <div className="cinematic-content">
        <div ref={step1Ref} className="cinematic-step">
          <h2>Come Back To Yourself.</h2>
          <p>Reviel is a calm, intelligent companion that helps you reconnect, regulate, and feel supported every day.</p>
        </div>
        
        <div ref={step2Ref} className="cinematic-step">
          <h2>You’ve been holding <br /> too much.</h2>
        </div>
        
        <div ref={step3Ref} className="cinematic-step">
          <h2>You can pause here.</h2>
        </div>
        
        <div ref={step4Ref} className="cinematic-step">
          <h2>We’re building something that makes the hard days easier to carry.</h2>
        </div>
      </div>

      <div ref={mouseRef} className="tap-to-continue">
        <div className="mouse-icon"></div>
        <p>Scroll or Tap to Continue</p>
      </div>
    </div>
  );
};

export default IntroSection;
