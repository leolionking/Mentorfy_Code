import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { workspaceStore } from "../../atom/workspaceAtom";

export default function Sidebar({ links }) {
  const workspace = useRecoilValue(workspaceStore)
  return (
    <div className="hidden lg:block">
      <div className="lg:w-[17vw] fixed left-0 top-0 z-[1000] text-white h-[100vh]"  style={{
        backgroundColor: workspace?.color
          ? `#${workspace?.color}`
          : "#1F2105",
      }}>
        <div className="sidebar p-5 h-full">
          <div className="logo">{/* <img src={logo} alt="logo" /> */}</div>
          <div className="flex flex-col gap-4 mt-20">
            {links?.map((link, i) => (
                <NavLink to={link.link} className="myLink flex items-center gap-2" activeClassName="active">
                    <i className={"p-3 pi pi-"+ link.icon}></i>
                    <Link to={link.link} className="link" key={i}>{link.name}</Link>
                </NavLink>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
