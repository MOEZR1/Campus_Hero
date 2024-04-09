import React from 'react';
import '../App.css'; // Adjust the path if your App.css is in a different location
import studyImage from '../images/study-tips.jpg';
import study1Image from '../images/study.jpg';
import { Link, useNavigate } from 'react-router-dom';


function Home() {
  return (
    
    <div className="home">
      <title>Home</title>

    {/* Title Section */}
    <section className="title">

      <h1 className="home-title"><b>Campus Habit Hero</b></h1>

      <p className="home-subtitle">Empowering you to achieve peak efficiency, healthy habits, and overall fulfillment throughout your academic journey.  </p>

      <Link to="/login" className="home-button">Login</Link>

    </section>
    
    {/* Info Section */}
    <section className="section-1">

      <div className="section-1-heading">
       
      </div>

      <div className="section-1-content">
        <h1><b>Habit Tracking</b></h1>

        <p>Build positive routines and monitor progress across academics, health, and personal development.</p>
      </div>

      <div className="section-1-img">
        <img src={studyImage} alt="placeholder"/>
      </div>

    </section>

    <section className="section-2">

      <div className="section-2-img">
        <img src={study1Image} alt="placeholder" />
      </div>

      <div className="section-2-content">
        <h1><b>Organisation Tools</b></h1>

        <p>Manage deadlines and assignments seamlessly with a clear calendar interface, customisable reminders, and detailed task description. </p>
      </div>

</section>

  </div>
  );
}

export default Home;
