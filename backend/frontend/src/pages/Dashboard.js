import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context/userContext';
import TaskItem from '../components/TaskItem';
import HabitItem from '../components/HabitItem';
import Overview from '../components/Overview'; // Make sure to import the Overview component
import UpcomingDeadlines from '../components/UpcomingDeadlines'; // Make sure to import this new component

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [tasks, setTasks] = useState([]); // This will store deadlines
  const [habits, setHabits] = useState([]);
  const [upcomingDeadlines, setUpcomingDeadlines] = useState([]);

  useEffect(() => {
    // Fetch deadlines
    axios.get('/deadlines/user/' + user._id, { withCredentials: true })
      .then(response => {
        // Filter deadlines to get the ones that are within the next 7 days
        const upcoming = response.data.filter(deadline => {
          const today = new Date();
          const nextWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);
          return new Date(deadline.dueDate) <= nextWeek;
        });
        setTasks(response.data); // Set all deadlines to tasks
        setUpcomingDeadlines(upcoming); // Set upcoming deadlines
      })
      .catch(error => console.error("Error fetching deadlines", error));
  
    // Fetch habits
    axios.get('/habit', { withCredentials: true })
      .then(response => setHabits(response.data))
      .catch(error => console.error("Error fetching habits", error));
  }, [user]);

  const toggleTaskCompletion = (taskId) => {
    axios.put(`/deadlines/complete/${taskId}`, {}, { withCredentials: true })
      .then(response => {
        if (response.status === 200) {
          setTasks(tasks.map(task => task._id === taskId ? { ...task, completed: !task.completed } : task));
        } else {
          // Handle any non-200 responses here
          console.error("Non-200 response", response);
        }
      })
      .catch(error => console.error("Error toggling task completion", error));
  };
  

  const toggleHabitCompletion = (habitId) => {
    axios.put(`/habit/${habitId}/complete`, {}, { withCredentials: true })
      .then(response => {
        setHabits(habits.map(habit => habit._id === habitId ? { ...habit, completed: !habit.completed } : habit));
      })
      .catch(error => console.error("Error toggling habit completion", error));
  };

  return (
<div className="container mx-auto p-4">
<title>Dashboard</title>

  <h1 className="text-4xl font-bold mb-6">Welcome, {user.username}!</h1>
  
  {/* Change grid-cols-2 to grid-cols-1 for small screens using md:grid-cols-2 */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {/* Deadline Tasks section */}
    <div className="bg-white shadow-lg rounded-lg p-4">
      <h2 className="text-2xl font-semibold mb-4">Deadline Tasks</h2>
      <div className="space-y-4">
        {tasks.map((task) => (
          <TaskItem
            key={task._id}
            task={task.task}
            completed={task.completed}
            onMarkComplete={() => toggleTaskCompletion(task._id)}
          />
        ))}
      </div>
    </div>

    {/* Right side column */}
    {/* Add w-full to make sure each section takes the full width on small screens */}
    <div className="flex flex-col space-y-4 w-full">
      {/* Progress Tracking section */}
      <div className="bg-white shadow-lg rounded-lg p-4">
        <h2 className="text-2xl font-semibold mb-4">Progress Tracking</h2>
        <div className="space-y-4">
          {habits.map(habit => (
            <HabitItem key={habit._id} habit={habit} onComplete={() => toggleHabitCompletion(habit._id)} />
          ))}
        </div>
      </div>

      {/* Overview section */}
      <div className="bg-white shadow-lg rounded-lg p-4">
        <h2 className="text-2xl font-semibold mb-4">Upcoming Deadlines</h2>
        <UpcomingDeadlines deadlines={upcomingDeadlines} /> {/* Upcoming deadlines */}
      </div>
    </div>
  </div>
</div>

  );
};

export default Dashboard;
