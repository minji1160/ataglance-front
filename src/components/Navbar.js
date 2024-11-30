import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css"; // CSS 파일 경로

function Navbar({ categories = [], selectedCategory, onCategoryClick }) {
    const navigate = useNavigate();

  return (
    <div className="navbar">
      <div className="banner" onClick={() => navigate(`/`)}>
        한눈에 (At a Glance) <span role="img" aria-label="eyes">👀</span>
      </div>
      <div className="category-buttons">
      {categories.map((category, index) => (
        <button
          key={index}
          className={`category-button ${
            selectedCategory === index + 1 ? "active" : ""
          }`}
          onClick={() => onCategoryClick(index + 1)}
        >
          {selectedCategory === index + 1 ? `✓${category}` : category}
        </button>
        ))}
      </div>
    </div>
  );
}

export default Navbar;
