import React from "react";
import { Link } from "react-router-dom";
import sNav from "../styles/navbar.module.css";

const Navbar: React.FC = () => {
  return (
    <nav className={sNav['navbar']}>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contacts">Contact</Link>
          </li>
        </ul>
    </nav>
  );
}

export default Navbar;