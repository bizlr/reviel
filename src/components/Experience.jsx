import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const experiences = [
  {
    title: "Breathe",
    description: "Slow things down. Let your mind settle, one moment at a time. It's about finding that rhythm that works for you.",
    tags: ["Calm", "Stillness"],
    image: "/exp1.jpeg"
  },
  {
    title: "Connect",
    description: "Build a deeper relationship with your inner self. Discover the quiet strength that comes from being present.",
    tags: ["Self", "Presence"],
    image: "/exp2.jpeg"
  },
  {
    title: "Reflect",
    description: "Look out at the world with fresh eyes. Sometimes a change in perspective is all you need to find clarity.",
    tags: ["Perspective", "Clarity"],
    image: "/exp3.jpeg"
  },
  {
    title: "Restore",
    description: "Replenish your energy through mindful rest. Learn to listen to what your body and mind truly need.",
    tags: ["Rest", "Energy"],
    image: "/exp4.jpeg"
  },
  {
    title: "Savor",
    description: "Find joy in the simple things. A warm cup, a quiet seat, and the beauty of just being here.",
    tags: ["Joy", "Simple"],
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
            <h2 className="experience-headline">A softer way <br /> to be with <br /> yourself.</h2>
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
