import React, { useState } from 'react'
import './Navbar.css';
import logo from '../../assets/logo.png';
import DarkModeToggle from './DarkModeToggle';


const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

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
        <li> <img src={logo} alt="Logo" /></li>
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