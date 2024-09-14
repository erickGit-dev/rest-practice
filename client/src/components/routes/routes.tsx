import { createBrowserRouter } from "react-router-dom";
import App from "../../App"
import Home from "../pages/home";
import Contacts from "../pages/contacts";
import About from "../pages/about";
import Signup from "../pages/signup";
import Login from "../pages/login";
import Products from "../pages/products";
import Details from "../pages/products/products.details"

const router = createBrowserRouter([ {
    path: "/",
    element: <App />,
    children: [
        { path: "", element: <Home /> },
        { path: "products", element: <Products /> },
        { path: "contacts", element: <Contacts /> },
        { path: "about", element: <About /> },
        { path: "signup", element: <Signup /> },
        { path: "login", element: <Login /> },
        { path: "details", element: <Details /> }
    ]
} ])

export default router;

