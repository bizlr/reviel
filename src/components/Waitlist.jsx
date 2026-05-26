import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';

const Waitlist = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const [status, setStatus] = useState('idle'); // idle, loading, success, exists, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.name) return;

    setStatus('loading');
    try {
      // Directly send email without Firestore write
      const emailClean = formData.email.trim().toLowerCase();
      const nameParts = formData.name.trim().split(/\s+/);
      const firstname = nameParts[0] || '';
      const lastname = nameParts.slice(1).join(' ') || '';
      await fetch("https://services.bizlr.net/email/reviel.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstname, lastname, email: emailClean })
      });
      setStatus('success');
      setFormData({ name: '', email: '' });
    } catch (error) {
      console.error("Error submitting waitlist: ", error);
      setStatus('error');
    }
  };

  return (
    <div className="glass-card" style={{ textAlign: 'center' }}>
      <h2 className="waitlist-title">COME BACK TO YOURSELF.</h2>
      <p className="waitlist-desc" style={{ margin: '0 auto 32px' }}>
        Reviel is arriving soon. Be part of the growing community choosing a calmer way to navigate life.
      </p>

      {status === 'success' ? (
        <div className="success-message" style={{ padding: '40px 0' }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>You're on the list!</h3>
          <p style={{ opacity: 0.8 }}>Check your inbox for a welcome from Reviel.</p>
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default Waitlist;
