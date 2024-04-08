import React from 'react';

const HabitItem = ({ habit, onComplete }) => {
  const itemStyle = `border p-2 ${habit.completed ? 'line-through' : ''}`;

  return (
    <div className={`flex items-center justify-between ${itemStyle}`}>
      <span className="text-gray-800">{habit.name}</span>
      <button
        onClick={onComplete}
        className={`p-2 rounded ${habit.completed ? 'bg-green-300' : 'bg-red-300'}`}
      >
        {habit.completed ? 'Completed' : 'Incomplete'}
      </button>
    </div>
  );
};

export default HabitItem;
