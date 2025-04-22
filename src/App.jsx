import React, { useState, useEffect } from "react";
import "./App.css";
import TaskForm from "./components/TaskForm/TaskForm";
import FilterButtons from "./components/FilterButtons/FilterButtons";
import TaskList from "./components/TaskList/TaskList";
import DarkModeToggle from "./components/DarkModeToggle/DarkModeToggle";

const API_BASE = "http://localhost/todo-api";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode ? JSON.parse(savedMode) : false;
  });

  // Fetch tasks from PHP API on component mount
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(`${API_BASE}/read.php`);
        const data = await response.json();
        setTasks(
          data.map((task) => ({
            id: task.id,
            text: task.title,
            completed: task.completed,
          }))
        );
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  // Dark mode handling (kept in localStorage)
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  const addTask = async (text) => {
    if (text.trim() !== "") {
      try {
        const response = await fetch(`${API_BASE}/create.php`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title: text, completed: false }),
        });

        // Add logging to see what's coming back
        const responseData = await response.json();
        console.log("Response from create.php:", responseData);

        // Check if we got a successful response
        if (response.ok) {
          // Use the id from the response
          setTasks([
            ...tasks,
            {
              id: responseData.id, // Get id from the response
              text: text,
              completed: false,
            },
          ]);
        } else {
          // Handle server error
          console.error("Server error:", responseData.message);
          alert("Error adding task: " + responseData.message);
        }
      } catch (error) {
        console.error("Error adding task:", error);
        alert("Failed to add task. Check console for details.");
      }
    }
  };

  const deleteTask = async (id) => {
    try {
      await fetch(`${API_BASE}/delete.php`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      });
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const editTask = async (id, newText) => {
    if (newText.trim() !== "") {
      try {
        await fetch(`${API_BASE}/update.php`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: id,
            title: newText,
            completed: tasks.find((task) => task.id === id).completed,
          }),
        });
        setTasks(
          tasks.map((task) =>
            task.id === id ? { ...task, text: newText } : task
          )
        );
      } catch (error) {
        console.error("Error editing task:", error);
      }
    }
  };

  const toggleComplete = async (id) => {
    const taskToUpdate = tasks.find((task) => task.id === id);
    try {
      await fetch(`${API_BASE}/update.php`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          title: taskToUpdate.text,
          completed: !taskToUpdate.completed,
        }),
      });
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, completed: !task.completed } : task
        )
      );
    } catch (error) {
      console.error("Error toggling task completion:", error);
    }
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
