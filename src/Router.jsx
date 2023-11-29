import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import Home  from "./pages/general/Home";
import LoginClient from "./pages/client/LoginClient";
import ClientLayout from './layouts/ClientLayout';
import MenteeLayout from './layouts/MenteeLayout';
import MenteeLogin from "./pages/mentee/MenteeLogin";
import MentorLayout from './layouts/MentorLayout';
import MentorLogin from "./pages/mentor/MentorLogin";
const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
   
    ],
  },
  {
    path: "/",
    element: <ClientLayout />,
    children: [
      {
        path: "/signin",
        element: <LoginClient />,
      },
   
    ],
  },
  {
    path: "/",
    element: <MenteeLayout />,
    children: [
      {
        path: "/mentee-signin/:id",
        element: <MenteeLogin />,
      },
   
    ],
  },
  {
    path: "/",
    element: <MentorLayout />,
    children: [
      {
        path: "/mentor-signin/:id",
        element: <MentorLogin />,
      },
   
    ],
  },
]);

export default router;
