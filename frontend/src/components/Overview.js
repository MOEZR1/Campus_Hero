import React, { useState, useEffect } from 'react';

const motivationalQuotes = [
    "Don’t let yesterday take up too much of today.",
    "The only way to do great work is to love what you do.",
    "Opportunities don't happen, you create them.",
    "It’s not whether you get knocked down, it’s whether you get up.",
    // ... other quotes
  ];

const Overview = () => {
  const [quote, setQuote] = useState('');

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
    setQuote(motivationalQuotes[randomIndex]);
  }, []);

  return (
    <div className="overview-section">
      <p className="motivational-quote">{quote}</p>
    </div>
  );
};

export default Overview;
