import React from 'react';

// FAQ data structure
const faqs = [
  {
    question: 'What is Campus Habit Hero?',
    answer:
      'Campus Habit Hero is the all-in-one app designed to help students power up their academics, prioritise their well-being, and find support within their campus community.',
  },
  {
    question: 'How much does it cost?',
    answer: 'Campus Habit Hero is completely free for students!',
  },
  {
    question: 'What kind of resources will be in the Resource Hub?',
    answer:
      'Articles, videos, and tools covering everything from stress management and healthy eating to study tips and career advice. Hand-picked and regularly updated!',
  },
  {
    question: 'Can I suggest features I\'d like to see?',
    answer: 'Yes! We\'re always looking for student feedback. Send your ideas to the \'Contact Us\' page.',
  },
  {
    question: 'How are the habit trackers different from other apps?',
    answer: 'Our habit trackers let you go beyond simple checklists. Set goals, track progress over time, and earn rewards to keep you motivated.',
  },
];

const FAQs = () => {
  return (
    <div className="container mx-auto p-8" > 
          <title>FAQs</title>

      <h1 className="text-5xl font-bold text-center mb-6"><br/><br/>FAQs</h1>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-2">{faq.question}</h2>
            <p>{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQs;
