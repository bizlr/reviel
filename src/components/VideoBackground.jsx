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
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
      // Ensure it's playing
      videoRef.current.play().catch(error => {
        console.log("Autoplay with sound was prevented. Browser policy requires user interaction.", error);
      });
    }
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
          top: 0,
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
          <source src="https://res.cloudinary.com/quinn-daisies-platform/video/upload/v1778958476/ARUKAH%20IMAGES/openart-8b4718b519351299ba9689274df6eb3a-2c484539-7418-45e1-bc92-7ac622986182_1778162984197_bf1fcc1e_1_nxnito.mp4" type="video/mp4" />
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
