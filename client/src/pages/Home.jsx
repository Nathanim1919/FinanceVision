import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Empower Your Finances, Unleash Your Potential</h1>
        <p>Transform the way you manage money. Our personal finance app is designed to help you take charge, plan for the future, and thrive financially.</p>
        <div className="cta-buttons">
          <Link to="/signup">
            <button className="get-started">Get Started for Free</button>
          </Link>
          <Link to="/learn-more">
            <button className="learn-more">Learn More</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
