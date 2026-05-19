import React, { useState } from 'react';
import { Camera, Send, Globe } from 'lucide-react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const Footer = () => {
  return (
    <footer className="main-footer-section">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="logo" style={{ marginBottom: '24px' }}>
              <img src="/logo_reviel.png" alt="Reviel Logo" style={{ height: '22px' }} />
            </div>
            <p className="footer-desc">
              Reviel is almost ready. Leave your details and we'll gently let you know the moment the app is available on the App store and Play Store.
            </p>
          </div>

          <div className="footer-links-col">
            <h3 className="footer-heading">Legal</h3>
            <ul className="footer-links-list">
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Cookies</a></li>
            </ul>
          </div>

          <div className="footer-links-col">
            <h3 className="footer-heading">Social</h3>
            <ul className="footer-links-list">
              <li><a href="#">Instagram</a></li>
              <li><a href="#">Twitter</a></li>
              <li><a href="#">Titktok</a></li>
              <li><a href="#">Facebook</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 Reviel All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
