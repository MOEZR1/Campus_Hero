import React from 'react';

const TaskItem = ({ task, completed, onMarkComplete }) => {
  return (
    <div className={`flex items-center justify-between ${completed ? 'line-through' : ''}`}>
      <span className="text-gray-800">{task}</span>
      <button
       onClick={onMarkComplete}
       className={`p-2 rounded ${completed ? 'bg-green-300' : 'bg-red-300'}`}>
       {completed ? 'Completed' : 'Incomplete'}
      </button>
    </div>
  );
};

export default TaskItem;
