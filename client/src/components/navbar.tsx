import React from "react";
import { FaBars, FaX } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Style from "../styles/navbar.module.css";

const Navbar: React.FC = () => {
  const navRef = React.useRef<HTMLDivElement>(null);

  const toggleNav = () => {
    navRef.current?.classList.toggle(Style['nav-toggle']);
  }

  return (
    <header>
      <Link to="/" className={Style['app-name']}>Cer0</Link>
      <nav ref={navRef}>
        <Link to="/about" onClick={toggleNav}>About</Link>
        <Link to="/contacts" onClick={toggleNav}>Contacts</Link>
        <Link to="/login" onClick={toggleNav} className={Style['log-in']} >Log In</Link>
        <Link to="/singup" onClick={toggleNav} className={Style['sing-up']}>Sing Up </Link>
        <button className={Style['menu-close']} onClick={toggleNav}>
          <FaX size={'1.3em'} />
        </button>
      </nav >
      <button className={Style['menu-bars']} onClick={toggleNav}>
        <FaBars size={'1.3em'} />
      </button>
    </header>
  );
}

export default Navbar;