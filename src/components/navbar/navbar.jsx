import React, { useState, useEffect } from 'react'
import './Navbar.css';
import logo_black from '../../assets/logo_black.png';
import logo_white from '../../assets/logo_white.png';
import DarkModeToggle from './DarkModeToggle';


const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() =>
    localStorage.getItem('theme') === 'dark'
  );

  // Listen for dark mode changes
  useEffect(() => {
    const checkDarkMode = () => {
      const darkMode = document.body.classList.contains('dark');
      setIsDarkMode(darkMode);
    };

    // Check initially
    checkDarkMode();

    // Create observer to watch for class changes on body
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  // Choose logo based on dark mode
  const currentLogo = isDarkMode ? logo_white : logo_black;

  return (
    <><section className="navbar">
      <button
        className={`hamburger${menuOpen ? ' active' : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span />
        <span />
        <span />
      </button>

      <ul className={`nav-menu${menuOpen ? ' open' : ''}`}>
        <li> <img src={currentLogo} alt="Logo" /></li>
        <li><a href="#about">ABOUT ME</a></li>
        <li><a href="#services">SERVICES</a></li>
        <li><a href="#contact">CONTACT</a></li>
      </ul>
      <div className="nav-connect"><a href="https://wa.me/2349037583286
      ">TALK TO ME</a>
      </div>
      <div className="darkmode"><DarkModeToggle /></div>
    </section></>
  )
}

export default Navbar