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
          if (ctaVideoRef && ctaVideoRef.current) {
            ctaVideoRef.current.play().catch(e => console.log("ScrollTrigger CTA play call catch:", e));
          }
        },
        onLeaveBack: () => {
          gsap.to(globalVideoRef.current, { opacity: 1, duration: 1 });
        }
      });
    }
  }, { scope: sectionRef });

  React.useEffect(() => {
    const video = ctaVideoRef && ctaVideoRef.current;
    if (!video) return;

    let unmuteListener = null;

    const playVideo = async () => {
      video.muted = isMuted;
      try {
        await video.play();
      } catch (error) {
        console.log("CTA video autoplay with sound was prevented, falling back to muted.", error);
        video.muted = true;
        try {
          await video.play();
        } catch (mutedError) {
          console.log("CTA video muted playback failed too.", mutedError);
        }

        // If user expects sound but browser blocked it, unmute on next gesture
        if (!isMuted) {
          unmuteListener = async () => {
            video.muted = false;
            try {
              await video.play();
              console.log("Successfully unmuted CTA video on interaction gesture.");
            } catch (gestureErr) {
              console.log("Failed to unmute CTA video on gesture, reverting to muted.", gestureErr);
              video.muted = true;
            }
            cleanupListeners();
          };

          window.addEventListener('click', unmuteListener);
          window.addEventListener('touchstart', unmuteListener);
        }
      }
    };

    const cleanupListeners = () => {
      if (unmuteListener) {
        window.removeEventListener('click', unmuteListener);
        window.removeEventListener('touchstart', unmuteListener);
        unmuteListener = null;
      }
    };

    playVideo();

    return () => {
      cleanupListeners();
    };
  }, [isMuted, ctaVideoRef]);

  return (
    <section ref={sectionRef} className="bottom-cta-section">
      <video
        ref={ctaVideoRef}
        className="cta-bg-video"
        src="https://revielappstorage.blob.core.windows.net/revielappcontainer/YTDown_YouTube_No-Copyright-Drone-Shots-Royalty-free-dr_Media_iUtnZpzkbG8_001_1080p%20(1).mp4"
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
