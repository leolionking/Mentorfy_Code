import { Avatar } from "primereact/avatar";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { workspaceStore } from "../../atom/workspaceAtom";
import { useRecoilState, useRecoilValue } from "recoil";
import { user } from "../../atom/userAtom";
import { authState } from "../../atom/authAtom";
import { logout } from "../../utils/general/generalApi";
import { toast } from "react-toastify";

export default function UserDashboardHeader() {
  const [open, setOpen] = useState(false);
  const workspace = useRecoilValue(workspaceStore);
  const userData = useRecoilValue(user);
  const [auth, setAuth] = useRecoilState(authState);
  const navigate = useNavigate();

  const openModal = () => {
    setOpen((open) => !open);
  };

  const signout = () => {
    logout().then((res) => {
      setAuth("");
      toast.success("user logged out successfully");
      navigate("/" + userData.role + "-signin/" + workspace.id);
    });
  };
  return (
    <>
      <div className="h-[70px] bg-white shadow-small w-full lg:w-[calc(100vw-17vw)] fixed top-0 right-0 ml-auto z-[500] p-4 px-10">
        <div className="w-full">
          <div className="flex items-center justify-between">
            <div className="logo flex items-center gap-2">
              <div className="h-[40px] w-[40px]"></div>
            </div>
            <div className=" hidden lg:flex items-center gap-4">
              <Link to={"/" + auth.role + "-notifications"}>
                <i className="pi pi-bell"></i>
              </Link>
              <Link to="/select-workspace" className="text-sm">
                Switch Workspace
              </Link>
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={openModal}
              >
                <Avatar
                  label={userData?.firstName?.split("")[0]}
                  shape="circle"
                />
                <i className="pi pi-angle-down"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      {open ? (
        <div className=" fixed rounded-lg bg-white shadow-small z-50 w-[150px] text-sm top-[70px] right-10 ">
          <div className="flex items-center gap-4 pb-3 bg-white cursor-pointer px-7 p-3 rounded-lg  hover:bg-gray-200">
            <i className="pi pi-user text-sm"></i>
            Profile
          </div>
          <div
            className="flex bg-white items-center gap-4 cursor-pointer hover:bg-gray-200 px-7 p-3 rounded-lg"
            onClick={signout}
          >
            <i className="pi pi-power-off text-sm"></i>
            Logout
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
