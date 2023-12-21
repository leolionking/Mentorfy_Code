import React from "react";
import {  Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authState } from "../atom/authAtom";

export default function MentorLayout() {
  let auth = useRecoilValue(authState);

  return (
    <div>
      <Outlet />
    </div>
  );
}
