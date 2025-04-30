import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import Home from "../pages/home/Home.jsx";
import Scheme from "@/pages/Scheme/Scheme.jsx";
import Schemes from "@/pages/Schemes/Schemes.jsx";
import NotFound from "@/components/NotFound.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
     {
      path: "/schemes",
        element: <Schemes />,
     },
     {
     path: "/schemes/:id",
        element: <Scheme/>,
     },
     {
      path: "/about",
         element: <Scheme/>,
      },
     {
      path:"*",
      element:<NotFound/>
     }
    ],
  },
]);

export default router;