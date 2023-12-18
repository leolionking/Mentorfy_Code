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
import NotFound from "./pages/general/NotFound";
import ClientDashboard from "./pages/client/ClientDashboard";
import ClientOnboard from "./pages/client/ClientOnboard";
import RequestDemo from "./pages/general/RequestDemo";
import OnboardLayout from "./layouts/OnboardLayout";
import WorkspaceLayout from "./layouts/WorkspaceLayout";
import ClientMentors from "./pages/client/ClientMentors";
import ClientMentees from "./pages/client/ClientMentees";
import ClientSettings from "./pages/client/ClientSettings";
import ClientAddWorkspace from "./pages/client/ClientAddWorkspace";
import Notification from "./components/Notification";
import ClientBilling from "./pages/client/ClientBilling";

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

      {
        path: "/request-demo",
        element: <RequestDemo />,
      },
    ],
  },
  {
    path: "/",
    element: <OnboardLayout />,
    children: [
      {
        path: "/client-onboard",
        element: <ClientOnboard />,
      },
    ],
  },
  {
    path: "/",
    element: <ClientLayout />,
    children: [
      {
        path: "/client-dashboard",
        element: <ClientDashboard />,
      },
      {
        path: "/client-mentors",
        element: <ClientMentors />,
      },
      {
        path: "/client-mentees",
        element: <ClientMentees />,
      },
      {
        path: "/client-workspace",
        element: '',
      },
      {
        path: "/client-notifications",
        element: <Notification />,
      },
      {
        path: "/client-billing",
        element: <ClientBilling />,
      },
      {
        path: "/client-add-workspace",
        element: <ClientAddWorkspace />,
      },
      {
        path: "/client-settings",
        element: <ClientSettings />,
      },
    ],
  },
  {
    path: "/",
    element: <WorkspaceLayout />,
    children: [
      {
        path: "/select-workspace",
        element: <SelectWorkspace />,
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
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
