import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import Home from "../pages/home/Home.jsx";
import Schemes from "@/pages/Schemes/Schemes.jsx";
import NotFound from "@/components/NotFound.jsx";
import ChatbotPage from "@/pages/chat/ChatbotPage.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx"

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
        element: <ProtectedRoute><Schemes/></ProtectedRoute>,
     },
      {
        path: "/chat",
           element:<ProtectedRoute><ChatbotPage/></ProtectedRoute> ,
      },
     {
      path:"*",
      element:<NotFound/>
     }
    ],
  },
]);

export default router;