import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useLenis } from 'lenis/react';

const IntroSection = ({ globalVideoRef, setIsMuted, globalCTAVideoRef }) => {
  const lenis = useLenis();
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const bgRef = useRef(null);
  const overlayRef = useRef(null);
  const mouseRef = useRef(null);
  const slideRef = useRef(null);
  const preIntroRef = useRef(null);
  const timeoutRef = useRef(null);

  const [hasZoomed, setHasZoomed] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [showMask, setShowMask] = useState(true);
  const [isIntroFinished, setIsIntroFinished] = useState(false);

  const hasZoomedRef = useRef(false);
  const isInitialZoomRef = useRef(true);

  // Scroll lock management
  useEffect(() => {
    if (lenis) {
      if (!isIntroFinished && currentStep >= 0 && currentStep <= 4) {
        lenis.stop();
      } else {
        lenis.start();
      }
    }
  }, [lenis, currentStep, isIntroFinished]);

  // Initial scroll positioning and lock
  useEffect(() => {
    window.scrollTo(0, 0);
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
      lenis.stop();
    }
  }, [lenis]);

  const runZoomAnimation = () => {
    const tl = gsap.timeline({
      onComplete: () => {
        setShowMask(false);
        // Hold on pre-intro screen for exactly 5 seconds
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          transitionToStep1();
        }, 5000);
      }
    });

    // 1. Scale/Zoom the SVG text mask (faster)
    tl.to(textRef.current, {
      scale: 150,
      transformOrigin: "center center",
      ease: "power2.out",
      duration: 2.0
    }, 0);

    // 2. Fade out mask overlay immediately
    tl.to(overlayRef.current, {
      opacity: 0,
      ease: "power2.out",
      duration: 2.0
    }, 0);

    // 3. Fade out initial scroll/tap prompt
    tl.to(mouseRef.current, {
      opacity: 0,
      duration: 0.4
    }, 0);

    // 4. Subtle zoom nature background
    tl.to(bgRef.current, {
      scale: 1.05,
      duration: 2.0,
      ease: "power2.out"
    }, 0);

    // 5. Fade in the pre-intro text overlay
    tl.set(preIntroRef.current, { display: 'flex' }, 0);
    tl.fromTo(preIntroRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.5, ease: "power2.out" },
      0.8
    );
  };

  const transitionToStep1 = () => {
    const tl = gsap.timeline({
      onComplete: () => {
        setCurrentStep(1);
        if (preIntroRef.current) {
          preIntroRef.current.style.display = 'none';
        }
      }
    });

    // 1. Fade out pre-intro text with a slide-up
    tl.to(preIntroRef.current, {
      opacity: 0,
      y: -40,
      duration: 0.8,
      ease: "power2.in"
    }, 0);

    // 2. Fade out nature background
    tl.to(bgRef.current, {
      opacity: 0,
      duration: 1.2,
      ease: "power2.out"
    }, 0.2);

    // 3. Fade in global video background (clouds)
    if (globalVideoRef && globalVideoRef.current) {
      tl.to(globalVideoRef.current, {
        opacity: 1,
        duration: 1.2,
        ease: "power2.out"
      }, 0.2);
    }
  };

  // Add global click/scroll event listeners for initial zoom trigger
  useEffect(() => {
    if (hasZoomed) return;

    const startJourney = () => {
      if (hasZoomedRef.current) return;
      hasZoomedRef.current = true;
      setHasZoomed(true);

      // Trigger audio & video playback
      if (setIsMuted) {
        setIsMuted(false);
      }
      if (globalCTAVideoRef && globalCTAVideoRef.current) {
        globalCTAVideoRef.current.play().catch((e) => {
          console.log("Audio play failed on gesture", e);
        });
      }

      runZoomAnimation();
    };

    const handleWheel = (e) => {
      if (e.deltaY !== 0) {
        startJourney();
      }
    };

    const handleTouchStart = () => {
      startJourney();
    };

    window.addEventListener('click', startJourney);
    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });

    return () => {
      window.removeEventListener('click', startJourney);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [hasZoomed, lenis, setIsMuted, globalCTAVideoRef]);

  // Handle slide transitions (fade in and slide up from half the page bottom to top)
  useGSAP(() => {
    if (currentStep >= 1 && currentStep <= 4) {
      gsap.killTweensOf(slideRef.current);
      
      gsap.fromTo(slideRef.current,
        {
          y: 120,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.0,
          delay: 0,
          ease: "power3.out",
          onComplete: () => {
            if (currentStep === 1) {
              isInitialZoomRef.current = false;
            }
          }
        }
      );
    }
  }, [currentStep]);

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleSkipOrFinish = () => {
    setIsIntroFinished(true);
    if (lenis) {
      lenis.start();
      const waitlistSection = document.getElementById('waitlist-section');
      if (waitlistSection) {
        lenis.scrollTo(waitlistSection, {
          duration: 1.5,
          ease: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
        });
      }
    }
  };

  const handleStartOver = () => {
    setIsIntroFinished(false);
    setCurrentStep(1);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (lenis) {
      lenis.stop();
      lenis.scrollTo(0, { immediate: true });
    }
    window.scrollTo(0, 0);
  };

  const stepsData = [
    {
      text: "You’ve been holding too much.",
      primaryText: "Next",
      secondaryText: "Skip",
      onPrimary: handleNext,
      onSecondary: handleSkipOrFinish
    },
    {
      text: "You don't have to carry it alone.",
      primaryText: "Next",
      secondaryText: "Skip",
      onPrimary: handleNext,
      onSecondary: handleSkipOrFinish
    },
    {
      text: "You can pause here.",
      primaryText: "Next",
      secondaryText: "Skip",
      onPrimary: handleNext,
      onSecondary: handleSkipOrFinish
    },
    {
      text: "We’re building something that makes the hard days easier to carry.",
      primaryText: "Finish",
      secondaryText: "Start Over",
      onPrimary: handleSkipOrFinish,
      onSecondary: handleStartOver
    }
  ];

  return (
    <div ref={containerRef} className="intro-container">
      {/* Background Layer */}
      <div 
        ref={bgRef} 
        className="intro-bg"
        style={{ backgroundImage: "url('/reviel_nature_bg.jpg')" }}
      />
      
      {/* Pre-Intro Screen Content */}
      <div 
        ref={preIntroRef} 
        className="pre-intro-content" 
        style={{ display: 'none', opacity: 0 }}
      >
        <h1 className="pre-intro-title">Come Back To Yourself.</h1>
        <p className="pre-intro-text">
          Reviel is a calm, intelligent companion that helps you reconnect, regulate, and feel supported every day.
        </p>
      </div>
      
      {/* SVG Mask Overlay */}
      {showMask && (
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
      )}

      {/* Tap/Scroll to Continue Prompt (Only in step 0, before zoom) */}
      {!hasZoomed && (
        <div 
          ref={mouseRef} 
          className="tap-to-continue"
          style={{ cursor: 'pointer' }}
        >
          <div className="mouse-icon"></div>
          <p>Scroll or Tap to Start</p>
        </div>
      )}

      {/* Narrative Interactive Steps */}
      {currentStep >= 1 && currentStep <= 4 && (
        <>
          {/* Circular Indicator Badge */}
          <div className="slide-indicator-badge">
            {currentStep}/4
          </div>

          {/* Cinematic Content */}
          <div className="cinematic-content" style={{ pointerEvents: 'auto' }}>
            <div ref={slideRef} className="cinematic-step active-step" style={{ opacity: 0, position: 'relative' }}>
              <h2>{stepsData[currentStep - 1].text}</h2>
              <div className="intro-btn-container">
                <button 
                  className="intro-btn-primary" 
                  onClick={stepsData[currentStep - 1].onPrimary}
                >
                  {stepsData[currentStep - 1].primaryText}
                </button>
                <button 
                  className="intro-btn-secondary" 
                  onClick={stepsData[currentStep - 1].onSecondary}
                >
                  {stepsData[currentStep - 1].secondaryText}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default IntroSection;
