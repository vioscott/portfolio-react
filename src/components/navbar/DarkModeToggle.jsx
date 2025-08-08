import React, { useState, useEffect } from 'react';
import { FaRegMoon } from 'react-icons/fa';
import './navbar.css';


const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(() =>
    localStorage.getItem('theme') === 'dark'
  );

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  return (
    <button
      className="dark-toggle-btn"
      onClick={() => setDarkMode(!darkMode)}
      aria-label="Toggle Dark Mode"
    >
      <FaRegMoon className="dark-toggle-icon" />
    </button>
  );
};

export default DarkModeToggle;