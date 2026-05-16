import React, { useState } from 'react';
import { Camera, Send, Globe } from 'lucide-react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    try {
      await addDoc(collection(db, "newsletter"), {
        email,
        timestamp: serverTimestamp(),
        source: 'footer_newsletter'
      });
      setStatus('success');
      setEmail('');
    } catch (error) {
      console.error("Error subscribing: ", error);
      setStatus('error');
    }
  };

  return (
    <footer className="main-footer-section">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="logo" style={{ marginBottom: '24px' }}>
              <img src="/logo_reviel.png" alt="Reviel Logo" style={{ height: '22px' }} />
            </div>
            <p style={{ opacity: 0.7, maxWidth: '320px', fontSize: '0.95rem', marginBottom: '32px', lineHeight: '1.6' }}>
              Reviel is a space for reconnection. Experience a calmer way to navigate life's complexities with gentle, intelligent support.
            </p>
            
            {status === 'success' ? (
              <p style={{ color: 'white', fontWeight: 600 }}>Thanks for joining our newsletter!</p>
            ) : (
              <form className="footer-newsletter" onSubmit={handleSubscribe}>
                <input 
                  type="email" 
                  className="newsletter-input"
                  placeholder="your@email.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button className="newsletter-btn" type="submit" disabled={status === 'loading'}>
                  {status === 'loading' ? '...' : 'Join'}
                </button>
              </form>
            )}
            {status === 'error' && <p style={{ color: '#ff4444', fontSize: '0.8rem', marginTop: '10px' }}>Error. Try again.</p>}
          </div>
          
          <div className="footer-links-col">
            <h3 className="footer-heading">Legal</h3>
            <ul className="footer-links-list">
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Cookie Settings</a></li>
            </ul>
          </div>
          
          <div className="footer-links-col">
            <h3 className="footer-heading">Social</h3>
            <ul className="footer-social-list">
              <li><a href="#"><Camera size={18} /> <span>Instagram</span></a></li>
              <li><a href="#"><Send size={18} /> <span>Twitter</span></a></li>
              <li><a href="#"><Globe size={18} /> <span>Facebook</span></a></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>© 2026 Reviel. All rights reserved. Crafted with care for your peace of mind.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
