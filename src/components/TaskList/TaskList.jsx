import React from "react";
import TaskItem from "../TaskItem/TaskItem";
import "./TaskList.css";

const TaskList = ({
  tasks,
  deleteTask,
  editTask,
  toggleComplete,
  darkMode,
}) => {
  return (
    <ul className="task-list">
      {tasks.length === 0 ? (
        <li className={`empty-message ${darkMode ? "dark-text" : ""}`}>
          No tasks found
        </li>
      ) : (
        tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            deleteTask={deleteTask}
            editTask={editTask}
            toggleComplete={toggleComplete}
            darkMode={darkMode}
          />
        ))
      )}
    </ul>
  );
};

export default TaskList;
