import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { authState } from "../atom/authAtom";
import { useRecoilState } from "recoil";
import { logout } from "../utils/general/generalApi";
import { toast } from "react-toastify";
import logo from '../assets/logo/mentorfy-logo.svg';

export default function Header() {
  const [auth, setAuth] = useRecoilState(authState);
  const navigate = useNavigate();
  const signout = () => {
    logout().then((res) => {
      setAuth("");
      localStorage.clear()
      toast.success("user logged out successfully");
      navigate("/signin");
    });
  };
  return (
    <div className="w-full h-[80px] flex items-center relative bg-white z-[1000]">
      <div className="w-[90%] lg:w-[80%] mx-auto flex items-center justify-between ">
        <Link to="/" className="h-[30px] flex-shrink-0">
          <img src={logo} alt="" className=" w-full h-full object-contain" />
        </Link>
        <div className="hidden md:block flex-shrink-0">
          {auth && auth?.role ? (
            <div className="flex items-center gap-6">
            <Link to='select-workspace' className="text-sm"> Workspace</Link>
            <button onClick={signout} className="pri-btn">
              {" "}
              Logout
            </button>
            </div>
          ) : (
            <ul className="flex items-center gap-6 text-sm">
              <Link to="/pricing" className="cursor-pointer">
                Pricing
              </Link>
              <Link to="/signin" className="sec-btn">
                Sign in
              </Link>
              <Link to="/pricing" className="pri-btn">
                Get Started
              </Link>
            </ul>
          )}
        </div>
        <div className="block md:hidden cursor-pointer">
          <i className="pi pi-bars flex-shrink-0"></i>
        </div>
      </div>
    </div>
  );
}
