import { Avatar } from "primereact/avatar";
import React from "react";
import { Link } from "react-router-dom";
import { workspaceStore } from "../../atom/workspaceAtom";
import { useRecoilValue } from "recoil";
import { user } from "../../atom/userAtom";

export default function UserDashboardHeader() {
    const workspace = useRecoilValue(workspaceStore);
    const userData = useRecoilValue(user);
    return (
      <div className="h-[70px] bg-white shadow-small w-full lg:w-[calc(100vw-17vw)] fixed top-0 right-0 ml-auto z-[500] p-4 px-10">
        <div className="w-full">
          <div className="flex items-center justify-between">
            <div className="logo flex items-center gap-2">
              <div className="h-[40px] w-[40px]">
              </div>
            </div>
            <div className=" hidden lg:flex items-center gap-4">
              <Link to="/client-notifications">
                <i className="pi pi-bell"></i>
              </Link>
              <Link to="/select-workspace" className="text-sm">
               Switch Workspace
              </Link>
              <div className="flex items-center gap-2">
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
    );
  }