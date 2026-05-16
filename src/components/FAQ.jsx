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
      answer: "Reviel is an intelligent companion designed to help you reconnect with yourself. It's not just another tool; it's a space for reflection, emotional regulation, and quiet support."
    },
    {
      question: "Is this just another AI app?",
      answer: "While powered by advanced technology, Reviel is built with a 'human-first' philosophy. We focus on depth, nuance, and genuine emotional resonance rather than just productivity or information."
    },
    {
      question: "Will this replace therapy or real support?",
      answer: "Never. Reviel is a complementary presence. It's designed to bridge the gaps between sessions and help you find your way back to the people who matter most."
    },
    {
      question: "What happens to what I share?",
      answer: "Your privacy is our foundation. Everything shared with Reviel is encrypted and belongs solely to you. We don't sell data; we build trust."
    },
    {
      question: "Is Reviel free to use?",
      answer: "We offer a generous free experience to ensure everyone has access to support. A premium version with deeper features will be available for those who want to support our mission."
    },
    {
      question: "Why does Reviel matter?",
      answer: "In a world that demands more of us every day, we need spaces that ask for less. Reviel matters because your mental well-being isn't a luxury—it's a necessity."
    },
    {
      question: "When can I experience it?",
      answer: "We are currently in a limited beta to ensure the experience is perfect. Join the waitlist above to be among the first to receive an invitation."
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
