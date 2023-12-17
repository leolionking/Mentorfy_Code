import React from "react";
import { useRecoilValue } from "recoil";
import { registerUserAtom } from "../atom/registrationAtom";
import { Navigate, Outlet } from "react-router-dom";
import Header from "../components/Header";

export default function OnboardLayout() {
  let registration = useRecoilValue(registerUserAtom);
  return (
    <div className="">
      {registration && registration?.step === 3 ? (
        <div>
          <div className="sidebg w-[12vw] h-[100vh] fixed top-0 left-0 z-50"></div>
          <div className="w-[calc(100vw-12vw)] ml-auto">
            <Header />
            <Outlet />
          </div>
        </div>
      ) : (
        <>
          <Navigate to="/pricing" />
        </>
      )}
    </div>
  );
}
