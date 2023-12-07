import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar({ links }) {
  const myLinks = [
    { name: "Dashboard", link: "/dashboard", icon: "home" },
    { name: "Mentors", link: "/dashboard", icon: "user" },
    { name: "Mentees", link: "/dashboard", icon: "sitemap" },
    { name: "Workspace Insights", link: "/dashboard", icon: "chart-bar" },
    { name: "Plans & Billing", link: "/dashboard", icon: "credit-card" },
    { name: "Settings", link: "/dashboard", icon: "cog" },
  ];

  return (
    <div className="hidden lg:block">
      <div className="w-[17vw] fixed left-0 top-0 bg-[#1F2105] text-white h-[100vh]">
        <div className="sidebar p-5 h-full">
          <div className="logo">{/* <img src={logo} alt="logo" /> */}</div>
          <div className="flex flex-col gap-4 mt-20">
            {myLinks.map((link, i) => (
                <div className="myLink flex items-center gap-2">
                    <i className={"p-3 pi pi-"+ link.icon}></i>
                    <Link to={link.link} className="link" key={i}>{link.name}</Link>
                </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
