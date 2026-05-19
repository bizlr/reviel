import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const experiences = [
  {
    title: "Notice",
    description: "Recognize emotional patterns early before overwhelm begins to build quietly in the background.",
    tags: ["Awareness", "Patterns"],
    image: "/exp1.jpeg"
  },
  {
    title: "Reset",
    description: "Create space to slow down, regulate your thoughts, and regain emotional balance during difficult moments.",
    tags: ["Regulation", "Balance"],
    image: "/exp2.jpeg"
  },
  {
    title: "Reflect",
    description: "Step back from the noise and understand what your mind and emotions may be trying to tell you.",
    tags: ["Clarity", "Perspective"],
    image: "/exp3.jpeg"
  },
  {
    title: "Reconnect",
    description: "Strengthen your connection to yourself and the people around you before stress creates emotional distance.",
    tags: ["Connection", "Support"],
    image: "/exp4.jpeg"
  },
  {
    title: "Recover",
    description: "Restore your mental and emotional energy before exhaustion turns into burnout.",
    tags: ["Recovery", "Energy"],
    image: "/exp5.jpeg"
  }
];

const Experience = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % experiences.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + experiences.length) % experiences.length);
  };

  const current = experiences[currentIndex];
  const next = experiences[(currentIndex + 1) % experiences.length];

  return (
    <section className="experience-section">
      <div className="container full-height-container">
        <div className="experience-grid">
          <div className="experience-text-content">
            <div className="label-with-line">
              <span>EXPERIENCE WE OFFER</span>
              <div className="label-line"></div>
            </div>
            <h2 className="experience-headline">Helping you <br /> reconnect before <br />burnout takes over.</h2>
            <p className="experience-description">
              {current.description}
            </p>
            <div className="experience-nav">
              <div className="nav-arrows">
                <button className="nav-btn" onClick={prevSlide} aria-label="Previous slide"><ArrowLeft size={20} /></button>
                <button className="nav-btn" onClick={nextSlide} aria-label="Next slide"><ArrowRight size={20} /></button>
              </div>
              <span className="pagination">
                {String(currentIndex + 1).padStart(2, '0')} / {String(experiences.length).padStart(2, '0')}
              </span>
            </div>
          </div>

          <div className="experience-visuals">
            {/* Back Card (Previews next slide) */}
            <div className="experience-card card-back" key={`back-${(currentIndex + 1) % experiences.length}`}>
              <img src={next.image} alt={next.title} />
            </div>

            {/* Front Card (Current slide) */}
            <div className="experience-card card-front" key={`front-${currentIndex}`}>
              <img src={current.image} alt={current.title} />
              <div className="card-overlay">
                <h3>{current.title}</h3>
                <p>{current.description.split('.')[0]}.</p>
                <div className="card-tags">
                  {current.tags.map((tag, i) => (
                    <span key={i} className="card-tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
