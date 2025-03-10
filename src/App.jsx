import React, { useState, useEffect } from "react";
import "./App.css";
import TaskForm from "./components/TaskForm/TaskForm";
import FilterButtons from "./components/FilterButtons/FilterButtons";
import TaskList from "./components/TaskList/TaskList";
import DarkModeToggle from "./components/DarkModeToggle/DarkModeToggle";

const App = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks
      ? JSON.parse(savedTasks)
      : [
          { id: 1, text: "Learn React Hooks", completed: false },
          { id: 2, text: "Build a todo app", completed: false },
          { id: 3, text: "Master React", completed: false },
        ];
  });

  const [filter, setFilter] = useState("all");

  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode ? JSON.parse(savedMode) : false;
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  const addTask = (text) => {
    if (text.trim() !== "") {
      const newTaskItem = {
        id: Date.now(),
        text: text,
        completed: false,
      };
      setTasks([...tasks, newTaskItem]);
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const editTask = (id, newText) => {
    if (newText.trim() !== "") {
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, text: newText } : task
        )
      );
    }
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true; // 'all' filter
  });

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`app-container ${darkMode ? "dark-mode" : ""}`}>
      <div className="todo-app">
        <div className="app-header">
          <h1>Enhanced To-Do List</h1>
          <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        </div>

        <TaskForm addTask={addTask} darkMode={darkMode} />

        <FilterButtons
          filter={filter}
          setFilter={setFilter}
          darkMode={darkMode}
        />

        <TaskList
          tasks={filteredTasks}
          deleteTask={deleteTask}
          editTask={editTask}
          toggleComplete={toggleComplete}
          darkMode={darkMode}
        />

        <div className="app-footer">
          <p>
            {tasks.length} task{tasks.length !== 1 ? "s" : ""} |{" "}
            {tasks.filter((t) => t.completed).length} completed
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;
