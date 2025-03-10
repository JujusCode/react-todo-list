import React from "react";
import "./DarkModeToggle.css";

const DarkModeToggle = ({ darkMode, toggleDarkMode }) => {
  return (
    <button
      onClick={toggleDarkMode}
      className={`theme-toggle ${darkMode ? "dark-theme" : "light-theme"}`}
      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {darkMode ? "🔆" : "🌙"}
    </button>
  );
};

export default DarkModeToggle;
