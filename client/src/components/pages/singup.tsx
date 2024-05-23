import React from "react";
import Style from "../../styles/singup.module.css"
import { Link } from "react-router-dom";

const Singup: React.FC = () => {
  return (
    <div className={Style['sing-up']}>
      <Link to="/" className={Style['app-name']}>Cer0</Link>
      <div className={Style['card']}>
        <input type="text" placeholder="Name" />
        <input type="text" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button type="submit">Sing Up</button>
        </div>
    </div>
  );
}

export default Singup;