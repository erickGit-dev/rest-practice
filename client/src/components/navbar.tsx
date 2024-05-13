import React from "react";
import { FaBars, FaX } from "react-icons/fa6";
import { Link } from "react-router-dom";
import style from "../styles/navbar.module.css";

const Navbar: React.FC = () => {
  return (
    <header>
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
        <button>
          <FaBars />
        </button>
      </nav >
      <button>
        <FaX />
      </button>
    </header>
  );
}

export default Navbar;