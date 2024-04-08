import React from 'react';
import '../App.css'; // Make sure to create a corresponding CSS file
import memberImage1 from '../images/a1.png';
import memberImage2 from '../images/boy.png';
import memberImage3 from '../images/man.png';
import memberImage4 from '../images/man2.png';
import memberImage5 from '../images/man3.png';




const About = () => {
  // Replace these with the actual image URLs for your team members
  const teamMembers = [
    { name: 'Mohammed Albahly', imageUrl: memberImage1,  },
    { name: 'Josh Yeung',  imageUrl: memberImage2,  },
    { name: 'Adam Hanno',  imageUrl: memberImage3,  },
    { name: 'Ryan Jackson', imageUrl: memberImage4,  },
    { name: 'Cathal McFadden', imageUrl: memberImage5,  },

    // ... other team members
  ];
  return (
    <div className="about-container">
      <title>About Us</title>
      <section className="intro-section">
        <h1>About</h1>
        <p>We're a team of five passionate students who understand the challenges of juggling coursework, deadlines, extracurriculas, and personal well-being. Having experienced these struggles ourselves, we created Campus Habit Hero to empower students to thrive - in their studies and in life. Our app is designed to be your ultimate student success sidekick, helping you build positive habits, stay organised, achieve your goals, and access valuable resources for mental health, productivity, and study skills. We believe every student deserves to reach their full potential, and our mission is to make the journey easier, healthier, and more fulfilling.  </p>
      </section>

      <section className="team-section">
        <h2>Meet the team</h2>
        <div className="team-members">
          {teamMembers.map(member => (
            <div className="team-member" key={member.name}>
              <img
                src={member.imageUrl}
                alt={member.name}
                className="member-avatar"
              />
              <h3>{member.name}</h3>
              <p>{member.title}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;