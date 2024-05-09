import { createBrowserRouter } from "react-router-dom";
import App from "../../App"
import Home from "../pages/home";
import Contacts from "../pages/contacts";
import About from "../pages/about";

const router = createBrowserRouter([{
    path: "/",
    element: <App/>,
    children: [
        { path: "", element: <Home/>},
        { path: "contacts", element: <Contacts/>},
        { path: "about", element: <About/>}
    ]     
}])

export default router;

