import React, { useState, useContext, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import { UserContext } from '../context/userContext';
import { toast } from 'react-hot-toast';
import '../App.css'; // Adjust the path if your App.css is in a different location


const Deadlines = () => {
  const [deadlines, setDeadlines] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [newTask, setNewTask] = useState('');
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      fetchDeadlines();
    }
  }, [user]); // Depend on the user object itself

  const onChangeDate = (value) => {
    setSelectedDate(value);
  };

  const handleNewTaskChange = (event) => {
    setNewTask(event.target.value);
  };

  const handleAddTask = async () => {
    if (!user || !newTask.trim()) return; // Check if user exists and newTask is not just whitespace

    try {
      const response = await axios.post('/deadlines/add', {
        task: newTask,
        dueDate: selectedDate.toISOString(), // Ensure this matches your backend expectations
        user: user._id // Updated from userId to user to match the backend requirement
      }, {
        headers: { Authorization: `Bearer ${user.token}` }
      });

      setDeadlines([...deadlines, response.data]);
      setNewTask('');
      toast.success('Deadline added successfully');
    } catch (error) {
      toast.error('Failed to add deadline');
      console.error('Error adding deadline:', error.response ? error.response.data : error); // Improved error logging
    }
  };


  const fetchDeadlines = async () => {
    if (!user) return; // Guard clause if user is falsy

    try {
      const response = await axios.get(`/deadlines/user/${user._id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setDeadlines(response.data);
    } catch (error) {
      toast.error('Failed to fetch deadlines');
    }
  };


  const formatDate = (date) => {
    // Ensure date is a Date object or valid date string before converting
    return new Date(date).toLocaleDateString();
  };


  const markAsComplete = async (deadlineId) => {
    try {
      const response = await axios.put(`/deadlines/complete/${deadlineId}`, {}, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      if (response.data) {
        toast.success('Deadline marked as complete!');
        // Update the deadlines list to reflect the change
        setDeadlines(deadlines.map(dl => dl._id === deadlineId ? { ...dl, completed: true } : dl));
      }
    } catch (error) {
      toast.error('Failed to mark deadline as complete');
    }
  };
  const deleteDeadline = async (deadlineId) => {
    try {
      await axios.delete(`/deadlines/${deadlineId}`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      toast.success('Deadline removed successfully');
      setDeadlines(deadlines.filter(dl => dl._id !== deadlineId));
    } catch (error) {
      toast.error('Failed to delete deadline');
    }
  };

  return (
<div className="deadlines-container p-10 bg-gray-100 min-h-screen">
           <title>Deadlines</title>

           <div className="deadlines-content flex flex-col md:flex-row gap-4">
           <div className="deadlines-list bg-gray-200 shadow rounded-lg p-4 flex-grow">

        {deadlines.map((deadline) => (
          <div key={deadline._id} className={`mb-4 ${deadline.completed ? "completed" : ""}`}>
            <div className={`text-md font-medium ${deadline.completed ? "line-through" : ""}`}>
              {deadline.task}
            </div>
            <div className="text-sm text-gray-600">
              Due on {formatDate(new Date(deadline.dueDate))}
            </div>
            {!deadline.completed && (
              <button
                onClick={() => markAsComplete(deadline._id)}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2"
              >
                Mark as Completed
              </button>
            )}
            <button
              onClick={() => deleteDeadline(deadline._id)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      <div className="deadlines-calendar bg-gray-200 shadow rounded-lg p-4 flex-grow">
        <div className="calendar-container">
          <Calendar onChange={onChangeDate} value={selectedDate} />
          <div className="add-task-form my-4">
            <input
              type="text"
              value={newTask}
              onChange={handleNewTaskChange}
              placeholder="Enter task"
              className="border p-2 mr-2"
            />
            <button onClick={handleAddTask} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Add Task
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>

  );
};

export default Deadlines;
