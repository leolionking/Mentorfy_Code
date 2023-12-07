import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authState } from "../atom/authAtom";
import Sidebar from "../components/dashboard/Sidebar";
import DashboardHeader from "../components/dashboard/DashboardHeader";

export default function ClientLayout() {
  let auth = useRecoilValue(authState);

  return (
    <div className="">
      {auth && auth?.role === "owner" ? (
        <div>
          <Sidebar />
          <DashboardHeader />
          <Outlet />
        </div>
      ) : (
        <>
          <Navigate to="/signin" />
        </>
      )}
    </div>
  );
}
