import React from 'react';

const UpcomingDeadlines = ({ deadlines }) => {
  // Format the deadlines into a more readable format or leave them as is
  // You could also sort them by the closest deadline first

  return (
    <div className="upcoming-deadlines">
      <ul>
        {deadlines.map(deadline => (
          <li key={deadline._id}>
            {deadline.task} - Due on {new Date(deadline.dueDate).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UpcomingDeadlines;
