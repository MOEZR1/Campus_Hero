import React, { useState } from 'react';
import '../App.css'; // Adjust the path if your App.css is in a different location


const HabitTracking = () => {
  const [habits, setHabits] = useState([]); // State to store habits

  const addHabit = (habit) => {
    setHabits([...habits, habit]); // Add new habit to state
  };

  const handleDeleteHabit = (index) => {
    const updatedHabits = [...habits];
    updatedHabits.splice(index, 1); // Remove habit from state
    setHabits(updatedHabits);
  };

  return (
    <div className="bg-white px-4 py-8">
      <div className="flex flex-col space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Habit Tracking</h1>
          <button className="px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Add Habit
          </button>
        </div>

        <div className="bg-gray-100 rounded-lg shadow-md px-4 py-6">
          <HabitForm onAddHabit={addHabit} /> {/* Habit form component */}
        </div>

        {habits.map((habit, index) => (
          <HabitCard key={index} habit={habit} onDelete={() => handleDeleteHabit(index)} /> // Habit cards based on state
        ))}
      </div>
    </div>
  );
};

export default HabitTracking;

// HabitForm component (replace with your form implementation)
const HabitForm = ({ onAddHabit }) => {
  // ... form logic and state management for habit details ...

  const handleSubmit = (event) => {
    event.preventDefault();
    const newHabit = {
      // Extract habit details from form
    };
    onAddHabit(newHabit); // Call addHabit function with new habit object
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Habit form fields */}
      <button type="submit" className="w-full px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
        Save
      </button>
    </form>
  );
};

// HabitCard component
const HabitCard = ({ habit, onDelete }) => {
  return (
    <div className="bg-gray-100 rounded-lg shadow-md px-4 py-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">{habit.name}</h2>
        <button className="px-3 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500" onClick={onDelete}>
          Edit
        </button>
      </div>
      <p className="text-gray-600 mt-2">{habit.frequency} - {habit.goal}</p>
    </div>
  );
};
