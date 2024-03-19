import React from 'react';
import '../App.css'; // Make sure to create a Home.css file for styling

function Home() {
  return (
    
    <div className="home">
      {/* Header Section */}
      <title>Home Page</title>
      
      {/* Hero Section */}
      <section className="home-hero">
        <h1 className="home-title">Campus Habit Hero</h1>
        <p className="home-subtitle">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <button className="home-button">Button</button>
      </section>
      
      {/* Features Section */}
      <section className="home-features">
        {/* Repeat this block for each feature */}
        <div className="home-feature">
          <h2 className="home-feature-title">Lorem ipsum</h2>
          <p className="home-feature-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <div className="home-feature-icon"></div>
          <h3 className="home-feature-card-title">Lorem ipsum</h3>
          <p className="home-feature-card-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
        {/* ... */}
      </section>
      
      {/* Footer Section */}

    </div>
  );
}

export default Home;
