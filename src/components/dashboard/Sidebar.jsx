import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar({ links }) {

  return (
    <div className="hidden lg:block">
      <div className="w-[17vw] fixed left-0 top-0 bg-[#1F2105] text-white h-[100vh]">
        <div className="sidebar p-5 h-full">
          <div className="logo">{/* <img src={logo} alt="logo" /> */}</div>
          <div className="flex flex-col gap-4 mt-20">
            {links?.map((link, i) => (
                <Link to={link.link} className="myLink flex items-center gap-2">
                    <i className={"p-3 pi pi-"+ link.icon}></i>
                    <Link to={link.link} className="link" key={i}>{link.name}</Link>
                </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
