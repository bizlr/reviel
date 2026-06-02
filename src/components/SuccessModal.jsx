import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const SuccessModal = ({ onClose, referralCode }) => {
  const overlayRef = useRef(null);
  const modalRef = useRef(null);
  const [copied, setCopied] = useState(false);

  const baseUrl = 'https://launch.reviel.app';
  const shareUrl = referralCode ? `${baseUrl}/${referralCode}` : baseUrl;
  const shareText = 'I just joined the Reviel waitlist — a calmer way to navigate life. Join me.';

  // Cleaned duplicate declarations;

  useEffect(() => {
    // Animate modal in
    const tl = gsap.timeline();
    tl.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'power2.out' });
    tl.fromTo(
      modalRef.current,
      { opacity: 0, y: 60, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'power3.out' },
      '-=0.2'
    );

    // Stagger animate the content sections
    tl.fromTo(
      '.success-modal-content > *',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: 'power2.out' },
      '-=0.3'
    );

    // Prevent body scroll while modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleClose = () => {
    const tl = gsap.timeline({
      onComplete: () => onClose && onClose(),
    });
    tl.to(modalRef.current, { opacity: 0, y: 40, scale: 0.97, duration: 0.3, ease: 'power2.in' });
    tl.to(overlayRef.current, { opacity: 0, duration: 0.25, ease: 'power2.in' }, '-=0.15');
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const input = document.createElement('input');
      input.value = shareUrl;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: 'Reviel', text: shareText, url: shareUrl });
    } else {
      handleCopyLink();
    }
  };

  const socialLinks = [
    {
      name: 'WhatsApp',
      url: `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      ),
    },
    {
      name: 'SMS',
      url: `sms:?body=${encodeURIComponent(shareText + ' ' + shareUrl)}`,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12zM7 9h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2z"/>
        </svg>
      ),
    },
    {
      name: 'X',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
    },
  ];

  return (
    <div className="success-modal-overlay" ref={overlayRef} onClick={handleClose}>
      <div className="success-modal" ref={modalRef} onClick={(e) => e.stopPropagation()}>
        {/* Close button */}
        <button className="success-modal-close" onClick={handleClose} aria-label="Close">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="success-modal-content">
          {/* Main heading */}
          <h2 className="success-modal-heading">YOU'RE IN.</h2>
          <p className="success-modal-subheading">Thank you for trusting us with this.</p>

          {/* Body text */}
          <div className="success-modal-body">
            <p>
              Reviel is being built slowly, with care. We'll open access in waves — quietly,
              so the experience stays grounded.
            </p>
            <p>
              You'll hear from us occasionally between now and then. Never noise. Only
              what matters.
            </p>
          </div>

          {/* Divider */}
          <div className="success-modal-divider"></div>

          {/* Share section */}
          <h3 className="success-modal-share-heading">CARRY SOMEONE WITH YOU</h3>
          <p className="success-modal-share-desc">
            If there's someone in your life carrying weight quietly — a friend, a
            coworker, a sibling — share Reviel with them. They'll arrive in the
            same wave you do.
          </p>

          {/* Action buttons */}
          <div className="success-modal-actions">
            <button className="success-modal-btn success-modal-btn-outline" onClick={handleShare}>
              Share Reviel
            </button>
            <button className="success-modal-btn success-modal-btn-filled" onClick={handleCopyLink}>
              {copied ? 'Copied!' : 'Copy link'}
            </button>
          </div>

          {/* Social share */}
          <p className="success-modal-or">OR SHARE TO</p>
          <div className="success-modal-socials">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="success-modal-social-icon"
                title={`Share on ${social.name}`}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
