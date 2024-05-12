import React from "react";
import { Link } from "react-router-dom";
import style from "../styles/navbar.module.css";

const Navbar: React.FC = () => {
  return (
    <nav>
      <Link to="/" className={style['app-name']}>Cer0</Link>
      <ul>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/contacts">Contact</Link>
        </li>
        <li>
          <Link to="/singup">Sing Up</Link>
        </li>
        <li>
          <Link to="/login">Log In</Link>
        </li>
      </ul>
    </nav >
  );
}

export default Navbar;