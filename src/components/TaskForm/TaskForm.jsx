import React, { useState } from "react";
import "./TaskForm.css";

const TaskForm = ({ addTask, darkMode }) => {
  const [newTask, setNewTask] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(newTask);
    setNewTask("");
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Add a new task..."
        className={darkMode ? "dark-input" : ""}
      />
      <button type="submit" className="add-btn">
        Add
      </button>
    </form>
  );
};

export default TaskForm;
