import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Share2, Link, Check, ArrowLeft } from 'lucide-react';
import '../components/Modal.css'; // Reuse glassmorphism styling tokens

const SharePage = () => {
  const [searchParams] = useSearchParams();
  const referralCode = searchParams.get('ref') || '';
  const [copied, setCopied] = useState(false);

  const baseUrl = 'https://launch.reviel.app';
  const shareUrl = referralCode ? `${baseUrl}?ref=${referralCode}` : baseUrl;
  const shareText = 'I just joined the Reviel waitlist — where clarity returns. Join me.';

  // Automatically trigger navigator.share if available (requires a user interaction, so we show a button)
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Reviel',
          text: shareText,
          url: shareUrl,
        });
      } catch (err) {
        console.log('Share canceled or failed:', err);
      }
    } else {
      handleCopyLink();
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
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

  return (
    <div style={containerStyle}>
      {/* Background layer */}
      <div style={bgOverlayStyle} />

      <div style={cardStyle} className="glass-card">
        <div style={{ marginBottom: '24px' }}>
          <img 
            src="/logo_reviel.png" 
            alt="Reviel Logo" 
            style={{ maxHeight: '40px', width: 'auto' }} 
          />
        </div>

        <h2 style={titleStyle}>CARRY SOMEONE WITH YOU</h2>
        
        <p style={descriptionStyle}>
          If there's someone in your life carrying weight quietly, share Reviel with them. They'll arrive in the same wave you do.
        </p>

        <div style={btnContainerStyle}>
          <button onClick={handleShare} style={primaryBtnStyle}>
            <Share2 size={18} style={{ marginRight: '8px' }} />
            Share Early Access
          </button>
          
          <button onClick={handleCopyLink} style={secondaryBtnStyle}>
            {copied ? <Check size={18} style={{ marginRight: '8px' }} /> : <Link size={18} style={{ marginRight: '8px' }} />}
            {copied ? 'Copied Link!' : 'Copy Referral Link'}
          </button>
        </div>

        <div style={{ marginTop: '32px' }}>
          <a href="/" style={backLinkStyle}>
            <ArrowLeft size={16} style={{ marginRight: '6px' }} />
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
};

const containerStyle = {
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '20px',
  position: 'relative',
  color: '#fff',
  overflow: 'hidden',
};

const bgOverlayStyle = {
  position: 'absolute',
  inset: 0,
  background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
  zIndex: -1,
};

const cardStyle = {
  maxWidth: '500px',
  width: '100%',
  padding: '40px 30px',
  textAlign: 'center',
  borderRadius: '24px',
  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
};

const titleStyle = {
  fontFamily: 'var(--font-serif, "EB Garamond", serif)',
  fontSize: '1.5rem',
  letterSpacing: '2px',
  color: '#f8fafc',
  marginBottom: '16px',
};

const descriptionStyle = {
  fontFamily: '"Inter", sans-serif',
  fontSize: '0.95rem',
  lineHeight: '1.6',
  color: '#cbd5e1',
  marginBottom: '32px',
};

const btnContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
};

const primaryBtnStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#fff',
  color: '#0f172a',
  border: 'none',
  borderRadius: '30px',
  padding: '14px 24px',
  fontSize: '0.95rem',
  fontWeight: '600',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
};

const secondaryBtnStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(255, 255, 255, 0.08)',
  color: '#fff',
  border: '1px solid rgba(255, 255, 255, 0.15)',
  borderRadius: '30px',
  padding: '14px 24px',
  fontSize: '0.95rem',
  fontWeight: '500',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
};

const backLinkStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  color: '#94a3b8',
  textDecoration: 'none',
  fontSize: '0.9rem',
  transition: 'color 0.2s ease',
};

export default SharePage;
