import React from 'react';
import budgetingImage from '../images/budget.png'; // Ensure the path is correct
import mentalHealthImage from '../images/mental-health.png'; // Ensure the path is correct
import productivityImage from '../images/productivity.png'; // Ensure the path is correct
import studyTipsImage from '../images/studying.png'; // Ensure the path is correct


function ResourceHub() {
  return (
    <div className="min-h-screen bg-white mt-20">
           <title>Resource Hub</title>

      {/* Main content */}
      <main className="container mx-auto py-8 bg-white">
        {/* Title and message */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-semibold">Resource Hub</h1>
          <p className="text-gray-600 mt-2 text-2xl">Access a wealth of information to support your personal growth and well-being.</p>
        </div>

        {/* Category sections */}
        <section className="max-w-4xl mx-auto bg-white">
          <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-8 flex items-center justify-center">
            <div>
              <img src={budgetingImage} alt="Budgeting" className="mx-auto h-32 w-32 md:h-40 md:w-40 lg:h-48 lg:w-48 xl:h-56 xl:w-80 rounded-lg" />
            </div>
            <div className="ml-6">
              <h2 className="text-lg font-semibold">Budgeting</h2>
              <p className="text-gray-600 mt-1 mb-3">Discover tips for managing your finances, including budgeting, saving money, and setting financial goals.</p>
              <a href="https://www.ucas.com/money-and-student-life/money/budgeting/student-budgeting-tips" target="_blank" rel="noopener noreferrer" className="btn mt-5 border border-blue-500 rounded-lg px-3 py-2">View article</a>
            </div>
          </div>
        </section>



        <section className="max-w-4xl mx-auto bg-white">
          <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-8 flex items-center justify-center">
            <div>
              <img src={mentalHealthImage} alt="Mental Health" className="mx-auto h-32 w-32 md:h-40 md:w-40 lg:h-48 lg:w-48 xl:h-56 xl:w-80 rounded-lg" />
            </div>
            <div className="ml-6">
              <h2 className="text-lg font-semibold">Mental Health</h2>
              <p className="text-gray-600 mt-1 mb-3">Access a variety of resources to help you manage stress, cope with anxiety, and improve your overall mental well-being.</p>
              <a href="https://www.ucas.com/money-and-student-life/student-life/mental-health-and-wellbeing/sharing-mental-health-condition-your-application#:~:text=On%20your%20UCAS%20application%2C%20you,help%20put%20you%20at%20ease." target="_blank" rel="noopener noreferrer" className="btn mt-5 border border-blue-500 rounded-lg px-3 py-2">View article</a>
            </div>
          </div>
        </section>



        <section className="max-w-4xl mx-auto bg-white">
          <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-8 flex items-center justify-center">
            <div>
              <img src={productivityImage} alt="Productivity" className="mx-auto h-32 w-32 md:h-40 md:w-40 lg:h-48 lg:w-48 xl:h-56 xl:w-80 rounded-lg" />
            </div>
            <div className="ml-6">
              <h2 className="text-lg font-semibold">Productivity</h2>
              <p className="text-gray-600 mt-1 mb-3">Learn how to boost your productivity, master time management, and stay focused on your goals.</p>
              <a href="https://www.ucas.com/connect/blogs/how-fill-your-spare-time" target="_blank" rel="noopener noreferrer" className="btn mt-5 border border-blue-500 rounded-lg px-3 py-2">View article</a>
            </div>
          </div>
        </section>



        <section className="max-w-4xl mx-auto bg-white">
          <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-8 flex items-center justify-center">
            <div>
              <img src={studyTipsImage} alt="Study Tips" className="mx-auto h-32 w-32 md:h-40 md:w-40 lg:h-48 lg:w-48 xl:h-56 xl:w-80 rounded-lg" />
            </div>
            <div className="ml-6">
              <h2 className="text-lg font-semibold">Study Tips</h2>
              <p className="text-gray-600 mt-1 mb-3">Explore resources to help you improve your study habits, ace exams, and enhance your learning experience.</p>
              <a href="https://www.ucas.com/money-and-student-life/student-life/study-skills-guides" target="_blank" rel="noopener noreferrer" className="btn mt-5 border border-blue-500 rounded-lg px-3 py-2">View article</a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default ResourceHub;
