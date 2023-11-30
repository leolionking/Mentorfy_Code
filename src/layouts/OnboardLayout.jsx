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
          <Header />
          <Outlet />
        </div>
      ) : (
        <>
          <Navigate to="/pricing" />
        </>
      )}
    </div>
  );
}
