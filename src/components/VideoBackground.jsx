import React, { forwardRef, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const VideoBackground = forwardRef(({ isMuted }, ref) => {
  const contentRef = useRef(null);
  const videoRef = useRef(null);

  useGSAP(() => {
    // Parallax movement
    gsap.fromTo(contentRef.current,
      { yPercent: -10 },
      {
        yPercent: 10,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 1 // Smooth scrub
        }
      }
    );
  }, { scope: contentRef });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let unmuteListener = null;

    const playVideo = async () => {
      video.muted = isMuted;
      try {
        await video.play();
      } catch (error) {
        console.log("Global bg video autoplay with sound was prevented, falling back to muted.", error);
        video.muted = true;
        try {
          await video.play();
        } catch (mutedError) {
          console.log("Global bg video muted playback failed too.", mutedError);
        }

        // If user expects sound but browser blocked it, unmute on next gesture
        if (!isMuted) {
          unmuteListener = async () => {
            video.muted = false;
            try {
              await video.play();
              console.log("Successfully unmuted global bg video on interaction gesture.");
            } catch (gestureErr) {
              console.log("Failed to unmute global bg video on gesture, reverting to muted.", gestureErr);
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
  }, [isMuted]);

  return (
    <div
      ref={ref}
      className="global-video-bg"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        opacity: 0,
        overflow: 'hidden',
        pointerEvents: 'none'
      }}
    >
      <div
        ref={contentRef}
        className="video-content-wrapper"
        style={{
          position: 'absolute',
          left: 0,
          width: '100%',
          height: '120%', // Provide bleed for movement
          top: '-10%'
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          muted={isMuted}
          loop
          playsInline
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        >
          <source src="https://revielappstorage.blob.core.windows.net/revielappcontainer/openart-8b4718b519351299ba9689274df6eb3a-2c484539-7418-45e1-bc92-7ac622986182_1778162984197_bf1fcc1e%20(1).mp4" type="video/mp4" />
        </video>
        {/* Subtle overlay for better text contrast */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(10, 15, 30, 0.15)',
          zIndex: 1
        }} />
      </div>
    </div>
  );
});

export default VideoBackground;
