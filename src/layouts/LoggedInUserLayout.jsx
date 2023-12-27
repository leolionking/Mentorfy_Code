import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { authState } from "../atom/authAtom";
import Sidebar from "../components/dashboard/Sidebar";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import menu from "../utils/menu.json";

export default function LoggedInUserLayout() {
  let auth = useRecoilValue(authState);
  const [links, setLinks] = useState();
  useEffect(() => {
    const menteeMenu = menu.menteeMenu;
    const mentorMenu = menu.mentorMenu;
    if (auth?.role === "mentee") {
      setLinks(menteeMenu);
    } else {
      setLinks(mentorMenu);
    }
  }, [auth.role]);

  return (
    <div className="">
      {auth && (auth?.role === "mentee" || auth?.role === "mentor") ? (
        <div>
          <Sidebar links={links} />
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
