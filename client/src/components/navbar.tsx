import React from "react";
import { Link } from "react-router-dom";
import sNav from "./Navbar.module.css";

const Navbar: React.FC = () => {
  return (
    <nav className={ sNav.nav }>
      <ul className={ sNav.ul }>
        <li className={ sNav.li }>
          <Link to="/">Inicio</Link>
        </li>
        <li>
          <Link to="/about">Acerca</Link>
        </li>
        <li>
          <Link to="/contacts">Contacto</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;