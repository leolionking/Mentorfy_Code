import { Avatar } from "primereact/avatar";
import React from "react";
import { Link } from "react-router-dom";
import { workspaceStore } from "../../atom/workspaceAtom";
import { useRecoilValue } from "recoil";
import { user } from "../../atom/userAtom";

export default function DashboardHeader() {
  const workspace = useRecoilValue(workspaceStore);
  const userData = useRecoilValue(user)
  return (
    <div className="h-[70px] bg-white shadow-small w-full lg:w-[calc(100vw-17vw)] fixed top-0 right-0 ml-auto z-50 p-4 px-10">
      <div className="w-full">
        <div className="flex items-center justify-between">
          <div className="logo flex items-center gap-2">
            <div className="h-[40px] w-[40px]">
              {workspace?.logo ? (
                <img
                  src={workspace.logo}
                  alt=""
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                ""
              )}
            </div>
            <span className="font-bold">{workspace.name}</span>
          </div>
          <div className=" hidden lg:flex items-center gap-4">
            <i className="pi pi-bell"></i>
            <Link to="/select-workspace" className="text-sm">
              Workspaces
            </Link>
            <div className="flex items-center gap-2">
              <Avatar label={userData?.firstName?.split('')[0]} shape="circle"/>
              <i className="pi pi-angle-down"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
