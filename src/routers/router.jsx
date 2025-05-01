import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import Home from "../pages/home/Home.jsx";
import Schemes from "@/pages/Schemes/Schemes.jsx";
import NotFound from "@/components/NotFound.jsx";
import About from "@/components/About.jsx";
import ChatbotPage from "@/pages/chat/ChatbotPage.jsx";

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
        element: <Schemes/>,
     },
     {
      path: "/about",
         element: <About/>,
      },
      {
        path: "/chat",
           element: <ChatbotPage/>,
        },
     {
      path:"*",
      element:<NotFound/>
     }
    ],
  },
]);

export default router;