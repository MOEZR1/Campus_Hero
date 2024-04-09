import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context/userContext'; // assuming you have a context for user

const HabitTracking = () => {
  const [habits, setHabits] = useState([]);
  const { user } = useContext(UserContext); // Get user from context

  useEffect(() => {
    // Fetch habits when the component mounts
    const fetchHabits = async () => {
      if (user) {
        try {
          const response = await axios.get('/habit', {
            headers: {
              Authorization: `Bearer ${user.token}`, // Assuming you store token in user context
            },
          });
          setHabits(response.data);
        } catch (error) {
          console.error('Error fetching habits', error);
        }
      }
    };

    fetchHabits();
  }, [user]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // Construct a new habit object from form data
    const newHabit = {
      name: event.target.habitName.value,
      category: event.target.category.value,
      goal: event.target.goal.value,
      frequency: event.target.frequency.value,
      startDate: event.target.startDate.value,
      endDate: event.target.endDate.value,
      notes: event.target.notes.value,
    };

    try {
      const response = await axios.post('/habit', newHabit, {
        headers: {
          Authorization: `Bearer ${user.token}`, // Send the token in the Authorization header
        },
      });
      setHabits([...habits, response.data]); // Update the local state with the new habit
    } catch (error) {
      console.error('Error creating a new habit', error);
    }

    event.target.reset(); // Reset the form fields after submission
  };
  const markAsComplete = async (habitId) => {
    try {
      await axios.put(`/habit/${habitId}/complete`, {}, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      // Update the habit as completed in the local state as well
      setHabits(habits.map(h => h._id === habitId ? { ...h, completed: true } : h));
    } catch (error) {
      console.error('Error completing the habit', error);
    }
  };
  
  const deleteHabit = async (habitId) => {
    try {
      await axios.delete(`/habit/${habitId}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      // Remove the habit from the local state
      setHabits(habits.filter(h => h._id !== habitId));
    } catch (error) {
      console.error('Error deleting the habit', error);
    }
  };
  return (
    <div className="habit-tracker px-4 py-2 max-w-4xl mx-auto">
                <title>Habit Tracking</title>

      <div className="header1">
        <h1>Habits</h1>
        <p>Track your habits and build a better you.</p>
      </div>
      
      <form className="form-container grid grid-cols-1 md:grid-cols-2 gap-4 mb-4" onSubmit={handleFormSubmit}>
        <div className="form-section ">
          <label htmlFor="habitName">Habit Name</label>
          <input type="text" id="habitName" name="name" placeholder="Drink water" required />
        </div>
        
        <div className="form-section">
          <label htmlFor="category">Category</label>
          <select id="category" name="category" required>
            <option value="Health">Health</option>
            <option value="Academic">Academic</option>
            <option value="Personal">Personal</option>
          </select>
        </div>
        
        <div className="form-section">
          <label htmlFor="frequency">Frequency</label>
          <select id="frequency" name="frequency" required>
            <option value="Every Day">Every Day</option>
            <option value="Every Week">Every Week</option>
            <option value="Every Month">Every Month</option>
          </select>
        </div>
        
        <div className="form-section">
          <label htmlFor="goal">Goal</label>
          <input type="text" id="goal" name="goal" placeholder="8 glasses" required />
        </div>
        
        <div className="form-section">
          <label htmlFor="startDate">Start Date</label>
          <input type="date" id="startDate" name="startDate" required />
        </div>
        
        <div className="form-section">
          <label htmlFor="endDate">End Date</label>
          <input type="date" id="endDate" name="endDate" required />
        </div>
        
        <div className="form-section full-width">
          <label htmlFor="notes">Notes</label>
          <textarea id="notes" name="notes" placeholder="Add any additional notes or reminders here."></textarea>
        </div>
        
        <button type="submit" className="save-button">Save</button>
      </form>

      <div className="habit-list w-full">
        {habits.map((habit, index) => (
          <div className={`habit-card ${habit.completed ? 'habit-completed' : ''}`} key={habit._id}>
          <h3 className={`habit-name ${habit.completed ? 'habit-completed' : ''}`}>
            {habit.name}
          </h3>
            <div className="habit-details">
              <p>Category: {habit.category}</p>
              <p>Goal: {habit.goal}</p>
              <p>Frequency: {habit.frequency}</p>
              <p>Start Date: {habit.startDate}</p>
              <p>End Date: {habit.endDate}</p>
              <p>Notes: {habit.notes}</p>
              <div>
                <button className="delete-button" onClick={() => markAsComplete(habit._id)}>
                  Completed
                </button>
                <button className="delete-button2" onClick={() => deleteHabit(habit._id)}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HabitTracking;
