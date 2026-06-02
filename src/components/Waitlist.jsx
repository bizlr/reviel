import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, query, where, getDocs, limit, addDoc, serverTimestamp } from 'firebase/firestore';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import SuccessModal from './SuccessModal';

const Waitlist = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const [status, setStatus] = useState('idle'); // idle, loading, success, exists, error
  const [referralCode, setReferralCode] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.name) return;

    setStatus('loading');
    try {
      const emailClean = formData.email.trim().toLowerCase();
      const nameParts = formData.name.trim().split(/\s+/);
      const firstname = nameParts[0] || '';
      const lastname = nameParts.slice(1).join(' ') || '';

      // Check for duplicate email in Firestore "waitlist" collection
      const q = query(collection(db, 'waitlist'), where('email', '==', emailClean), limit(1));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        setStatus('exists');
        return;
      }

      // Generate unique referral code (6 alphanumeric characters)
      const generateCode = async () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let code = '';
        for (let i = 0; i < 6; i++) {
          code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        // Check for collisions in Firestore
        const q = query(collection(db, 'waitlist'), where('referralCode', '==', code), limit(1));
        const snap = await getDocs(q);
        if (!snap.empty) {
          // Collision, retry recursively (max attempts limited by stack depth)
          return generateCode();
        }
        return code;
      };
      const code = await generateCode();
      setReferralCode(code);

      // Add new entry to Firestore with referral code
      await addDoc(collection(db, 'waitlist'), {
        name: formData.name,
        email: emailClean,
        referralCode: code,
        createdAt: serverTimestamp(),
      });

      // Send confirmation email
      await fetch("https://services.bizlr.net/email/reviel.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstname, lastname, email: emailClean })
      });

      setStatus('success');
      setShowModal(true);
      setFormData({ name: '', email: '' });
    } catch (error) {
      console.error("Error submitting waitlist: ", error);
      setStatus('error');
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setStatus('idle');
  };

  useGSAP(() => {
    // Fade in the form glass-card on mount
    gsap.from('.glass-card', {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: 'power2.out',
    });
  });

  return (
    <>
      <div className="glass-card">
        <h2 className="waitlist-title">COME BACK TO YOURSELF.</h2>
        <p className="waitlist-desc" style={{ margin: '0 auto 32px' }}>
          Reviel is arriving soon. Be part of the growing community choosing a calmer way to navigate life.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="input-group" style={{ marginBottom: '20px' }}>
            <input 
              type="text" 
              className="glass-input" 
              placeholder="Your Name" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>
          <div className="input-group" style={{ marginBottom: '32px' }}>
            <input 
              type="email" 
              className="glass-input" 
              placeholder="Email Address" 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>
          <button 
            type="submit"
            className="btn-primary" 
            style={{ borderRadius: '40px', padding: '20px' }}
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Joining...' : 'Get Early Access'}
          </button>
          {status === 'exists' && (
            <p style={{ color: '#fbbf24', marginTop: '15px', fontSize: '0.9rem' }}>
              This email is already registered on our waitlist!
            </p>
          )}
          {status === 'error' && (
            <p style={{ color: '#ff4444', marginTop: '15px', fontSize: '0.9rem' }}>
              Something went wrong. Please try again.
            </p>
          )}
        </form>
      </div>

      {/* Success Modal */}
      {showModal && <SuccessModal referralCode={referralCode} onClose={handleCloseModal} />}
    </>
  );
};

export default Waitlist;
