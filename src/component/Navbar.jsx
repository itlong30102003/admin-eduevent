import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Navbar.css'; 

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/users">Người dùng</Link>
      <Link to="/organizers">Organizer</Link>
      <Link to="/event">Event</Link>
    </nav>
  );
};

export default Navbar;
