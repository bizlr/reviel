import React from 'react';

const Testimonials = () => {
  const reviewsRow1 = [
    { text: "I tested it during a really chaotic week and it somehow made me notice how disconnected I’d been feeling.", author: "Michael", color: "rgba(224, 242, 254, 0.85)" },
    { text: "There was one day it noticed my energy shift before I consciously did. That surprised me.", author: "Zara", color: "rgba(239, 246, 255, 0.85)" },
    { text: "It made me realize how often I say I’m ‘just tired’ when I’m actually overwhelmed.", author: "Ethan", color: "rgba(255, 228, 230, 0.85)" },
    { text: "The app felt most useful on the days I didn’t know how to explain what I was feeling.", author: "Sofia", color: "rgba(220, 252, 231, 0.85)" },
  ];

  const reviewsRow2 = [
    { text: "What stood out to me wasn’t the design or features,  it was how specific some of the reflections felt to my actual week.", author: "Elena", color: "rgba(220, 252, 231, 0.85)" },
    { text: "I opened Reviel at 2am after doomscrolling for almost an hour. The check-in made me realize I hadn’t actually paused all day.", author: "Noah", color: "rgba(219, 234, 254, 0.85)" },
    { text: "The burnout insights made me realize I’ve been running on autopilot for weeks without noticing.", author: "Priya", color: "rgba(238, 242, 255, 0.85)" },
    { text: "The experiences feel less forced and more like someone asking the right question at the right time.", author: "Marcus", color: "rgba(255, 228, 230, 0.85)" },
  ];

  return (
    <section className="testimonial-section">
      <div className="container" style={{ marginBottom: '80px' }}>
        <div className="label-centered">
          <div className="label-line-short"></div>
          <span>TESTIMONIAL</span>
          <div className="label-line-short"></div>
        </div>
        <h2 className="testimonial-headline">Early reactions from <br /> test users</h2>
      </div>

      <div className="marquee-wrapper">
        <div className="marquee-container marquee-right">
          {[...reviewsRow1, ...reviewsRow1].map((review, i) => (
            <div
              key={i}
              className={`testimonial-card ${i >= reviewsRow1.length ? 'mobile-only-card' : ''}`}
              style={{ backgroundColor: review.color }}
            >
              <p className="testimonial-text">
                "{review.text}"
              </p>
              <p className="testimonial-author">{review.author}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="marquee-wrapper" style={{ marginTop: '32px' }}>
        <div className="marquee-container">
          {[...reviewsRow2, ...reviewsRow2].map((review, i) => (
            <div
              key={i}
              className={`testimonial-card ${i >= reviewsRow2.length ? 'mobile-only-card' : ''}`}
              style={{ backgroundColor: review.color }}
            >
              <p className="testimonial-text">
                "{review.text}"
              </p>
              <p className="testimonial-author">{review.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
