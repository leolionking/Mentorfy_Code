import React from "react";
import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="w-full h-[80px] flex items-center">
      <div className="w-[80%] mx-auto flex items-center justify-between ">
        <Link to="/" className="h-[30px] flex-shrink-0">
          <img src={logo} alt="" className=" w-full h-full object-contain"/>
        </Link>
        <div className="hidden md:block flex-shrink-0">
          <ul className="flex items-center gap-6 text-sm">
            <Link to='/pricing' className="cursor-pointer">Pricing</Link>
            <Link to='/signin' className="sec-btn" >Sign in</Link>
            <Link to='/pricing' className="pri-btn">Get Started</Link>
          </ul>
        </div>
        <div className="block md:hidden cursor-pointer">
          <i className="pi pi-bars flex-shrink-0"></i>
        </div>
      </div>
    </div>
  );
}
