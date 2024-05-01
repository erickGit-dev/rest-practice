import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/">Black Tree</Link></li>
                <li><Link to="/products">Products</Link></li>
                <li><Link to="/store">Store</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;