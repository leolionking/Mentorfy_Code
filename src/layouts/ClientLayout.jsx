import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authState } from "../atom/authAtom";
import Sidebar from "../components/dashboard/Sidebar";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import menu from '../utils/menu.json'
export default function ClientLayout() {
  let auth = useRecoilValue(authState);
  const clientMenu = menu.clientMenu
  return (
    <div className="">
      {auth && auth?.role === "owner" ? (
        <div>
          <Sidebar links={clientMenu} />
          <DashboardHeader />
          <div className="bg-[#FBFCFF] w-full lg:w-[calc(100vw-17vw)] ml-auto mt-14">
            <div className="w-full min-h-[90vh]">
            <div className="w-[90%] mx-auto pt-10">
              <Outlet />
              </div>
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
