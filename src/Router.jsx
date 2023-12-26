import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import Home from "./pages/general/Home";
import LoginClient from "./pages/client/LoginClient";
import ClientLayout from "./layouts/ClientLayout";
import MenteeLayout from "./layouts/MenteeLayout";
import MentorLayout from "./layouts/MentorLayout";
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
import ResetPasswordOtp from "./pages/general/ResetPasswordOtp";
import UserOnboard from "./pages/workspaceUser/UserOnboard";
import Dashboard from "./components/dashboard/Dashboard";
import UserRequests from "./pages/workspaceUser/UserRequests";
import UserConnection from "./pages/workspaceUser/UserConnection";
import UserMatches from "./pages/workspaceUser/UserMatches";
import UserDashboard from "./pages/workspaceUser/UserDashboard";
import UserLogin from './pages/workspaceUser/UserLogin';
import UserForgotPassword from "./pages/workspaceUser/UserForgotPassword";

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
        path: "/reset-otp",
        element: <ResetPasswordOtp />,
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
        element: "",
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
        path: "/mentee-signup/:id",
        element: <UserOnboard />,
      },
      {
        path: "/mentee-signin/:id",
        element: <UserLogin />,
      },
      {
        path: "/mentee-forgot-password/:id",
        element: <UserForgotPassword />,
      },
      {
        path: "/mentee-dashboard",
        element: <UserDashboard />,
      },
      {
        path: "/mentee-matches",
        element: <UserMatches />,
      },
      {
        path: "/mentee-connections",
        element: <UserConnection />,
      },
      {
        path: "/mentee-requests",
        element: <UserRequests />,
      },
      {
        path: "/mentee-notifications",
        element: <Notification />,
      },
    ],
  },
  {
    path: "/",
    element: <MentorLayout />,
    children: [
      {
        path: "/mentor-signup/:id",
        element: <UserOnboard />,
      },
      {
        path: "/mentor-signin/:id",
        element: <UserLogin />,
      },
      {
        path: "/mentor-forgot-password/:id",
        element: <UserForgotPassword />,
      },
      {
        path: "/mentor-dashboard",
        element: <UserDashboard />,
      },
      {
        path: "/mentor-matches",
        element: <UserMatches />,
      },
      {
        path: "/mentor-connections",
        element: <UserConnection />,
      },
      {
        path: "/mentor-requests",
        element: <UserRequests />,
      },
      {
        path: "/mentor-notifications",
        element: <Notification />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
