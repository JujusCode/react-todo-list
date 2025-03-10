import React, { useState } from "react";
import "./TaskItem.css";

const TaskItem = ({ task, deleteTask, editTask, toggleComplete, darkMode }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const handleEdit = () => {
    setIsEditing(true);
    setEditText(task.text);
  };

  const handleSave = () => {
    editTask(task.id, editText);
    setIsEditing(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSave();
    }
  };

  return (
    <li className={`task-item ${darkMode ? "dark-item" : ""}`}>
      {isEditing ? (
        <div className="edit-container">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyPress={handleKeyPress}
            className={darkMode ? "dark-input" : ""}
            autoFocus
          />
          <button onClick={handleSave} className="save-btn">
            Save
          </button>
        </div>
      ) : (
        <div className="task-content">
          <div className="task-text-container">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleComplete(task.id)}
              className="task-checkbox"
            />
            <span
              className={`task-text ${task.completed ? "completed" : ""} ${
                darkMode ? "dark-text" : ""
              }`}
            >
              {task.text}
            </span>
          </div>
          <div className="task-buttons">
            <button onClick={handleEdit} className="edit-btn">
              Edit
            </button>
            <button onClick={() => deleteTask(task.id)} className="delete-btn">
              Delete
            </button>
          </div>
        </div>
      )}
    </li>
  );
};

export default TaskItem;
