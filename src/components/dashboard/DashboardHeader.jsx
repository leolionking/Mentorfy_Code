import { Avatar } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { workspaceStore } from '../../atom/workspaceAtom';
import { useRecoilValue } from "recoil";

export default function DashboardHeader() {
    const workspace = useRecoilValue(workspaceStore);
  return (
    <div  className="h-[70px] bg-white shadow-small w-full lg:w-[calc(100vw-17vw)] fixed top-0 right-0 ml-auto p-4 px-6">
      <div className="w-full">
        <div className="flex items-center justify-between">
          <div className="logo">{workspace.name}</div>
          <div className=" hidden lg:flex items-center gap-4">
            <i className="pi pi-bell"></i>
            <Link to="/select-workspace" className="text-sm">Workspaces</Link>
            <div className="flex items-center gap-2">
              <Avatar />
              <i className="pi pi-angle-down"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
