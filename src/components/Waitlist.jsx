import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const Waitlist = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email) return;

    setStatus('loading');
    try {
      // Add to Firestore
      await addDoc(collection(db, "waitlist"), {
        ...formData,
        timestamp: serverTimestamp(),
        source: 'hero_waitlist'
      });
      
      setStatus('success');
      setFormData({ firstName: '', lastName: '', email: '' });
      
      // NOTE: To send the branded welcome email, 
      // you should install the "Trigger Email from Firestore" Firebase Extension
      // and configure it to watch the "waitlist" collection.
    } catch (error) {
      console.error("Error adding to waitlist: ", error);
      setStatus('error');
    }
  };

  return (
    <div className="glass-card" style={{ textAlign: 'center' }}>
      <h2 className="waitlist-title">Come back to yourself</h2>
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
          <div className="waitlist-grid">
            <div className="input-group" style={{ marginBottom: 0 }}>
              <input 
                type="text" 
                className="glass-input" 
                placeholder="First Name" 
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                required
              />
            </div>
            <div className="input-group" style={{ marginBottom: 0 }}>
              <input 
                type="text" 
                className="glass-input" 
                placeholder="Last Name" 
                value={formData.lastName}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                required
              />
            </div>
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
