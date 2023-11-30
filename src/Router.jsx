import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import Home from "./pages/general/Home";
import LoginClient from "./pages/client/LoginClient";
import ClientLayout from "./layouts/ClientLayout";
import MenteeLayout from "./layouts/MenteeLayout";
import MenteeLogin from "./pages/mentee/MenteeLogin";
import MentorLayout from "./layouts/MentorLayout";
import MentorLogin from "./pages/mentor/MentorLogin";
import ForgotPasswordClient from "./pages/client/ForgotPasswordClient";
import ResetPasswordClient from "./pages/client/ResetPasswordClient";
import PricingClient from "./pages/client/PricingClient";
import SelectWorkspace from "./pages/client/SelectWorkspace";
import NotFound from './pages/general/NotFound'
import ClientDashboard from './pages/client/ClientDashboard';

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/signin",
        element: <LoginClient />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPasswordClient />,
      },
      {
        path: "/reset-password",
        element: <ResetPasswordClient />,
      },
      {
        path: "/pricing",
        element: <PricingClient />,
      },
    ],
  },
  {
    path: "/",
    element: <ClientLayout />,
    children: [
      {
        path: "/select-workspace",
        element: <SelectWorkspace />,
      },
      {
        path: "/client-dashboard",
        element: <ClientDashboard />,
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
  {
    path: '*',
    element: <NotFound/>
  }
]);

export default router;
