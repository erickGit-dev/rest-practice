import React from "react";
import { FaBars, FaX } from "react-icons/fa6";
import { Link } from "react-router-dom";
import style from "../styles/navbar.module.css";

const Navbar: React.FC = () => {
  const navRef = React.useRef<HTMLDivElement>(null);

  const toggleNav = () => {
   navRef.current?.classList.toggle(style['nav-toggle']);
  }

  return (
    <header>
      <Link to="/" className={style['app-name']}>Cer0</Link>
      <nav ref={navRef}>
        <Link to="/about" onClick={toggleNav}>About</Link>
        <Link to="/contacts" onClick={toggleNav}>Contacts</Link>
        <Link to="/singup" onClick={toggleNav} className={style['sing-up']}>Sing Up </Link>
        <Link to="/login" onClick={toggleNav} className={style['log-in']} >Log In</Link>
        <button className={style['menu-close']} onClick={toggleNav}>
          <FaX size={'1.3em'} />
        </button>
      </nav >
      <button className={style['menu-bars']} onClick={toggleNav}>
        <FaBars size={'1.3em'} />
      </button>
    </header>
  );
}

export default Navbar;