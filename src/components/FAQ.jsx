import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="faq-item">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="faq-trigger"
      >
        <span>{question}</span>
        <div className={`faq-icon ${isOpen ? 'open' : ''}`}>
          <ChevronDown size={24} />
        </div>
      </button>
      <div className={`faq-content-wrapper ${isOpen ? 'open' : ''}`}>
        <div className="faq-content">
          <div className="faq-content-inner">
            {answer || "Reviel is designed to be a gentle, intelligent presence in your life, helping you navigate complex emotions and daily stresses with ease and clarity."}
          </div>
        </div>
      </div>
    </div>
  );
};

const FAQ = () => {
  const faqData = [
    {
      question: "What is Reviel, really?",
      answer: "Reviel isn't here to replace your life. It's here to sit with you in it. A quiet place to pause, reflect, and feel heard, without pressure, without judgment, and when you're ready, Reviel gently helps you reconnect, not just with yourself, but with the people who matter in your life."
    },
    {
      question: "Is this just another AI app?",
      answer: "No. Most Al tries to keep you engaged, Reviel is built to help you step away, and if a real conversation, a friend, or someone you trust is what you need, Reviel will guide you back to that, because real connection isn't something we replace, it's something we protect."
    },
    {
      question: "Will this replace therapy or real support?",
      answer: "No, and it's not meant to. Reviel is a gentle presence, not a professional or a replacement for real help, but in the quiet moments, when you don't know what to say or who to reach, it helps you take that first step toward feeling steady again."
    },
    {
      question: "What happens to what I share?",
      answer: "What you share stays yours. No selling, no hidden use, no exposure, just a private space where you can be honest, even on the days you don't have the words."
    },
    {
      question: "Is Reviel free to use?",
      answer: "The core experience is free, always. We may offer a gentle premium tier later for deeper reflection tools, but the heart of Reviel will remain free for everyone."
    },
    {
      question: "Why does Reviel matter?",
      answer: "Because people are carrying more than they show, because not every moment needs fixing, some just need space, and because sometimes you don't need advice, you just need to feel understood"
    },
    {
      question: "When can I experience it?",
      answer: "Soon. We're taking time to build this carefully, because something that meets people in vulnerable moments has to be done right, and if this speaks to you, you'll be the first to know when it's ready"
    }
  ];

  return (
    <section className="faq-section">
      <div className="container faq-grid">
        <div className="faq-text-side">
          <div className="faq-label-container">
            <span>FREQUENTLY ASKED QUESTIONS</span>
            <div className="faq-label-line"></div>
          </div>
          <h2 className="faq-headline">
            Everything you <br /> might be <br /> wondering.
          </h2>
          <p className="faq-subtext">
            You don't need perfect questions. Just honesty. <br />
            We'll meet you there.
          </p>
        </div>

        <div className="faq-accordion-side">
          {faqData.map((item, i) => (
            <FAQItem key={i} question={item.question} answer={item.answer} />
          ))}

          <div className="faq-bottom-quote">
            Reviel won't replace the people in your life. <br />
            It helps you find your way back to them.
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
