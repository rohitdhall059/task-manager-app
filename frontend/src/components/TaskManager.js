import React, { useState, useEffect } from "react";
import axios from "axios";

const TaskManager = () => {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await axios.get("http://localhost:5001/api/tasks");
            setTasks(response.data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    const addTask = async () => {
        if (!title.trim()) return;
        try {
            const response = await axios.post("http://localhost:5001/api/tasks", {
                title,
                description,
            });
            setTasks([...tasks, response.data]);
            setTitle("");
            setDescription("");
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };

    const completeTask = async (id) => {
        try {
            await axios.put(`http://localhost:5001/api/tasks/${id}`, {
                completed: true,
            });
            setTasks(tasks.map(task => task._id === id ? { ...task, completed: true } : task));
        } catch (error) {
            console.error("Error completing task:", error);
        }
    };

    const deleteTask = async (id) => {
        try {
            await axios.delete(`http://localhost:5001/api/tasks/${id}`);
            setTasks(tasks.filter(task => task._id !== id));
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    const clearCompletedTasks = async () => {
        try {
            await axios.delete("http://localhost:5001/api/tasks/completed");
            setTasks(tasks.filter(task => !task.completed));
        } catch (error) {
            console.error("Error clearing completed tasks:", error);
        }
    };

    return (
        <div className="container">
            <h1>Task Manager</h1>
            <div className="task-input">
                <input 
                    type="text" 
                    placeholder="Task Title"
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input 
                    type="text" 
                    placeholder="Task Description"
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)}
                />
                <button className="add-btn" onClick={addTask}>Add Task</button>
            </div>
            <h2>Task List</h2>
            <ul>
                {tasks.length > 0 ? tasks.map(task => (
                    <li key={task._id} className={task.completed ? "completed" : ""}>
                        {task.title} - {task.description}
                        <button className="complete-btn" onClick={() => completeTask(task._id)}>Complete</button>
                        <button className="delete-btn" onClick={() => deleteTask(task._id)}>❌ Delete</button>
                    </li>
                )) : <p>No tasks available</p>}
            </ul>
            <button className="clear-btn" onClick={clearCompletedTasks}>🗑 Clear Completed Tasks</button>
        </div>
    );
};

export default TaskManager;