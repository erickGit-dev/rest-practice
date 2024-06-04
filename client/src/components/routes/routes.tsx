import { createBrowserRouter } from "react-router-dom";
import App from "../../App"
import Home from "../pages/home";
import Contacts from "../pages/contacts";
import About from "../pages/about";
import Signup from "../pages/signup";
import Login from "../pages/login";

const router = createBrowserRouter([{
    path: "/",
    element: <App/>,
    children: [
        { path: "", element: <Home/>},
        { path: "contacts", element: <Contacts/>},
        { path: "about", element: <About/>},
        { path: "signup", element: <Signup/>},
        { path: "login", element: <Login/>}
    ]     
}])

export default router;

