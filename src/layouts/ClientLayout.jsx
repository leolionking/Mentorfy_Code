import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authState } from "../atom/authAtom";
import Header from "../components/Header";
import LoginClient from "../pages/client/LoginClient";

export default function ClientLayout() {
  let auth = useRecoilValue(authState);

  return (
    <div className="">
      {auth && auth?.role === "owner" ? (
        <div>
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
