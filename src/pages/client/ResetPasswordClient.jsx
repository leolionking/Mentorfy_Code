import React from "react";
import {  useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg";
import { Password } from "primereact/password";


export default function ResetPasswordClient() {
    const navigate = useNavigate();
    const gotoHome = () => {
      navigate("/");
    };
    return (
      <div className="h-[100vh] w-full ">
        <div className="main  grid md:grid-cols-2 place-items-center h-full">
          <div className="h-full w-full ">
            <img
              src={logo}
              alt=""
              onClick={gotoHome}
              className="relative cursor-pointer top-[20%] left-0"
            />
          </div>
          <div className="form w-full md:w-[60vw] h-fit lg:w-[30vw] py-10 shadow-small rounded-2xl">
            <div className="">
              <div className="main py-5">
                <div className="header font-['ginto-bold'] text-2xl pb-8">
                Enter New Password
                </div>
              
                <div className="grid gap-3">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="username">New Password</label>
                    <Password toggleMask feedback={false} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="username">Confirm New Password</label>
                    <Password toggleMask feedback={false} />
                  </div>
                  <button className="pri-btn">Reset Password</button>
                 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }