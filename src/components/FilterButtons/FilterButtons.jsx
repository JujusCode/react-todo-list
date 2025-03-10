import React from "react";
import "./FilterButtons.css";

const FilterButtons = ({ filter, setFilter, darkMode }) => {
  return (
    <div className="filter-buttons">
      <button
        onClick={() => setFilter("all")}
        className={`filter-btn ${filter === "all" ? "active" : ""} ${
          darkMode ? "dark-btn" : ""
        }`}
      >
        All
      </button>
      <button
        onClick={() => setFilter("pending")}
        className={`filter-btn ${filter === "pending" ? "active" : ""} ${
          darkMode ? "dark-btn" : ""
        }`}
      >
        Pending
      </button>
      <button
        onClick={() => setFilter("completed")}
        className={`filter-btn ${filter === "completed" ? "active" : ""} ${
          darkMode ? "dark-btn" : ""
        }`}
      >
        Completed
      </button>
    </div>
  );
};

export default FilterButtons;
