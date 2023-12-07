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
          <div className="bg-[#FBFCFF] w-full lg:w-[calc(100vw-17vw)] ml-auto mt-14">
            <div className="w-full">
              <Outlet />
            </div>
          </div>
        </div>
      ) : (
        <>
          <Navigate to="/signin" />
        </>
      )}
    </div>
  );
}
