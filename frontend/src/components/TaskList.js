import React, { useState, useEffect } from "react";
import axios from "axios";

const TaskList = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5001/api/tasks")
            .then(response => {
                console.log("Fetched tasks:", response.data); // Debugging
                setTasks(response.data);
            })
            .catch(error => console.error("Error fetching tasks:", error));
    }, []);

    const completeTask = (id) => {
        axios.put(`http://localhost:5001/api/tasks/${id}`, { completed: true })
            .then(() => setTasks(tasks.map(task =>
                task._id === id ? { ...task, completed: true } : task
            )))
            .catch(error => console.error("Error completing task:", error));
    };

    const undoTask = (id) => {
        axios.put(`http://localhost:5001/api/tasks/${id}`, { completed: false })
            .then(() => setTasks(tasks.map(task =>
                task._id === id ? { ...task, completed: false } : task
            )))
            .catch(error => console.error("Error undoing task:", error));
    };

    const deleteTask = (id) => {
        axios.delete(`http://localhost:5001/api/tasks/${id}`)
            .then(() => setTasks(tasks.filter(task => task._id !== id)))
            .catch(error => console.error("Error deleting task:", error));
    };

    return (
        <div className="container mt-4">
            <h2>Task List</h2>
            <ul className="list-group">
                {tasks.length > 0 ? tasks.map(task => (
                    <li key={task._id} className={`list-group-item ${task.completed ? 'completed' : ''}`}>
                        {task.title} - {task.description}
                        <div className="task-actions">
                            {!task.completed ? (
                                <button onClick={() => completeTask(task._id)}>Complete</button>
                            ) : (
                                <button onClick={() => undoTask(task._id)}>Undo</button>
                            )}
                            <button onClick={() => deleteTask(task._id)}>❌ Delete</button>
                        </div>
                    </li>
                )) : <p>No tasks available</p>}
            </ul>
        </div>
    );
};

export default TaskList;
