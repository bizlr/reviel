import React from 'react';

const Testimonials = () => {
  const reviewsRow1 = [
    { text: "Most apps feel noisy. Reviel feels like silence in the best way.", author: "Michael", color: "rgba(224, 242, 254, 0.85)" },
    { text: "I didn't realize how much I needed a calm space until I found this.", author: "Zara", color: "rgba(239, 246, 255, 0.85)" },
    { text: "It feels strangely human... like it actually understands when I'm overwhelmed.", author: "Ethan", color: "rgba(255, 228, 230, 0.85)" },
    { text: "Reviel gives me the feeling of slowing down without feeling guilty for it.", author: "Sofia", color: "rgba(220, 252, 231, 0.85)" },
  ];

  const reviewsRow2 = [
    { text: "The voices inside feel like they're closing in on you.", author: "Elena", color: "rgba(220, 252, 231, 0.85)" },
    { text: "I honestly didn't think an app could feel this gentle", author: "Noah", color: "rgba(219, 234, 254, 0.85)" },
    { text: "Reviel reminds me that I don't always have to rush.", author: "Priya", color: "rgba(238, 242, 255, 0.85)" },
    { text: "It feels safe here. That's the best way I can explain it.", author: "Marcus", color: "rgba(255, 228, 230, 0.85)" },
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
